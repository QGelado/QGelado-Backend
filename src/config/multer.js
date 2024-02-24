import multer from "multer";
import { extname } from 'path';

const storage = (destination) => multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `src/uploads/${destination}`);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + extname(file.originalname));
    }
});

const upload = (folderPath) => multer({ storage: storage(folderPath) });

export default upload;