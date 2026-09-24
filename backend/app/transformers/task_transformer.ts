import type Task from '#models/task'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TaskTransformer extends BaseTransformer<Task> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'description',
        'completed',
        'createdAt',
        'updatedAt',
      ]),
      tags: TaskTransformer.parseTags(this.resource.tags),
    }
  }

  static parseTags(tags: string): string[] {
    try {
      const parsed = JSON.parse(tags)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
}
