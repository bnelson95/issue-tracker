import express from 'express';
import passport from "passport";
import TaskGroup from "../../../models/tasks/task-group.js";
import User from '../../../models/user.js';

const { Router } = express;
const router = Router();

const getEmailForUserId = async userId => {
  return await User.findById(userId)
    .then(user => user.email)
}

const getUserIdForEmail = async email => {
  return await User.findOne({ email })
    .then(user => user.id)
}

router.get('/', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (!user) return res.status(403).send();
    const conditions = {
      $or: [
        { createdBy: user.id },
        { sharedWith: { $in: [user.id] } }
      ]
    }
    await TaskGroup.find(conditions)
      .then(async groups => {
        const groups2 = await Promise.all(groups.map(async (group, i) => {
          const sharedWith = await Promise.all(group.sharedWith.map(async user => {
            return await getEmailForUserId(user)
          }))
          return { ...group._doc, sharedWith }
        }))
        return res.status(200).send({ groups: groups2 })
      })
      .catch(err => res.status(500).send(err.stack))
  })(req, res);
});

router.post('/', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (!user) return res.status(403).send();
    const doc = {
      title: req.body.title,
      description: req.body.description,
      createdBy: user.id
    }
    new TaskGroup(doc).save()
      .then(group => res.status(200).send({ group }))
      .catch(err => res.status(500).send(err))
  })(req, res);
})

router.get('/:id', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (!user) return res.status(403).send();
    await TaskGroup.findById(req.params.id)
      .then(group => {
        if (group.createdBy !== user.id && !group.sharedWith.includes(user.id))
          return res.status(403); // Unauthorized
        return res.status(200).send({ group });
      })
      .catch(err => res.status(500).send(err))
  })(req, res)
});

router.put('/:id', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (!user) return res.status(403).send();
    await TaskGroup.findById(req.params.id)
      .then(async group => {
        if (group.createdBy !== user.id) return res.status(403).send();
        group.title = req.body.title;
        group.description = req.body.description;
        group.color = req.body.color;
        group.sharedWith = await Promise.all(req.body.sharedWith.map(async user => {
          return await getUserIdForEmail(user)
        }))
        group.save()
          .then(newGroup => res.status(200).send({ group: newGroup }))
      })
      .catch(err => res.status(500).send(err))
  })(req, res)
});

router.delete('/:id', async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (!user) return res.status(403);
    const conditions = {
      _id: req.params.id,
      createdBy: user.id
    }
    await TaskGroup.deleteOne(conditions)
      .then(_ => res.status(200).send("success"))
      .catch(err => res.status(500).send(err))
  })(req, res)
});

export default router;