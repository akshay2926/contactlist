const mongoose=require('mongoose');


const contactSchama=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

const Contact=mongoose.model('Contact',contactSchama);

module.exports=Contact;