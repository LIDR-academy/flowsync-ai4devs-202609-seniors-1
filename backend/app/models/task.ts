import { TaskSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'

export default class Task extends TaskSchema {
  /**
   * SQLite stores booleans as 0/1; cast on read so API responses
   * always serialize `completed` as a real boolean.
   */
  @column({ consume: (value: unknown) => Boolean(value) })
  declare completed: boolean
}
