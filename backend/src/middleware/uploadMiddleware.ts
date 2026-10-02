import multer from "multer";

const storage = multer.memoryStorage();

export const uploadAvatar = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Formato de imagem não permitido.")
      );
    }

    cb(null, true);
  },
}).single("avatar");