import multer from "multer";
import path from "path";

function cleanFileName(filename) {
  return filename.replace(/[&\s]/g, "_");
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req, res) {
  if (req.method === "POST") {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public/images");
      },
      filename: (req, file, cb) => {
        if (file) {
          const cleanName = cleanFileName(file.originalname);
          cb(
            null,
            cleanName + "_" + Date.now() + path.extname(file.originalname)
          );
        } else {
          console.log("Error: req.file is undefined");
          cb(new Error("req.file is undefined"));
        }
      },
    });
    console.log(storage);
    const upload = multer({ storage }).single("image");
    upload(req, res, (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error });
      } else {
        console.log(`file name : ${req.file.filename}`);
        res.status(200).json({ filename: req.file.filename });
      }
    });
  } else {
    return res.json("not ok");
  }
}
