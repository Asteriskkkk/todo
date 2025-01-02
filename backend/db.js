const { default: mongoose } = require('mongoose')
const mongosee = require('mongoose')
const { string, boolean } = require('zod')

mongoose.connect("mongodb+srv://amitlpatil282006:eLU2IFiUBtzF0K4y@cluster0.3kef7.mongodb.net/")

const todoSchema = mongosee.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema)

module.exports = {
    todo
}