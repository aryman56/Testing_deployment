const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: {
    type: "String",
    // required : true
  },
  description: {
    type: "String",
    // required : true
  },
  isCompleted: {
    type: "boolean",
    // required : true
    default: false,
  },
});
const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;
