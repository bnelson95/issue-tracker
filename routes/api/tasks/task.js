import express from 'express'
import passport from 'passport'
import TaskGroup from '../../../models/tasks/task-group.js'
import Task from '../../../models/tasks/task.js'

const { Router } = express
const router = Router()

// put these helper methods somewhere?
const getGroupIdsForUser = async (userId) => {
  const conditions = {
    $or: [
      { createdBy: userId },
      { sharedWith: { $in: [userId] } }
    ]
  }
  return await TaskGroup.find(conditions, { _id: 1 })
    .then(groups => groups.map(x => x._id))
}
const getTasksForGroupIds = async (userId, groupIds) => {
  const conditions = {
    $or: [
      { createdBy: userId },
      { group: { $in: groupIds } }
    ]
  }
  return await Task.find(conditions)
}
const getTasksForUserGroups = async (user) => {
  return await getTasksForGroupIds(user.id, await getGroupIdsForUser(user.id))
}
const isValidGroupForUser = async (groupId, userId) => {
  if (!userId) return false // no user means we're not authenticated so nothing is valid
  if (!groupId || groupId === 'none') return true // no group is fine
  return await TaskGroup.findById(groupId)
    .then(group => group.createdBy === userId || group.sharedWith.includes(userId))
}

router.get('/', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (_err, user, info) => {
    if (!user) return res.status(403).send()
    await getTasksForUserGroups(user)
      .then(tasks => res.status(200).send({ tasks }))
      .catch(err => res.status(500).send(err))
  })(req, res)
})

router.post('/', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (_err, user, info) => {
    if (!user || !await isValidGroupForUser(req.body.group, user.id)) {
      return res.status(403).send()
    }
    const doc = {
      title: req.body.title,
      description: req.body.description,
      createdBy: user.id,
      group: req.body.group,
      dueOn: req.body.dueOn,
      sharedWith: []
    }
    new Task(doc).save()
      .then(task => res.status(200).send({ task }))
      .catch(err => res.status(500).send(err))
  })(req, res)
})

router.get('/:id', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (_err, user, info) => {
    if (!user) return res.status(403).send()
    await Task.findById(req.params.id)
      .then(async task => {
        if (await isValidGroupForUser(task.group, user.id)) {
          return res.status(200).send({ task: task })
        } else {
          return res.status(403).send()
        }
      })
      .catch(err => res.status(500).send(err))
  })(req, res)
})

router.put('/:id', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (_err, user, info) => {
    if (!user) return res.status(403).send()
    await Task.findById(req.params.id)
      .then(async task => {
        if (!await isValidGroupForUser(task.group, user.id)) {
          return res.status(403).send()
        }
        // TODO make this better
        task.title = req.body.title
        task.description = req.body.description
        task.status = req.body.status
        task.priority = req.body.priority
        task.group = req.body.group
        task.tags = req.body.tags
        task.links = req.body.links
        task.dueOn = req.body.dueOn
        task.changedOn = Date.now()
        task.save()
          .then(newTask => res.status(200).send({ task: newTask }))
      })
      .catch(err => res.status(500).send(err))
  })(req, res)
})

router.delete('/:id', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (_err, user, info) => {
    if (!user) return res.status(403).send()
    const conditions = {
      _id: req.params.id,
      createdBy: user.id
    }
    await Task.deleteOne(conditions)
      .then(_ => res.status(200).send('success'))
      .catch(err => res.status(500).send(err))
  })(req, res)
})

export default router
