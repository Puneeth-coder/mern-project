// Connecting to mongoDB to nodeJS using Mongoose and defining schema & modals
const mongoose = require("mongoose");

async function main(){
    try{
       await mongoose.connect("mongodb://localhost:27017/project");
       console.log("MongoDB Connected Successfully");

       const userSchema = new mongoose.Schema({
        name: String,
        age: Number,
        role: String
       });

       const User = mongoose.model("User",userSchema);

       console.log("mongoose schema & model created successfully");
    }
    catch(error){
        console.log("Failed to connect to DB",error.message);
    }
};
main();