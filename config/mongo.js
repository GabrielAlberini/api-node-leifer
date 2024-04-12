import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = async () => {
  const DB_URI = process.env.DB_URI;

  try {
    const connection = await mongoose.connect(DB_URI);

    if (connection) {
      console.log("**CONEXIÓN EXITOSA A LA BASE DE DATOS**");
    }
  } catch (error) {
    console.log("**FALLO EN LA CONEXIÓN A LA BASE DE DATOS**", error);
  }
};
