import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";

// Creo una constante que guarde Express
const app = express();

app.use(cors());

// Que acepte los json desde postman
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);

export default app;
