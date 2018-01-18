
//uploadService = require("./upload.service"),
import multer from "multer"
import crypto from "crypto"
import { join, extname } from 'path'


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(config.PROJECT_DIR, config.uploadFolderPath))
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, raw.toString('hex') + Date.now() + extname(file.originalname));
    });
  }
});

function imageFilter(req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|docx|pdf)$/)) {
    return cb(new Error('This type of file is not allowed!'));
  }
  cb(null, true);
}

const UploadMiddleware = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});


module.exports = UploadMiddleware;
