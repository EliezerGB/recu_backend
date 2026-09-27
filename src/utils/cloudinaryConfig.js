import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

// #1- Configuramos cloudinary con nuestras credenciales
if (config.cloudinary.cloudinary_url) {
  cloudinary.config({
    cloudinary_url: config.cloudinary.cloudinary_url,
  });
} else {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
  });
}

// #2- Configurar cómo guardar las imágenes
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "usuarios",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

// #3- Configurar multer
const upload = multer({ storage });

export default upload;
