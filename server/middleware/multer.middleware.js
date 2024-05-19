import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname); // You can keep the original filename or customize it as needed
    }
});

const fileFilter = (req, file, cb) => {
    
    if (file.mimetype === 'application/pdf') { // Accept only PDF files
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'));
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
