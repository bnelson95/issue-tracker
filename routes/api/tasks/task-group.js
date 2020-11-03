import express from 'express';
import passport from "passport";
import TaskGroup from "../../../models/tasks/task-group.js";

const { Router } = express;
const router = Router();

router.get('/', async (req, res) => {
	passport.authenticate('jwt', {session: false}, async (err, user, info) => {
		if (err) console.log(err);
		if (info) console.log(info);
		if (!user) res.status(403);
		
		await TaskGroup.find({
			createdBy: user.id
		})
		.then(groups => {
			res.send({ groups });
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

		new TaskGroup({
			title: req.body.title,
			description: req.body.description,
			createdBy: user.id
		})
		.save()
		.then(group => {
			res.send({ group });
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
			TaskGroup.findById(req.params.id)
			.then(group => {
				if (group.createdBy === user.id) {
					res.send({ group });
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

		TaskGroup.findById(req.params.id)
		.then(group => {
			if (group.createdBy !== user.id) res.status(403);
			group.title = req.body.title;
			group.description = req.body.description;
			group.color = req.body.color;
			group.save()
			.then(newGroup => {
				res.send({ group: newGroup });
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

		await TaskGroup.deleteOne({
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