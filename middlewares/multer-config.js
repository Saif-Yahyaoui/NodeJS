/*import multer, { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

export default function (image, size) {
  return multer({
    storage: diskStorage({
      destination: (req, file, callback) => {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        callback(null, join(__dirname, "../public/images"));
      },
      filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
      },
    }),
    limits: size,
  }).single(image);
}*/

import multer, { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";


export const singleImage = multer({
    storage: diskStorage({
      destination: (req, file, callback) => {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        callback(null, join(__dirname, ".." + process.env.IMGURL));
        //for docker
        // callback(null, "/public/images");
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    }),
  
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg|JPG|PNG|JPEG)$/)) {
        return cb(new Error("Please upload a Image"));
      }
      cb(undefined, true);
    },
  }).single("imageName");