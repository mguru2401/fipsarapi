const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'guruprasad', 
  database: 'fipsar',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected');
  }
});

const saveFile = (filePath, fileUrl) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO files (file_path, file_url) VALUES (?, ?)';
    db.query(query, [filePath, fileUrl], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { saveFile };
