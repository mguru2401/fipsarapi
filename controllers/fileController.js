const multer = require('multer');
const path = require('path');
const fileModel = require('../models/fileModel');

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// File upload handler
const uploadFile = (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err });
        }

        // Save the file info to the database
        try {
            const filePath = req.file.path;
            const fileUrl = `http://localhost:5001/${filePath}`;
            await fileModel.saveFile(filePath, fileUrl);
            res.status(200).json({ message: 'File uploaded successfully', fileUrl });
        } catch (err) {
            res.status(500).json({ message: 'Error saving file to database', error: err });
        }
    });
};

module.exports = { uploadFile };
