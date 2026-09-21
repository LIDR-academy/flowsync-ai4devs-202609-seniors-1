import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import type { FormError } from '@/lib/apiErrors'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState<FormError | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    // Cheap client-side checks so the user gets feedback without a round trip.
    const fields: Record<string, string> = {}
    if (password.length < 8 || password.length > 32) {
      fields.password = 'La contraseña debe tener entre 8 y 32 caracteres.'
    }
    if (password !== passwordConfirmation) {
      fields.passwordConfirmation = 'Las contraseñas no coinciden.'
    }
    if (Object.keys(fields).length > 0) {
      setError({ fields })
      return
    }

    setSubmitting(true)
    const result = await signup({
      fullName: fullName.trim() || null,
      email,
      password,
      passwordConfirmation,
    })
    setSubmitting(false)
    if (result) {
      setError(result)
      return
    }
    navigate('/', { replace: true })
  }

  const fieldError = (name: string) =>
    error?.fields[name] && <p className="text-sm text-destructive">{error.fields[name]}</p>

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <CardDescription>Regístrate para empezar a usar FlowSync.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="grid gap-4">
            {error?.form && (
              <Alert variant="destructive">
                <AlertDescription>{error.form}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nombre (opcional)</Label>
              <Input
                id="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                aria-invalid={!!error?.fields.fullName}
              />
              {fieldError('fullName')}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error?.fields.email}
              />
              {fieldError('email')}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!error?.fields.password}
              />
              {fieldError('password')}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwordConfirmation">Confirmar contraseña</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                aria-invalid={!!error?.fields.passwordConfirmation}
              />
              {fieldError('passwordConfirmation')}
            </div>
          </CardContent>
          <CardFooter className="mt-6 flex-col gap-3">
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
            </Button>
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary underline">
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
