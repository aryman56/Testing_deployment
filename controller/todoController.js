const { validationResult } = require("express-validator");
const Todo = require("../model/todoModel");

const handleFetchAllTodo = async (req, res) => {
  try {
    let todo = await Todo.find();
    res.json(todo);
    if (!todo) {
      return res.status(400).json({ success, error: "there is no todo " });
    }
  } catch {
    console.error("error");
    res.status(500).send("internal server  error occured");
  }
};
// const handleGetTodo = async (req, res) => {};
const handleAddTodo = async (req, res) => {
  try {
    const errors = validationResult(req);

    //  check error is empty or not
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
      // return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    // we can create new user by  database query schema-name.create({}) and new schema-Name.schema({}) //here schema name is todolist but with new scheme syntax we can add data in databare by variable.save();
    let todo = new Todo({
      title: title,
      description: description,
    });

    // here it is variable.save()
    todo = await todo.save();
    res.json(todo);
  } catch {
    console.error("error");
  }
};
const handleUpdateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log({ title, description });
    let newTodo = {};
    if (title) {
      newTodo.title = title;
    }
    if (description) {
      newTodo.description = description;
    }
    console.log(req.params.id);
    // find a todo by id
    let todo = await Todo.findById(req.params.id);
    console.log(todo);
    if (!todo) {
      return res.status(400).json({ msg: "todo not found" });
    }
    // update an exitng todo by id
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: newTodo },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    console.error("error helllo");
    res.status(500).send("internal server  error occured");
  }
};

const handleDeleteTodo = async (req, res) => {
  try {
    // find a todo by id
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ msg: "todo not found" });
    }
    // delete a todo by id
    let deletTodo = await Todo.findByIdAndDelete(req.params.id);

    console.log(deletTodo);
    const delTodo = await deletTodo;
    console.log(delTodo);
    res.json(delTodo);
  } catch (error) {
    console.error("error");
    res.status(500).send("internal server  error occured");
  }
};
const handleToggleTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { iscompleted } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { iscompleted },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error updating todo status" });
  }
}
   
module.exports = {
  handleFetchAllTodo,
  handleAddTodo,
  handleUpdateTodo,
  handleDeleteTodo,
  handleToggleTodoStatus,
};
