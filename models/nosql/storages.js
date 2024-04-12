import mongoose from "mongoose";

const StoragesSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const StoragesModel = mongoose.model("storages", StoragesSchema);
