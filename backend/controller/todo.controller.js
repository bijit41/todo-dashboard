const Todo = require("../models/todo.model");


const viewTodo = async(req, res)=>{
    try{
        const todo = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(todo);
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

//creating the todo list
const createTodo = async(req, res)=>{
    try{
        const {title} = req.body;

        if(!title){
            return res.status(400).json({
                message:"Todo List title is required"
            })
        }

        const todo = new Todo({
            title: title,
            user:req.user._id
        })

        await todo.save();
        res.status(200).json({
            message:"Todo List Created Successfully",
            todo:todo
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

//updating the todo list
const updateTodo = async(req, res)=>{
    try{
        const {title, completed} = req.body;
        const todo = await Todo.findOne({
            _id:req.params.id,
            user:req.user._id
        });

        if(!todo){
            return res.status(400).json({
                message: "Todo List Not Found"
            })
        }

        if(title !== undefined){
            todo.title = title;
        }
        if(completed !== undefined){
            todo.completed = completed;
        }

        await todo.save();
        res.status(200).json({
            message:"Todo List Updated Successfully",
            todo:todo
        })

    }catch(error){
        res.status(400).json({
            message:error.message
        });
    }
}

//removing the todo list
const removeTodo = async(req, res)=>{
    try{
        const todo = await Todo.findOneAndDelete({
            _id:req.params.id,
            user:req.user._id
        });

        if(!todo){
            return res.status(400).json({
                message: "Todo List Not Found"
            })
        }
        res.status(200).json({
            message:"Todo List Removed Successfully"
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        });
    }
}
module.exports ={
    viewTodo,
    createTodo,
    updateTodo,
    removeTodo
}