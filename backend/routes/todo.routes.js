const express = require("express");


const todoRouter = express.Router();
const { auth } = require("../middleware/auth.middleware");

const {viewTodo, createTodo, removeTodo, updateTodo} = require("../controller/todo.controller");
//view todo
todoRouter.get("/", auth, viewTodo);

todoRouter.post("/", auth, createTodo);

todoRouter.put("/:id", auth, updateTodo);

todoRouter.delete("/:id", auth, removeTodo);

module.exports=todoRouter;