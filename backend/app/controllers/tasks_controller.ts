import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'
import TaskTransformer from '#transformers/task_transformer'
import { createTaskValidator, updateTaskValidator } from '#validators/task'

export default class TasksController {
  async index({ serialize }: HttpContext) {
    const tasks = await Task.query().orderBy('createdAt', 'desc')

    return serialize(TaskTransformer.transform(tasks))
  }

  async store({ request, serialize }: HttpContext) {
    const { title, description, tags } = await request.validateUsing(createTaskValidator)

    const task = await Task.create({
      title,
      description: description ?? null,
      tags: JSON.stringify(tags ?? []),
      completed: false,
    })

    return serialize(TaskTransformer.transform(task))
  }

  async show({ params, serialize }: HttpContext) {
    const task = await Task.findOrFail(params.id)

    return serialize(TaskTransformer.transform(task))
  }

  async update({ params, request, serialize }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    const { title, description, tags, completed } = await request.validateUsing(updateTaskValidator)

    task.merge({
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(tags !== undefined ? { tags: JSON.stringify(tags) } : {}),
      ...(completed !== undefined ? { completed } : {}),
    })
    await task.save()

    return serialize(TaskTransformer.transform(task))
  }

  async destroy({ params }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    await task.delete()

    return {
      message: 'Task deleted successfully',
    }
  }
}
