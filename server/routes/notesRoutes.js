import express from 'express';
import notesController from '../controllers/notesController.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.get("/hello", notesController.helloWorld);
router.post("/publishNotes", upload.single('file'), notesController.publishNotes);
router.post("/deleteNote/:id", notesController.deleteNote);

router.get("/getAllNotes", notesController.getAllNotes);
router.get("/getVerifiedNotes", notesController.getVerifiedNotes);

router.post("/verifyNote/:id", notesController.verifyNote);

// New routes for increasing counts
router.post("/increaseLikeCount/:id", notesController.increaseLikeCount);
router.post("/increaseViewCount/:id", notesController.increaseViewCount);
router.post("/increaseDownloadCount/:id", notesController.increaseDownloadCount);

export default router;
