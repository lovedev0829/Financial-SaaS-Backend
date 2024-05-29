const multer = require('multer');
const path = require('path');

// Set storage engine using multer.diskStorage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Set the destination where files should be stored; this is usually a folder within your server
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase()
        // Set the file name; here we use the original filename, but you might want to include a unique identifier (e.g., a timestamp)
        cb(null, `${Date.now()}${extension}`);
    }
});

// Initialize upload variable
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Optional: File size limit (5MB example)
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image'); // Here 'image' is the field name that the form should use for uploading the file.

// Check File Type
function checkFileType(file, cb) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Test extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Test mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Please upload only image!');
    }
}

module.exports = upload;
