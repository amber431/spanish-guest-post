const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// image extension change into webp
// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  }
});

const inputDir = ''; // Base directory to watch and process

/**
* Convert an image file to WebP format.
* @param {string} filePath - The full path to the image file.
*/
function convertToWebP(filePath) {
const ext = path.extname(filePath).toLowerCase();
const validExtensions = ['.jpg', '.jpeg', '.png'];

if (validExtensions.includes(ext)) {
  const outputFilePath = path.join(
    path.dirname(filePath),
    `${path.parse(filePath).name}.webp`
  );

  // Convert the image to WebP
  sharp(filePath)
    .webp({ quality: 80 }) // Set WebP quality
    .toFile(outputFilePath, (err) => {
      if (err) {
        console.error('Error converting image:', filePath, err);
      } else {
        console.log(`Converted ${filePath} to WebP`);
        // Optionally, delete the original file after conversion
        // fs.unlinkSync(filePath);
      }
    });
}
}

// Initialize a watcher for the directory
const watcher = chokidar.watch(inputDir, {
persistent: true,
ignoreInitial: false, // Process files that already exist
ignored: '*.webp', // Ignore already converted files
});

// Handle events for new and modified files
watcher
.on('add', (filePath) => {
  console.log(`File added: ${filePath}`);
  convertToWebP(filePath);
})
.on('change', (filePath) => {
  console.log(`File changed: ${filePath}`);
  convertToWebP(filePath);
})
.on('error', (error) => {
  console.error('Watcher error:', error);
});

console.log(`Watching directory: ${inputDir}`);




// Create the multer instance
const upload = multer({ storage });

// Middleware to serve static files
app.use('/admin/uploads', express.static('uploads')); // Serve files from the uploads directory

// Route to handle file uploads
app.post('/admin/upload', upload.single('image'), async (req, res) => {
  if (req.file) {
      try {
          // Define paths for saving the converted WebP file
          const webpFilename = `${path.parse(req.file.filename).name}.webp`;
          const webpFilePath = path.join('uploads', webpFilename);

          // Convert the uploaded image to WebP and save it
          await sharp(req.file.path)
              .webp({ quality: 80 }) // Adjust quality as needed
              .toFile(webpFilePath);

          // Delete the original uploaded file if no longer needed
          // (Optional) Uncomment this if you want to clean up
          // fs.unlinkSync(req.file.path);

          // Construct the full URL for the WebP image
          const imageUrl = `https://maristochats.fr/admin/uploads/${webpFilename}`;
          res.json({ message: 'Image uploaded and converted to WebP successfully', imageUrl });
      } catch (error) {
          console.error('Error processing the image:', error);
          res.status(500).send('Image conversion failed.');
      }
  } else {
      res.status(400).send('Image upload failed.');
  }
});



// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// POST route to send email
app.post('/send', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate the email format
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).send({ message: 'Invalid email format' });
  }

  // Email to the admin
  const adminMailOptions = {
    from: email,
    to: 'lukeexryan123456@gmail.com', // Admin email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email to admin:', error);
      return res.status(500).send({ message: 'Error sending email to admin', error: error.message });
    }

    // Confirmation email to the user
    const userMailOptions = {
      from: 'lukeexryan123456@gmail.com', // Admin's email as the sender
      to: email, // User's email
      subject: 'Confirmation: We have received your message',
      text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Support Team`,
    };

    transporter.sendMail(userMailOptions, (userError, userInfo) => {
      if (userError) {
        console.error('Error sending confirmation email to user:', userError);
        return res.status(500).send({ message: 'Error sending confirmation email to user', error: userError.message });
      }

      res.status(200).send({ 
        message: 'Sent Email successfully',
        info: { adminInfo: info, userInfo: userInfo }
      });
    });
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});