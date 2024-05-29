const multer = require('multer');
const upload = require('../middlewares/upload'); // Import the multer upload middleware
const fs = require("fs");
const path = require("path");

exports.upload = (req, res) => {
    upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).json({ message: "Multer error occurred.", error: error.message });
        } else if (error) {
            console.log(error)
            // An unknown error occurred when uploading.
            return res.status(500).json({ message: error});
        }

        // Everything went fine, file has been uploaded.
        const fileInfo = req.file;
        if (!fileInfo) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        res.status(200).json({
            message: "File uploaded successfully.",
            filename: fileInfo.filename
        });
    });
}

exports.getUploadedImage = (req, res) => {
    const { image } = req.params;
     // Path Refinements
     const filePath = path.join('uploads/',
        image);
     // Checking if the path exists
     fs.exists(filePath, function (exists) {
 
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Not Found");
            return;
        }
 
        // Extracting file extension
        const ext = path.extname(image).toLowerCase();
 
        // Setting default Content-Type
        let contentType = "text/plain";
 
        // Checking if the extension of
        if (ext === ".png") {
            contentType = "image/png";
        } else if(ext === ".jpeg") {
            contentType = "image/jpeg";
        } else if(ext === ".jpg") {
            contentType = "image/jpg";
        } else if(ext === ".gif") {
            contentType = "image/gif";
        }
 
        // Setting the headers
        res.writeHead(200, {
            "Content-Type": contentType
        });
 
        // Reading the file
        fs.readFile(filePath,
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });
}