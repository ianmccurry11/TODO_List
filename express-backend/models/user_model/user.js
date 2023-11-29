import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 6)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
    user_metrics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_metrics", // Reference to the 'user_metrics' collection
    },
  },
  { collection: "users_list" },
);

export default mongoose.model("User", UserSchema);
