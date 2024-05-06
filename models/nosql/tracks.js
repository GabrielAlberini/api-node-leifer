import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const TracksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// This JavaScript code snippet is using the plugin method of the TracksSchema object from the Mongoose library. It is adding the Mongoose Delete plugin to the schema. The overrideMethods: "all" option is passed to the plugin, which means that all the default Mongoose methods (like save, remove, etc.) will be overridden by the plugin. This plugin allows you to perform soft deletes on documents in your MongoDB collection.
TracksSchema.plugin(MongooseDelete, { overrideMethods: "all" });

export const TracksModel = mongoose.model("tracks", TracksSchema);
