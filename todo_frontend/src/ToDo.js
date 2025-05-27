import { useState } from "react"

export default function ToDo() {

    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");

    const handleSubmit =()=>{
        //input
        
    }

    return <>
        <div className="row p-3 bg-success text-light radius-4 " style={{ minWidth: '400px' }}>
            <h1> ToDo Project with MERN stack</h1>
        </div>

        <div className="row w-75 align-items-center">
            <h3>Add item</h3>
            <p className="text-success">added successfully</p>
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control" type="text" />
                <input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" type="text" />
                <input type="submit" onClick={handleSubmit} value="Submit" className="btn btn-dark" />
            </div>
        </div>

    </>

}