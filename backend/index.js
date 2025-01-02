const express = require('express')
const { createTodo, updateTodo } = require('./types')
const { todo } = require('./db')
const app = express()  
const cors = require("cors")
const port = 3000

app.use(express.json());
app.use(cors());


app.post('/todo',async (req,res) =>{
    const payload = req.body;
    const parsedPayload = createTodo.safeParse(payload);
    if(!parsedPayload.success){
      res.status(411).json({
          msg: "you sent the wrong inputs"
        }
      )
      return;
    }
    await todo.create({
      title: payload.title,
      description: payload.description,
      completed: false
    })
  
    res.json({
      msg: "todo is created"
    })
})

app.get('/todos', async(req, res) => {
  const todos = await todo.find({});
  res.send(todos);
})


app.put('/completed',async (req,res)=>{
    const payload = req.body;
    const updatePayload = updateTodo.safeParse(payload);
    if(!updatePayload.success){
      res.status(401).json({
          msg: "you sent the wrong inputs"
        }
      )
      return;
    }
    const _id = req.body.id;

    try {
      const updatedTodo = await todo.findByIdAndUpdate(_id, {
          completed: true
      }, { new: true }); // `new: true` returns the updated document

      if (!updatedTodo) {
          return res.status(404).json({ message: "Todo not found" });
      }

      res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }

}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
