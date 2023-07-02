import mongoose from "mongoose";

import { messageModel } from "./models/messages.model";

export default class ManagerMessage {
    connection = mongoose.connect("mongodb+srv://marianowagnerrigo18:Marawarigo3360@cluster0.xjgkqac.mongodb.net/")

    async newMessage(sms){
        let result = await messageModel.create(sms);
        return result;
    }

    async seeMessage(){
        let result = await messageModel.find().lean();
        return result;
    }

    async deleteMessage(mid){
        let result = await messageModel.deleteOne({_id: mid})
        return result;
    }
}