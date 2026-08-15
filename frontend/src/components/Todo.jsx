import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Todo() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [todos, setTodos] = useState([]);

    const [editId, setEditID] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const token = localStorage.getItem("token");

    const API_URL = "https://todo-backend-ocq4.onrender.com/api/todos";

    const getTodo = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTodos(response.data);
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to view tasks"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        getTodo();
    }, []);


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const addTodo = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a task");
            return;
        }

        try {
            await axios.post(
                API_URL,
                {
                    title: title,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTitle("");

            // Refresh todos
            getTodo();
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add a task"
            );
        }
    };

    const updateTask = async (id) => {
        if (!editTitle.trim()) {
            alert("Please enter a task");
            return;
        }

        try {
            await axios.put(
                `${API_URL}/${id}`,
                {
                    title: editTitle,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditID(null);
            setEditTitle("");

            getTodo();
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update task"
            );
        }
    };

    // Toggle completed
    const toggleTodo = async (todo) => {
        try {
            await axios.put(
                `${API_URL}/${todo._id}`,
                {
                    completed: !todo.completed,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            getTodo();
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update task"
            );
        }
    };

    // Start editing
    const startEdit = (todo) => {
        setEditID(todo._id);
        setEditTitle(todo.title);
    };

    // Delete todo
    const deleteTodo = async (id) => {
        try {
            await axios.delete(
                `${API_URL}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            getTodo();
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete task"
            );
        }
    };

    return (
        <div className="todo-container">

            <div className="todo-header">
                <h1>Todo List</h1>

                <button
                    onClick={logout}
                    className="logout-btn"
                >
                    Logout
                </button>
            </div>

            {/* Add Todo */}
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    placeholder="Enter a new task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button type="submit">
                    Add
                </button>
            </form>

            {/* Loading */}
            {loading && (
                <p className="loading">
                    Loading todos....
                </p>
            )}

            {/* Error */}
            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {/* Empty todos */}
            {!loading && todos.length === 0 && (
                <p>
                    No Todo yet. Add your First Task in it
                </p>
            )}

            {/* Todo list */}
            {!loading && todos.length > 0 && (
                <div>
                    {todos.map((todo) => (
                        <div
                            className="todo-item"
                            key={todo._id}
                        >

                            {editId === todo._id ? (
                                <>
                                    <input
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(e.target.value)
                                        }
                                    />

                                    <button
                                        onClick={() =>
                                            updateTask(todo._id)
                                        }
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() => {
                                            setEditID(null);
                                            setEditTitle("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() =>
                                            toggleTodo(todo)
                                        }
                                    />

                                    <span
                                        className={
                                            todo.completed
                                                ? "completed"
                                                : ""
                                        }
                                    >
                                        {todo.title}
                                    </span>

                                    <button
                                        onClick={() =>
                                            startEdit(todo)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteTodo(todo._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Todo;