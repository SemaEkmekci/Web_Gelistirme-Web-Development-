const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name:String,
        surname:String,
        email:String,
        password:String
    },{
        collection:"User"
    }
);

mongoose.model("User",UserSchema);