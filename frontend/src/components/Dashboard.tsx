import type { Task } from '../types/task'

interface DashboardProps {
  tasks: Task[]
}

export function Dashboard({ tasks }: DashboardProps) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const remaining = total - completed
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="dashboard">
      <div className="stat-card">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Total tasks</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{remaining}</span>
        <span className="stat-label">Remaining</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{percentage}%</span>
        <span className="stat-label">Completion rate</span>
      </div>
    </div>
  )
}
