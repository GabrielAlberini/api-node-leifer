import mongoose from "mongoose";

const StoragesSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const StoragesModel = mongoose.model("storages", StoragesSchema);
