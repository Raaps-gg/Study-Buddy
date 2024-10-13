import mongoose from 'mongoose';

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
    groupMembers: { 
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact: { 
      type: String,
      required: true,
    },
    meetingTime: { 
      type: String,
      required: true,
    },
    location: { // Added location field
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model('Group', groupSchema);
