import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

// Array de funciones
const userController = {};

// SELECT - Obtener todos los usuarios
userController.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// SELECT - Obtener un solo usuario por ID
userController.getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// INSERT - Registro de usuario
userController.registerUser = async (req, res) => {
  try {
    // Solicitar datos
    const { name, email, password, phone } = req.body;

    const newUser = new userModel({
      name,
      email,
      password,
      phone,
      image: req.file ? req.file.path : "",
      public_id: req.file ? req.file.filename : "",
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE - Modificar usuario
userController.updateUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const userFound = await userModel.findById(req.params.id);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = {
      name,
      email,
      password,
      phone,
    };

    // Si viene alguna imagen nueva
    if (req.file) {
      // Eliminar la imagen anterior de Cloudinary si existe
      if (userFound.public_id) {
        await cloudinary.uploader.destroy(userFound.public_id);
      }

      // Guardar la nueva imagen
      updatedData.image = req.file.path;
      updatedData.public_id = req.file.filename;
    }

    const userUpdated = await userModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    return res.status(200).json({ message: "User updated successfully", user: userUpdated });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE - Eliminar usuario
userController.deleteUser = async (req, res) => {
  try {
    const userFound = await userModel.findById(req.params.id);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    // Elimino la imagen de Cloudinary si existe
    if (userFound.public_id) {
      await cloudinary.uploader.destroy(userFound.public_id);
    }

    // Elimino al usuario de la base de datos
    await userModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default userController;
