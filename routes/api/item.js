import express from 'express'
import passport from 'passport'
import Item from '../../models/item.js'

const router = express.Router()

router.get('/', async (req, res) => {
  passport.authenticate('jwt', {session: false}, async (err, user, info) => {
    if (!user) res.status(403).send()
    try {
      const items = await Item.find({
        createdBy: user.id
      })
      if (!items) throw new Error('No items')
      const sorted = items.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      res.status(200).json(sorted)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })(req, res)
})

router.post('/', async (req, res) => {
  passport.authenticate('jwt', {session: false}, async (err, user, info) => {
    if (!user) res.status(403).send()
    const newItem = new Item({
      description: req.body.description,
      createdBy: user.id
    })
    try {
      const item = await newItem.save()
      if (!item) throw new Error('Something went wrong saving the item')
      res.status(200).json(item)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })(req, res)
})

router.put('/:id', async (req, res) => {
  passport.authenticate('jwt', {session: false}, async (err, user, info) => {
    if (!user) res.status(403).send()
    const { id } = req.params
    try {
      const filter = {
        _id: id,
        createdBy: user.id
      }
      const response = await Item.findOneAndUpdate(filter, req.body)
      if (!response) throw Error('Something went wrong ')
      const updated = { ...response._doc, ...req.body }
      res.status(200).json(updated)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })(req, res)
})

router.delete('/:id', async (req, res) => {
  passport.authenticate('jwt', {session: false}, async (err, user, info) => {
    if (!user) res.status(403).send()
    const { id } = req.params
    try {
      const removed = await Item.deleteOne({
        _id: id,
        createdBy: user.id
      })
      if (!removed) throw Error('Something went wrong ')
      res.status(200).json(removed)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })(req, res)
})

export default router
