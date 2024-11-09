//First decide the shape of the note using a mongoSchema
const mongoose = require('mongoose');

const noteSchema =  new mongoose.Schema({
    title:{
        type:String,
        require: true,
        trim:true
    },          
    content:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: Date.now
    }
})
//Create the model about in schema
const Note = mongoose.model('Note',noteSchema);
module.exports = Note