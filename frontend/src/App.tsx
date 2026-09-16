import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { TasksView } from './components/TasksView'
import { Dashboard } from './components/Dashboard'
import './App.css'

type Tab = 'tasks' | 'dashboard'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('tasks')
  const { tasks, loading, error, createTask, updateTask, deleteTask, toggleComplete } = useTasks()

  return (
    <div className="app">
      <header>
        <h1>FlowSync</h1>
        <nav className="tab-nav">
          <button
            type="button"
            className={activeTab === 'tasks' ? 'active' : ''}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
          <button
            type="button"
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'tasks' ? (
          <TasksView
            tasks={tasks}
            loading={loading}
            error={error}
            createTask={createTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        ) : (
          <Dashboard tasks={tasks} />
        )}
      </main>
    </div>
  )
}

export default App
