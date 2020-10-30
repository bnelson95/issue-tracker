import express from 'express';
import passport from "passport";
import Task from "../../../models/tasks/task.js";

const { Router } = express;
const router = Router();

router.get('/', async (req, res) => {
	passport.authenticate('jwt', {session: false}, async (err, user, info) => {
		if (err) console.log(err);
		if (info) console.log(info);
		if (!user) res.status(403);
		
		await Task.find({
			createdBy: user.id
		})
		.then(tasks => {
			res.send({ tasks });
		})
		.catch(err => {
			res.status(400).send(err);
		})
	})(req, res);
});

router.post('/', async (req, res) => {
	passport.authenticate('jwt', {session: false}, async (err, user, info) => {
		if (err) console.log(err);
		if (info) console.log(info);
		if (!user) res.status(403);
		new Task({
			title: req.body.title,
			description: req.body.description,
			group: req.body.group,
			createdBy: user.id
		})
		.save()
		.then(task => {
			res.send({ task });
		})
		.catch(err => {
			res.status(400).send(err);
		})
	})(req, res);
})

router.get('/:id', async (req, res) => {
	passport.authenticate('jwt', {session: false}, async (err, user, info) => {
		if (err) console.log(err);
		if (info) console.log(info);
		if (!user) res.status(403);
		try {
			Task.findById(req.params.id)
			.then(task => {
				if (task.createdBy === user.id) {
					res.send({ task: task });
				} else {
					res.status(403); // Unauthorized
				}
			})
		} catch (err) {
			res.status(400).send(err);
		}
	})(req, res)
});

router.put('/:id', async (req, res) => {
	passport.authenticate('jwt', {session: false}, async (err, user, info) => {
		if (err) console.log(err);
		if (info) console.log(info);
		if (!user) res.status(403);
		Task.findById(req.params.id)
		.then(task => {
			if (task.createdBy !== user.id) res.status(403);
			task.title = req.body.title;
			task.description = req.body.description;
			task.status = req.body.status;
			task.priority = req.body.priority;
			task.group = req.body.group;
			task.tags = req.body.tags;
			task.save()
			.then(newTask => {
				res.send({ task: newTask });
			})
			.catch(err => {
				res.status(400).send(err);
			})
		})
		.catch(err => {
			res.status(400).send(err)
		})
	})(req, res)
});

router.delete('/:id', async (req, res) => {
	passport.authenticate('jwt', {session: false}, async (err, user, info) => {
		console.log(req.params)
		if (err) console.log(err);
		if (info) console.log(info);
		if (!user) res.status(403);
		await Task.deleteOne({
			_id: req.params.id,
			createdBy: user.id
		})
		.then(_ => {
			res.send("success");
		})
		.catch(err => {
			res.status(401).send(err);
		})
	})(req, res)
});

export default router;