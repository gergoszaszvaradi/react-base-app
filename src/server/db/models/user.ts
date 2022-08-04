import mongoose from "mongoose";

const UserModel = mongoose.model("user", new mongoose.Schema({
    email: {
        type: String,
        requred: true,
    },
    firstName: {
        type: String,
        requred: true,
    },
    lastName: {
        type: String,
        requred: true,
    },
}));

export default UserModel;
