import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// This JavaScript code snippet is using the plugin method of the TracksSchema object from the Mongoose library. It is adding the Mongoose Delete plugin to the schema. The overrideMethods: "all" option is passed to the plugin, which means that all the default Mongoose methods (like save, remove, etc.) will be overridden by the plugin. This plugin allows you to perform soft deletes on documents in your MongoDB collection.
UsersSchema.plugin(MongooseDelete, { overrideMethods: "all" });

export const UsersModel = mongoose.model("users", UsersSchema);
