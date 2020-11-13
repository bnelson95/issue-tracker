import mongoose from "mongoose";

var TaskGroupSchema = new mongoose.Schema({
	title: String,
	description: String,
	createdBy: String,
	createdOn: {
		type: Date,
		default: Date.now
	},
	changedOn: {
		type: Date,
		default: Date.now
	},
	dueOn: {
		type: Date,
		default: Date.now
	},
	color: {
		type: String,
		default: "fff"
	},
	sharedWith: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});

export default mongoose.model("TaskGroup", TaskGroupSchema);