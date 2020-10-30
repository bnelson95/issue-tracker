import mongoose from "mongoose";
const { Schema, model } = mongoose;

var TaskGroupSchema = new Schema({
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
	}
});

export default model("TaskGroup", TaskGroupSchema);