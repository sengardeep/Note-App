import express from 'express'
import { createNote, deleteNotes, getNotes, updateNotes, getNotebyId } from '../controllers/notesControllers.js';

const router=express.Router();

router.get("/",getNotes);

router.get("/:id",getNotebyId);

router.post("/",createNote);

router.put("/:id",updateNotes);

router.delete("/:id",deleteNotes);

export default router;