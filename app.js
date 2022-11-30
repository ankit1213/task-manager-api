const express=require("express")
const mongoose=require('mongoose')
const User=require('./models/task')
const app=express();

app.use(express.json())
mongoose.connect("mongodb://localhost:27017/task-manager")
.then(()=>{
    console.log("Connected")
}).catch(e=>{
    console.log(e)
})

// Creating a new task
app.post("/v1/tasks",async (req,res)=>{
    try{
        const newTask=await User.create({
            title:req.body.title,
            is_completed:true
        })
        res.status(201).json({
            status:"Success",
            id:newTask
        })
    }catch(e){
        res.status(400).json({
            status:"Unsuccessfull",
            message:e.message
        })
    }

})
//Fetching all The tasks
app.get("/v1/tasks", async(req,res)=>{
    try{
        const allUsers=await User.find()
        res.status(200).send(allUsers)

    }catch(e){
        res.status(400).json({
            status:"Unsuccessful",
            message:e.message
        })

    }
})
// fetching a Particular task
app.get("/v1/tasks/:id",async(req,res)=>{
    try{
        const user=await User.find({_id:req.params.id})
        
            res.status(200).json({
                user:user})
        
    }catch(e){
        res.status(404).json({
            error:"There is no task at that id"
        })

    }
})
// Deleteing a Particular task
app.delete("/v1/tasks/:id",async(req,res)=>{
    try{
        const deletedUser=await User.delete({_id:req.params.id})
        res.status(204)
    }catch(e){
        res.status(204).json({
            status:"bad request",
            message:e.message
        })
    }
})

app.put('/v1/tasks/:id',async(req,res)=>{
    try{
        const updatedUser=await User.updateOne({_id:req.params.id},{title:req.body.title,is_completed:req.body.is_completed})
        res.status(200).send(updatedUser)
    }catch(e){
        res.status(404).json({
            message:e.message
        })
    }
})
// Adding Multiple tasks to the database
app.post("'/v1/task",async(req,res)=>{
    try{const tasks=req.body.tasks
        console.log(tasks)
        for(let i=0;i<tasks.length;i++){
            await User.create(tasks[i])
        }
        res.status(200).json({
            status:"Successful"
        })}catch(e){
            res.status(400).json({
                message:e.message
            })
        }
    
})



app.listen(3000,()=>{
    console.log("Server is up at 3000")
})