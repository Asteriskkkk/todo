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

    if (!payload.title || payload.title.trim() === '') {
      return res.status(400).json({ msg: 'Title cannot be empty' });
    }
  
    if (!payload.description || payload.description.trim() === '') {
      return res.status(400).json({ msg: 'Description cannot be empty' });
    }

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
      title: payload.title,
      description: payload.description,
      completed: false
    })
})

app.get('/todos', async(req, res) => {
  const todos = await todo.find({});
  res.send(todos);
})

app.get('/greeting', (req, res) => {
  const hours = new Date().getHours();
  let greeting = '';

  if (hours < 12) {
    greeting = 'Good Morning';
  } else if (hours < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  res.json({ greeting });
});

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

      res.status(200).json({ todo: updatedTodo });
  } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }

})

app.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
