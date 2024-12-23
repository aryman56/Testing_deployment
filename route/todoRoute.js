const express = require("express");
const { body } = require("express-validator");
const {
  handleFetchAllTodo,
  handleAddTodo,
  handleUpdateTodo,
  handleDeleteTodo,
  handleToggleTodoStatus,
} = require("../controller/todoController");
const router = express.Router();

// Route 1 // fetching all todos by the req http://localhost:3000/todoList/fetchAllTodo
router.get("/fetchAllTodo", handleFetchAllTodo);


router.get("/hello", (req, res) => {
  res.send("Hello World12");
});

// Route 2  // Create  todo by the reqhttp://localhost:3000/todoList/createtodo
router.post(
  "/createTodo",
  [[body("title").notEmpty(), body("description").isLength({ min: 5 })]],
  handleAddTodo
);

// Route 3  // edit  todo by the req http://localhost:3000/todoList/updateTodo/:id
router.put("/updateTodo/:id", handleUpdateTodo);

// Route 4 // delete  todo by the req http://localhost:3000/todoList/deleteTodo/:id
router.delete("/deleteTodo/:id", handleDeleteTodo);
router.put("/updateTodoStatus/:id", handleToggleTodoStatus);

module.exports = router;
