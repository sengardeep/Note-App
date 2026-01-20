import note from "../../models/note.js";

export async function getNotes(req, res) {
    try {
        const notes = await note.find().sort({createdAt : -1}); //newest first
        res.status(200).json(notes);
    } catch (e) {
        console.error("Error in getNotes", e);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};
export async function getNotebyId(req, res) {
    try {
        const noteData = await note.findById(req.params.id);
        if(!noteData) return res.status(404).json({message:"Note not found"});
        res.status(200).json(noteData);
    } catch (e) {
        console.error("Error in getting the note", e);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new note({ title, content });

        await newNote.save();
        res.status(200).json({
            message: "Note created successfully"
        })
    } catch (error) {
        console.error("Error in creating note", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export async function updateNotes(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            })
        }

        res.status(200).json({
            updatedNote
        })
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export async function deleteNotes(req, res) {
    try{
        const id=req.params.id;
        const deletedNote=await note.deleteOne({_id:id});

        if(!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            })
        }
        res.status(200).json({
            deletedNote
        })
    }catch(error){
        console.error("Error", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};
