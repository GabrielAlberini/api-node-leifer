import mongoose from "mongoose";

const StorageSchema = new mongoose.Schema(
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

export const StorageModel = mongoose.model("storages", StorageSchema);
