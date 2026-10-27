import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
    {
        place: {
            type: String,
            required: true,
            unique: true,
        },
        districtId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "District",
            required: true,
        },
    }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;