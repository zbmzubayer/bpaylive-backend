import multer from 'multer';

const UPLOAD_FOLDER = './uploads';

const storage = multer.diskStorage({
  destination: UPLOAD_FOLDER,
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const fileName = `${Date.now()}_${Math.round(Math.random() * 1e6)}.${ext}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
