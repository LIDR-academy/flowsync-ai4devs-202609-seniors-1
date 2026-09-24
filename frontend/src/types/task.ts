export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  tags: string[]
  createdAt: string
  updatedAt: string | null
}

export interface TaskInput {
  title: string
  description?: string | null
  tags?: string[]
}

export interface TaskUpdateInput {
  title?: string
  description?: string | null
  tags?: string[]
  completed?: boolean
}
