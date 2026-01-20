import mongoose, { mongo } from 'mongoose'

const noteSchema=new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content: {
        type : String,
        required : true,
    }},
    {timestamps : true} //createdAt,updatedAt
);

const note = mongoose.model("note",noteSchema);

export default note;