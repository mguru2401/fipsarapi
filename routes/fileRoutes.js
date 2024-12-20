const express = require('express');
const multer = require('multer');
const path = require('path');
const fileModel = require('../models/fileModel');

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp to avoid name conflicts
  },
});

const upload = multer({ storage: storage });

// Handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  try {
    // Save file details to the database
    await fileModel.saveFile(filePath, fileUrl);

    // Send a response with a success status
    res.status(200).send({
      status: 'success',  // Add success status
      message: 'File uploaded successfully',
      fileUrl: fileUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error saving file to database' });
  }
});

module.exports = router;
