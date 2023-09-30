const express=require('express');
const port =8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact')

const app=express();
const path=require('path');

app.set('view engine','ejs');
app.set('Views',path.join(__dirname,'Views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.use(function(req,res,next){
    console.log("middleware 1 called");
    next();
})


var contact=[
    {
        name:"akshay",
        Phone:"1234567890"
    },
    {
        name:"patil",
        Phone:"9876543210"
    },
    {
        name:"Yash",
        Phone:"6543217890"
    }
]

app.get('/',async function(req,res){

   
    const contacts = await Contact.find({});
    
        // Handle the retrieved contacts, e.g., render a page or return a response.
        try { res.render('home', {
            title: "Contact_List",
            contact_list: contacts
        });
    } catch (err) {
        console.error("Error while finding contacts from the database:", err);
        // Handle the error, e.g., return an error response.
    }

    /*Contact.find({},function(err,contacts){
        if (err){
            console.log("error while finding contact from db");
            return;
        }
        return res.render('home',{
            title: "Contact_List",
            contact_list: contacts
    
        });

    })*/
   /* return res.render('home',{
        title: "Contact_List",
        contact_list: contact

    });*/

});

app.post('/create-contact',async function(req,res){
    let newContact = await Contact.create({
        name: req.body.name,
        phone: req.body.phone
   });
        console.log("********",newContact);
        return res.redirect('back');
});
   /*
    console.log(req.body);

    Contact.create({  
         name: req.body.name,  
         phone: req.body.Phone 
        }) 
    .then(newContact => {   
        console.log('******', newContact);   
        return res.redirect('back');  
     }) 
    .catch(err => {   
        console.log('Error in creating a contact!', err);  
        // Handle the error appropriately  
    });*/

    //contact.push(req.body)
  /*Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error creating contact');
            return;
        }
        console.log("********",newContact);
        return res.redirect('back');
    });*/
  // res.redirect('/');
//});

app.get('/practice',function(req,res){
    res.render('practice');
    });
/*
app.post('/create-contact', function(req, res){
    
    // contactList.push({
        
    //     name: req.body.name,
    //     phone: req.body.phone,
    // })
    contact.push(req.body);
    return res.redirect('/');

});
*/

app.get('/profile',function(req,res){
    res.send("Hi it is cool");
});


app.listen(port,function(err){
    if(err){
        console.log('error while running server');
    }
    console.log("Yup!! server is running");
});


app.get('/delete-contact/:id', async function(req, res){
    /*console.log(req.query);
    let phone = req.query.phone

    let contactindex = contact.findIndex(contact => contact.phone == phone);

    if(contactindex != -1){
        contact.splice(contactindex, 1);
    }*/
    try {
        const id = req.params.id; // Declare and initialize id within the try block.
        await Contact.findByIdAndDelete(id);
        return res.redirect('back');
    } catch (error) {
        console.error("Error in deleting obj from db:", error);
        // Handle the error and send an appropriate response to the client.
        return res.status(500).send("Error deleting the contact.");
    }

    
});
