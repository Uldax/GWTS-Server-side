const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import { UploadMiddleware as upload } from '../middlewares/upload.middleware'

router.post('/event', (req: Request, res: Response) => {

  upload.single('thumb')(req, res, (err) => {
    if (err) {
      return res.json({ error: 'invalid_file_extension' })
    } else {
      return res.json({ ok: 'ok' })
    }
  })

});


