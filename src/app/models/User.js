import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type:String,
            required: true,
        },
        email: {
            type:String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        groupsYoureIn: [{ // This stores an array of ObjectIds referencing Group documents
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group', // Reference the Group model
            required: false,
        }],
    },
    {timestamps: true}
);

export default mongoose.models.User || mongoose.model("User", userSchema);