import { noteModel } from "../../../db/model/note/note/note.model.js";
import catchError from "../../middelware/catchError.js";
//ADD NOTE
let addNote = catchError(async (req, res) => {
  req.body.createdBy = req.user._id;
  let newNote = await noteModel.insertMany(req.body);
  res.status(200).json({ message: "createdNote", newNote });
});

//GET USER NOTE
let getNote = catchError(async (req, res) => {
  let notes = await noteModel
    .find({ createdBy: req.user._id })
    .populate("createdBy");
  res.status(200).json({ message: "user notes", notes });
});

//UPDATE NOTE
let updateNote = catchError(async (req, res) => {
  let founderNote = await noteModel.findByIdAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    {
      title: req.body.title,
      desciption: req.body.desciption,
      createdBy: req.user._id,
    }
  );
  res.status(200).json({ message: "updated", founderNote });
});

//DELETE NOTE
let deleteNote = catchError(async (req, res) => {
  let deletedNote = await noteModel.findByIdAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  res.json({ message: "deleted", deleteNote });
});
export { addNote, getNote, updateNote, deleteNote };
