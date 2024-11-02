
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
ensureDirectoryExists('./uploads');
ensureDirectoryExists('./downloads');
ensureDirectoryExists('./downloaded_files');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    const rollNo = req.body.rollNo;
    const ext = path.extname(file.originalname);
    cb(null, `${rollNo}${ext}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed.'));
    }
  }
});

app.post('/upload', upload.single('transactionFile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File upload failed. Please upload a valid PDF file.' });
    }

    
    const sourcePath = path.join(__dirname, 'uploads', req.file.filename);
    const destinationPath = path.join(__dirname, 'downloads', req.file.filename);

    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error('Error moving file to downloads folder:', err.message);
        return res.status(500).json({ message: 'Error saving file to downloads folder.' });
      }
      res.json({ message: 'File uploaded and saved successfully in downloads folder.' });
    });
  } catch (error) {
    console.error('Upload Error:', error.message);
    res.status(500).json({ message: 'Server error during file upload. Please try again later.' });
  }
});


app.get('/download', (req, res) => {
  try {
    const rollNo = req.query.rollNo;
    if (!/^[a-zA-Z0-9]{6,10}$/.test(rollNo)) {
      return res.status(400).json({ message: 'Invalid Roll No. format. Please enter a 6-10 character alphanumeric Roll No.' });
    }

    const filePath = path.join(__dirname, 'downloads', `${rollNo}.pdf`);
    const destinationPath = path.join(__dirname, 'downloaded_files', `${rollNo}.pdf`);

    if (fs.existsSync(filePath)) {
      
      res.setHeader('Content-Disposition', `attachment; filename="${rollNo}.pdf"`);
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err.message);
          res.status(500).json({ message: 'Error sending file.' });
        } else {
          fs.rename(filePath, destinationPath, (moveErr) => {
            if (moveErr) {
              console.error('Error moving file to downloaded_files folder:', moveErr.message);
            } else {
              console.log(`File for Roll No. ${rollNo} moved to downloaded_files folder.`);
            }
          });
        }
      });
    } else {
      res.status(404).json({ message: 'File not found for this Roll No.' });
    }
  } catch (error) {
    console.error('Download Error:', error.message);
    res.status(500).json({ message: 'Server error during file download. Please try again later.' });
  }
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
