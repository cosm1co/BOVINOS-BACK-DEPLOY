import mongoose from "mongoose";
const { Schema } = mongoose;

const BovineSchema = new mongoose.Schema(
    {
        SENASA_ID: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["NOVILLO", "TORO", "VAQUILLONA"],
            default: "NOVILLO",
            required: true,
        },
        weight: {
            type: String,
            default: "-",
            required: false,
        },
        potrero: {
            type: String,
            required: true,
        },
        device: {
            type: String,
            enum: ["COLLAR", "CARAVANA"],
            default: "COLLAR",
            required: true,
        },
        n_device: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Bovine", BovineSchema);