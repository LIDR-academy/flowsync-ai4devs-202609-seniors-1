import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

type TaskBody = { data: { id: number; completed: boolean } }
type TaskListBody = { data: Array<{ completed: boolean }> }

test.group('Tasks', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('creates a task', async ({ client, assert }) => {
    const response = await client.post('/api/v1/tasks').json({
      title: 'Write tests',
      description: 'Cover the tasks resource',
      tags: ['backend', 'testing'],
    })

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        title: 'Write tests',
        description: 'Cover the tasks resource',
        completed: false,
        tags: ['backend', 'testing'],
      },
    })
    await assert.isTrue((response.body() as TaskBody).data.id > 0)
  })

  test('fails to create a task without a title', async ({ client }) => {
    const response = await client.post('/api/v1/tasks').json({ description: 'No title' })

    response.assertStatus(422)
  })

  test('lists all tasks', async ({ client }) => {
    await client.post('/api/v1/tasks').json({ title: 'Task 1' })
    await client.post('/api/v1/tasks').json({ title: 'Task 2' })

    const response = await client.get('/api/v1/tasks')

    response.assertStatus(200)
    response.assertBodyContains({ data: [{ title: 'Task 1' }, { title: 'Task 2' }] })
  })

  test('shows a single task', async ({ client }) => {
    const created = await client.post('/api/v1/tasks').json({ title: 'Task to show' })
    const id = (created.body() as TaskBody).data.id

    const response = await client.get(`/api/v1/tasks/${id}`)

    response.assertStatus(200)
    response.assertBodyContains({ data: { id, title: 'Task to show' } })
  })

  test('returns 404 for a missing task', async ({ client }) => {
    const response = await client.get('/api/v1/tasks/999999')

    response.assertStatus(404)
  })

  test('updates a task and marks it complete', async ({ client, assert }) => {
    const created = await client.post('/api/v1/tasks').json({ title: 'Task to update' })
    const id = (created.body() as TaskBody).data.id

    const response = await client.put(`/api/v1/tasks/${id}`).json({
      title: 'Updated task',
      completed: true,
    })

    response.assertStatus(200)
    response.assertBodyContains({ data: { id, title: 'Updated task', completed: true } })
    await assert.isTrue((response.body() as TaskBody).data.completed)

    // Re-fetch to confirm the persisted (not just in-memory) value serializes
    // as a real boolean, not SQLite's raw 0/1.
    const refetched = await client.get(`/api/v1/tasks/${id}`)
    refetched.assertBodyContains({ data: { completed: true } })
  })

  test('deletes a task', async ({ client }) => {
    const created = await client.post('/api/v1/tasks').json({ title: 'Task to delete' })
    const id = (created.body() as TaskBody).data.id

    const response = await client.delete(`/api/v1/tasks/${id}`)

    response.assertStatus(200)

    const showResponse = await client.get(`/api/v1/tasks/${id}`)
    showResponse.assertStatus(404)
  })

  test('reflects total and completed counts across the list', async ({ client, assert }) => {
    const first = await client.post('/api/v1/tasks').json({ title: 'Count task 1' })
    const second = await client.post('/api/v1/tasks').json({ title: 'Count task 2' })
    await client.post('/api/v1/tasks').json({ title: 'Count task 3' })

    const firstId = (first.body() as TaskBody).data.id
    const secondId = (second.body() as TaskBody).data.id
    await client.put(`/api/v1/tasks/${firstId}`).json({ completed: true })
    await client.put(`/api/v1/tasks/${secondId}`).json({ completed: true })

    const response = await client.get('/api/v1/tasks')
    const tasks = (response.body() as TaskListBody).data

    assert.equal(tasks.length, 3)
    assert.equal(tasks.filter((task) => task.completed === true).length, 2)
  })
})
