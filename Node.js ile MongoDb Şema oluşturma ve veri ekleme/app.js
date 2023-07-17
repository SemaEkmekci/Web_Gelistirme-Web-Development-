const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const mongoUrl = "mongodb://localhost:27017/fikrimvar"

mongoose
    .connect(mongoUrl,{
        useNewUrlParser:true
    })
    .then(()=>{console.log("Veritabanına Bağlanıldı")})
    .catch((e) => console.log(e));

app.listen(5000,()=>{
    console.log("Server Çalışıyor");
});

app.post("/post",async(req,res)=>{
    console.log(req.body);
    const {data} = req.body; //istekten data'yı al
    try {
        if(data == "sema") // data 'sema' ise 'ok' gönder
        {
            res.send({status:"Tamam"});
        }
        else{
            res.send({status: "Kullanıcı Bulunamadı"});  
        }
    }
    catch (err) {
        res.send({status:"Bir şeyler yanlış"});  //Hata olması durumunda bunu gönder
    }
});


require("./user");

const User = mongoose.model("User");
app.post("/signup",async(req,res)=>{
    const {uname,usurname,uemail,upassword} = req.body;
    try{
        await User.create({
            name:uname,
            surname:usurname,
            password:upassword,
            email:uemail
        });
        res.send({status:"Tamam"})
    }catch(err){
        res.send({status :"Hata"})
    }
})

