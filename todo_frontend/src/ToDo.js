import { useState } from "react"

export default function ToDo() {

    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [todo , setTodo] = useState([])
    const [error , setError] = useState("")
    const [message , setMessage] = useState("")
    const apiUrl="http://localhost:4000"

    const handleSubmit =()=>{
        //input
        if(title.trim() !== '' && description.trim()!== ''){
            fetch(apiUrl+ "/todos",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title,description})
            }).then((res)=>{
                if(res.ok){
                    console.log("added")
                    setTodo([...todo, {title,description}])
                    setMessage("ToDo added successfully")
                    setTimeout(() => {
                        setMessage("")
                    }, 3000);
                }
                else{
                    setError("error to create todo")
                }
                
            })
            
        }
    }

    return <>
        <div className="row p-3 bg-success text-light radius-4 " style={{ minWidth: '400px' }}>
            <h1> ToDo Project with MERN stack</h1>
        </div>

        <div className="row w-75 align-items-center">
            <h3>Add item</h3>
            {message && <p className="text-success">{message}</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control" type="text" />
                <input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" type="text" />
                <input type="submit" onClick={handleSubmit} value="Submit" className="btn btn-dark" />
            </div>
            { error && <p className="text-danger"> {error}</p>}
        </div>

    </>

}