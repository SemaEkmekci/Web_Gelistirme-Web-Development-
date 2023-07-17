const express = require("express");
const app = express();
app.use(express.json());

app.listen(5000,()=>{
    console.log("Server Started");
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





