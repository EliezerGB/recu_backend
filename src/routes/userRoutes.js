import express from "express";
import userController from "../controllers/userController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(upload.single("image"), userController.registerUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .put(upload.single("image"), userController.updateUser)
  .delete(userController.deleteUser);

export default router;
