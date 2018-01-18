import * as publicRoutes from "./routes/public";
import * as uploadsRoutes from "./routes/upload.routing";
const express = require("express");
const router = express.Router();

router.use("/", publicRoutes);
router.use("/upload", publicRoutes);

export = router;
