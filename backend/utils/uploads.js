import multer from "multer";
import path from "path";
// ✅ Create uploads folder if not exists
// const uploadPath = path.join(process.cwd(), "./uploads");
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath);
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

export const upload = multer({
  storage
});
