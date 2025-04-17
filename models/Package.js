import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    inclusions: {
      type: [String],
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: [
        'Wedding',
        'Birthday',
        'Conference',
        'Concert',
        'Party',
        'Corporate',
        'Exhibition',
        'Workshop',
        'Seminar',
        'Festival'
      ],
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
