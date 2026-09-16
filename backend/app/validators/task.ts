import vine from '@vinejs/vine'

const title = () => vine.string().trim().minLength(1).maxLength(255)
const description = () => vine.string().trim().maxLength(2000).nullable()
const tags = () => vine.array(vine.string().trim().minLength(1).maxLength(50))

/**
 * Validator to use when creating a task
 */
export const createTaskValidator = vine.create({
  title: title(),
  description: description().optional(),
  tags: tags().optional(),
})

/**
 * Validator to use when updating a task
 */
export const updateTaskValidator = vine.create({
  title: title().optional(),
  description: description().optional(),
  tags: tags().optional(),
  completed: vine.boolean().optional(),
})
