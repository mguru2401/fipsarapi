const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'guruprasad', 
  database: 'fipsar',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/files', fileRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
