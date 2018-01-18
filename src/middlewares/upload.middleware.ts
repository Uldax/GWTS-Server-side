
//uploadService = require("./upload.service"),
import * as multer from 'multer'
import * as crypto from "crypto"
import { join, extname } from 'path'
import { Request, Response } from "express";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR as string)
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, raw.toString('hex') + Date.now() + extname(file.originalname));
    });
  }
});

function imageFilter(req: any, file: any, cb: Function) {
  // accept image only
  if (!file.originalname.toLowerCase.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('This type of file is not allowed!'));
  }
  cb(null, true);
}

export const UploadMiddleware = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});


