import { useState } from 'react'
import type { Task } from '../types/task'

type Filter = 'all' | 'active' | 'completed'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onToggleComplete: (id: number, completed: boolean) => void
}

export function TaskList({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) {
  const [filter, setFilter] = useState<Filter>('all')

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="task-list">
      <div className="filter-bar">
        {(['all', 'active', 'completed'] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={filter === option ? 'active' : ''}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {visibleTasks.length === 0 ? (
        <p className="empty-state">No tasks to show.</p>
      ) : (
        <table>
          <tbody>
            {visibleTasks.map((task) => (
              <tr key={task.id} className={task.completed ? 'completed' : ''}>
                <td className="task-cell">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(event) => onToggleComplete(task.id, event.target.checked)}
                    aria-label={`Mark ${task.title} as ${task.completed ? 'active' : 'completed'}`}
                  />
                  <div>
                    <div className="task-title">{task.title}</div>
                    {task.description && <div className="task-description">{task.description}</div>}
                    {task.tags.length > 0 && (
                      <div className="task-tags">
                        {task.tags.map((tag) => (
                          <span className="tag-chip read-only" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="task-actions">
                  <button type="button" onClick={() => onEdit(task)}>
                    Edit
                  </button>
                  <button type="button" className="danger" onClick={() => onDelete(task)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
