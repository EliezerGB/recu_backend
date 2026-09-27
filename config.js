import dotenv from "dotenv";

// Ejecutamos la libreria dotenv
dotenv.config();

export const config = {
  db: {
    URI: process.env.DB_URI,
  },
  server: {
    port: process.env.PORT || 4000,
  },
  cloudinary: {
    cloudinary_url: process.env.CLOUDINARY_URL,
    cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
