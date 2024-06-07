import NoteModel from "../models/Note.js";
import fs from "fs";
import { errorHandler, successHandler } from "../services/responseHandler.js";
import {
  generatePublicURL,
  uploadToGoogleDrive,
  deleteFromGoogleDrive
} from "../services/googleDriveService.js";
import { cloudresourcemanager } from "googleapis/build/src/apis/cloudresourcemanager/index.js";

class notesController {
  static helloWorld= async (req, res)=>{
    res.send("Hello this is Edudoc API!")
  }

  static publishNotes = async (req, res) => {
    
    try {
      const {
        title,
        content,
        document_type,
        subject,
        subject_code,
        branch,
        college,
        author,
        published,
      } = req.body;
      
     

      const fileUrl = req.file.path;
      console.log(fileUrl)
      if (!title || !content || !fileUrl) {
        errorHandler(res, {
          message: "All fields required",
          status: 400,
        });
      }

      const googleDriveResponse = await uploadToGoogleDrive(fileUrl);
      console.log("drive is fine")

      if (!googleDriveResponse) {
        errorHandler(res, {
          message: "Failed to upload file to backend !",
          status: 500,
        });
      }

      const newNote = new NoteModel({
        title,
        content,
        file_url: await generatePublicURL(googleDriveResponse),
        gapis_file_id: googleDriveResponse,
        document_type,
        subject,
        subject_code,
        author,
        branch,
        college,
      });
      try {
        const savedNote = await newNote.save();
        console.log("db works fine")

        fs.unlinkSync(fileUrl);

        successHandler(res, savedNote, "Note created succesfully");
      } catch (error) {
        
        errorHandler(res, error);
      }
    } catch (error) {
      
      errorHandler(res, error);
    }
  };

  static deleteNote = async (req, res) => {
    try {
      const noteId = req.params.id;
      
      const note = await NoteModel.findByIdAndDelete(noteId);
      
      const response = await deleteFromGoogleDrive(note.gapis_file_id);
     

      if (!note) {
        return res.status(404).json({
          status: false,
          message: "Note not found",
        });
      }

      res.json({
        status: true,
        data: note,
        message: "Note deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getAllNotes = async (req, res) => {
    try {
      const verifiedNotes = await NoteModel.find({ verified: false });

      res.json({
        status: true,
        data: verifiedNotes,
        message: "Non Verified notes retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getVerifiedNotes = async (req, res) => {
    try {
      const verifiedNotes = await NoteModel.find({ verified: true });

      res.json({
        status: true,
        data: verifiedNotes,
        message: "Verified notes retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };
  
  static verifyNote = async (req, res) => {
    try {
      const noteId = req.params.id;

      const note = await NoteModel.findByIdAndUpdate(
        noteId,
        { verified: true },
        { new: true }
      );

      if (!note) {
        return res.status(404).json({
          status: false,
          message: "Note not found",
        });
      }

      res.json({
        status: true,
        data: note,
        message: "Note verified successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };

  static increaseLikeCount = async (req, res) => {
    try {
      const noteId = req.params.id;

      const note = await NoteModel.findById(noteId);

      if (!note) {
        return res.status(404).json({
          status: false,
          message: "Note not found",
        });
      }

      note.likeCount += 1;

      const updatedNote = await note.save();

      res.json({
        status: true,
        data: updatedNote,
        message: "Like count increased successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };

  static increaseViewCount = async (req, res) => {
    try {
      const noteId = req.params.id;

      const note = await NoteModel.findById(noteId);

      if (!note) {
        return res.status(404).json({
          status: false,
          message: "Note not found",
        });
      }

      note.viewCount += 1;

      const updatedNote = await note.save();

      res.json({
        status: true,
        data: updatedNote,
        message: "View count increased successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };

  static increaseDownloadCount = async (req, res) => {
    try {
      const noteId = req.params.id;

      const note = await NoteModel.findById(noteId);

      if (!note) {
        return res.status(404).json({
          status: false,
          message: "Note not found",
        });
      }

      note.downloadsCount += 1;

      const updatedNote = await note.save();

      res.json({
        status: true,
        data: updatedNote,
        message: "Download count increased successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };
}



export default notesController;
