import { useState } from 'react'
import { TaskForm } from './TaskForm'
import { TaskList } from './TaskList'
import { ConfirmDialog } from './ConfirmDialog'
import type { Task, TaskInput, TaskUpdateInput } from '../types/task'

interface TasksViewProps {
  tasks: Task[]
  loading: boolean
  error: string | null
  createTask: (input: TaskInput) => Promise<void>
  updateTask: (id: number, input: TaskUpdateInput) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  toggleComplete: (id: number, completed: boolean) => Promise<void>
}

export function TasksView({
  tasks,
  loading,
  error,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
}: TasksViewProps) {
  const [creating, setCreating] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  const handleCreate = async (input: TaskInput | TaskUpdateInput) => {
    await createTask(input as TaskInput)
    setCreating(false)
  }

  const handleUpdate = async (input: TaskInput | TaskUpdateInput) => {
    if (!editingTask) return
    await updateTask(editingTask.id, input as TaskUpdateInput)
    setEditingTask(null)
  }

  const handleDelete = async () => {
    if (!deletingTask) return
    await deleteTask(deletingTask.id)
    setDeletingTask(null)
  }

  return (
    <div className="tasks-view">
      {error && <p className="error-banner">{error}</p>}

      {!creating && !editingTask && (
        <button type="button" onClick={() => setCreating(true)}>
          New Task
        </button>
      )}

      {creating && (
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          submitLabel="Create"
        />
      )}

      {editingTask && (
        <TaskForm
          initialValue={editingTask}
          onSubmit={handleUpdate}
          onCancel={() => setEditingTask(null)}
          submitLabel="Save"
        />
      )}

      {loading ? (
        <p>Loading tasks…</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={setDeletingTask}
          onToggleComplete={toggleComplete}
        />
      )}

      <ConfirmDialog
        open={deletingTask !== null}
        message={`Delete "${deletingTask?.title}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  )
}
