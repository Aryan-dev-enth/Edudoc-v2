import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    gapis_file_id: {
        type: String,
        required: [true, 'Google API file ID is required'],
        index: true 
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        index: true 
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    file_url: {
        type:Object,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    document_type: {
        type: String,
        default: "unknown" 
    },
    subject: {
        type: String,
        default: "NA"
    },
    subject_code: {
        type: String
    },
    branch: {
        type: String
    },
    college: {
        type: String
    },
    author: {
        type: String,
        index: true 
    },
    published: {
        type: Date,
        default: Date.now 
    },
    likeCount: {
        type: Number,
        default: 0
    },
    downloadsCount: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true 
});
noteSchema.index({ title: 'text', content: 'text', author: 'text' });

const NoteModel = mongoose.model("Note", noteSchema);

export default NoteModel;
