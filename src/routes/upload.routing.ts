const express = require('express'),
  uploadService = require("./upload.service"),
  upload = require('../../middlewares/upload.middleware'),
  router = express.Router();



router.post('/company/avatar', (req, res) => {

  try {
    upload.single('avatar')(req, res, (err) => {
      if (err) {
        return res.json({ error: 'invalid_file_extension' })
      } else {
        const companyId = req.body.companyId;
        if (!companyId) {
          throw "No company provided"
        }

        uploadService.setCompanyAvatar(companyId, req.file).then(company => {
          res.json({
            message: company,
          });
        }).catch((e) => {
          if (e.code) {
            res.status(e.code);
          } else {
            res.status(500);
          }
          res.json({
            message: e.message,
            error: e
          });

        })
      }
    })

  } catch (e) {
    res.status(500);
    res.json({
      message: e.message,
      error: e
    });
  }

});

router.post('/document', (req, res) => {
  try {
    upload.single('document')(req, res, (err) => {
      if (err) {
        return res.json({ error: 'invalid_file_extension' })
      } else {
        const adhId = req.body.adhId;
        if (!adhId) {
          throw "No user provided"
        }

        uploadService.setUserDocument(adhId, req.file).then((userObject) => {
          res.json({
            message: userObject,
          });
        }).catch((e) => {
          if (e.code) {
            res.status(e.code);
          } else {
            res.status(500);
          }
          res.json({
            message: e.message,
            error: e
          });

        })
      }
    })

  } catch (e) {
    res.status(500);
    res.json({
      message: e.message,
      error: e
    });
  }

});

router.post('/company/service/customFile', (req, res) => {
  try {
    upload.single('document')(req, res, (err) => {
      if (err) {
        return res.json({ error: 'invalid_file_extension' })
      } else {
        const serviceId = req.body.serviceId;
        if (!serviceId) {
          throw "No service provided"
        }

        uploadService.addServiceCustomFile(serviceId, req.file).then(company => {
          res.json({
            message: company,
          });
        }).catch((e) => {
          if (e.code) {
            res.status(e.code);
          } else {
            res.status(500);
          }
          res.json({
            message: e.message,
            error: e
          });

        })
      }
    })

  } catch (e) {
    res.status(500);
    res.json({
      message: e.message,
      error: e
    });
  }

});

router.delete('/company/service/:serviceId/customFiles/:customFileId', (req, res) => {
  const serviceId = req.params.serviceId,
    customFileId = req.params.customFileId;

  uploadService.removeCustomFile(serviceId, customFileId).then(company => {
    res.json({
      message: company,
    });
  }).catch((e) => {
    if (e.code) {
      res.status(e.code);
    } else {
      res.status(500);
    }
    res.json({
      message: e.message,
      error: e
    });

  })

});
