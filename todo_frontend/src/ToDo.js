import { useEffect, useState } from "react"
import '../src/App.css'

export default function ToDo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todo, setTodo] = useState([])
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [editId, setEditId] = useState(-1)

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const apiUrl = "http://localhost:4000"

    const handleSubmit = () => {
        setError("")
        //input
        if (title.trim() !== '' && description.trim() !== '') {
            fetch(apiUrl + "/todos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            }).then((res) => {
                if (res.ok) {
                    console.log("added")
                    setTodo([...todo, { title, description }])
                    setMessage("ToDo added successfully")
                    setTimeout(() => {
                        setMessage("")
                    }, 3000);
                }
                else {
                    setError("error to create todo")
                }

            }).catch(() => {
                setError("error to create todo")
            })

        }
    }

    const handleUpdate = () => {
        setError("");

        if (editTitle.trim() !== '' && editDescription.trim() !== '') {
            fetch(`${apiUrl}/todos/${editId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editTitle, description: editDescription })
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to update todo");
                    }

                    // Update the local state manually without using updatedItem
                    const updatedTodos = todo.map((item) =>
                        item._id === editId
                            ? { ...item, title: editTitle, description: editDescription }
                            : item
                    );

                    setTodo(updatedTodos);
                    setMessage("ToDo updated successfully");
                    setTimeout(() => setMessage(""), 3000);
                    setEditId(-1);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Error updating todo");
                });
        }
    };



    const handleEditCancel = () => {
        setEditId(-1);
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you wnat to delete ")) {
            fetch(apiUrl + "/todos"+id, {
                method: 'DELETE'
            })
                .then(() => {
                    const updatedTodo = todo.filter((item) => item._id !== id)
                    setTodo(updatedTodo);
                })
        }
    }

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description);
    }

    useEffect(() => {
        getItems()
    }, [])

    const getItems = () => {
        fetch(apiUrl + "/todos")
            .then((res) => res.json())
            .then((res) => {
                setTodo(res)
            })
    }

    return <>
        <div className="row p-3 bg-success text-light radius-4 task-item">
            <h1> ToDo Project with MERN stack</h1>
        </div>

        <div className="row w-75 align-items-center task-item">
            <h3>Add item</h3>
            {message && <p className="text-success me-2">{message}</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" type="text" />
                <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" type="text" />
                <input type="submit" onClick={handleSubmit} value="Submit" className="btn btn-dark" />
            </div>
            {error && <p className="text-danger"> {error}</p>}
        </div>

        <div className="row mt-3 p-3 rounded-4 bg-light shadow-sm">
            <h3 className="mb-3">Tasks</h3>
            <ul className="list-group rounded-1">
                {
                    todo.map((item) =>
                        <li className="list-group-item task-item bg-info text-dark d-flex justify-content-between p-3 align-items-center my-2">
                            <div className="d-flex flex-column">
                                {
                                    editId === -1 || editId !== item._id ? <>
                                        <span className="fw-bold">{item.title}</span>
                                        <span>{item.description}</span>
                                    </> : <>
                                        <div className="form-group d-flex gap-2">
                                            <input placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="form-control" type="text" />
                                            <input placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="form-control" type="text" />
                                        </div>
                                    </>
                                }

                            </div>

                            <div className="d-flex gap-2">
                                {editId === -1 || editId !== item._id ?
                                    <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                    : <button onClick={handleUpdate}>Update </button>}
                                {editId === -1 || editId !== item._id ? <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button> :
                                    <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>}
                            </div>
                        </li>
                    )
                }
            </ul>

        </div>


    </>

}

