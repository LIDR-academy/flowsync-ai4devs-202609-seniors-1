import { useState } from 'react'
import type { FormEvent } from 'react'
import { TagInput } from './TagInput'
import type { Task, TaskInput, TaskUpdateInput } from '../types/task'

interface TaskFormProps {
  initialValue?: Task
  onSubmit: (input: TaskInput | TaskUpdateInput) => void
  onCancel: () => void
  submitLabel: string
}

export function TaskForm({ initialValue, onSubmit, onCancel, submitLabel }: TaskFormProps) {
  const [title, setTitle] = useState(initialValue?.title ?? '')
  const [description, setDescription] = useState(initialValue?.description ?? '')
  const [tags, setTags] = useState<string[]>(initialValue?.tags ?? [])
  const [completed, setCompleted] = useState(initialValue?.completed ?? false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!title.trim()) return

    const input: TaskInput | TaskUpdateInput = {
      title: title.trim(),
      description: description.trim() || null,
      tags,
      ...(initialValue ? { completed } : {}),
    }
    onSubmit(input)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>
      <label>
        Description
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <label>
        Tags
        <TagInput value={tags} onChange={setTags} />
      </label>
      {initialValue && (
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
          />
          Completed
        </label>
      )}
      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">{submitLabel}</button>
      </div>
    </form>
  )
}
