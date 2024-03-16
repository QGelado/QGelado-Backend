import multer from "multer";
import { extname } from 'path';
import { GridFsStorage } from "multer-gridfs-storage";

const storage = (folderPath) => new GridFsStorage({
    url: process.env.DB_CONNECTION,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = Date.now() + extname(file.originalname);
            return filename;
        }

        return {
            bucketName: folderPath,
            filename: Date.now() + extname(file.originalname),
        };
    },
});

const upload = (folderPath) => multer({ storage: storage(folderPath) });

export default upload;
