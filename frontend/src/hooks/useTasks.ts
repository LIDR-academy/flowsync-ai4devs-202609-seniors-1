import { useCallback, useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { Task, TaskInput, TaskUpdateInput } from '../types/task'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    const [result, err] = await api.tasks.index({}).safe()
    if (err) {
      setError('Could not load tasks. Is the backend running?')
    } else {
      setError(null)
      setTasks(result.data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const createTask = useCallback(async (input: TaskInput) => {
    const [result, err] = await api.tasks.store({ body: input }).safe()
    if (err) {
      setError('Could not create the task.')
      return
    }
    setError(null)
    setTasks((current) => [result.data, ...current])
  }, [])

  const updateTask = useCallback(async (id: number, input: TaskUpdateInput) => {
    const [result, err] = await api.tasks.update({ params: { id }, body: input }).safe()
    if (err) {
      setError('Could not update the task.')
      return
    }
    setError(null)
    setTasks((current) => current.map((task) => (task.id === id ? result.data : task)))
  }, [])

  const deleteTask = useCallback(async (id: number) => {
    const [, err] = await api.tasks.destroy({ params: { id } }).safe()
    if (err) {
      setError('Could not delete the task.')
      return
    }
    setError(null)
    setTasks((current) => current.filter((task) => task.id !== id))
  }, [])

  const toggleComplete = useCallback(
    (id: number, completed: boolean) => updateTask(id, { completed }),
    [updateTask]
  )

  return { tasks, loading, error, refresh, createTask, updateTask, deleteTask, toggleComplete }
}
