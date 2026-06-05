const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: {
      folder: "ems_profiles",
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
      ],
    },

  });

const upload = multer({
  storage,
});

router.post(
  "/profile",
  upload.single("photo"),
  async (req, res) => {

    try {

      res.json({
        photoUrl: req.file.path,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json(err);

    }

  }
);

module.exports = router;