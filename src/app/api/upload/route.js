import uniqid from "uniqid";
import multer from "multer";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const id = uniqid();
    const filePath = `${id}${ext}`;
    cb(null, filePath);
  },
});

const upload = multer({ storage });

export async function handler(req, res) {
  if (req.method === "POST") {
    upload.single("file")(req, res, function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        const link = `http://localhost:3000/${req.file.filename}`;
        res.status(200).json({ link });
      }
    });
  } else {
    // Handle any other HTTP method
  }
}
