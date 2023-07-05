import mongoose from "mongoose";

const collection = "messages";

const MessagesSchemas = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})

export const messageModel = mongoose.model(collection, MessagesSchemas);