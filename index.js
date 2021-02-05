const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const axios = require('axios');
const journal = [];

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    port: "3306",    
    password: "password",
    database: "gn",

});

app.get("/api/get",(req,res)=>{

    axios
    .get('https://sqs.sa-east-1.amazonaws.com/687255601585/AvancarEtapaProcesso?Action=ReceiveMessage', {
    })
    .then(res => {

        console.log(`statusCode: ${res.status}`)
        //console.log(res.data.ReceiveMessageResponse.ReceiveMessageResult.messages)
        //const json = messages;
        //const obj = JSON.parse(json);
        
        // console.log(obj.body);

        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>osvaldo")
        //console.log(res.data)

        //res.data.ReceiveMessageResponse.ReceiveMessageResult.messages[0].Body;
        const messages = res.data.ReceiveMessageResponse.ReceiveMessageResult.messages;
        //console.log(messages);
        //console.log(messages[0].Body);
        //console.log(res.data.ReceiveMessageResponse.ReceiveMessageResult.messages[0].Body);


        for (var i = 0; i < messages.length; i++) {
            console.log("for posicao "+i+": "+messages[i].Body);
            journal.push({nome: "osvaldo", descricao: "sanches2"});

        }
        //journal.push({nome: "osvaldo", descricao: "sanches2"});

        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
       // for (var i = 0; i < journal.length; i++) {
         //   console.log(journal[i]);
      //  }

        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>osvaldo2")
        //const obj = JSON.parse(res.data);
        //console.log(obj);

        //var obj = JSON.stringify(messages);
        //console.log(obj);

        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>osvaldo3")
        //console.log(res.toString());
        //res.send(journal);

     })
    .catch(error => {
      console.error(error)
    })


    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.send(res.toString()); //funciona
    //res.send(res.data); //funciona
    //res.send(res); //nao 
    //res.send(res.data.ReceiveMessageResponse.ReceiveMessageResult.messages[0].Body); nao


   //const retorno = [
   // {nome: "osvaldo", descricao: "sanches"},
   // {nome: "haydee", descricao: "hirai"},
  //];

       //const messages2 = res.data.ReceiveMessageResponse.ReceiveMessageResult.messages;
  //console.log(messages);
  //console.log(messages[0].Body);
       //console.log(res.data.ReceiveMessageResponse.ReceiveMessageResult.messages[0].Body);


        //for (var i = 0; i < messages2.length; i++) {
           // console.log("posicao nova "+i+": "+messages2[i].Body);
        // journal.push({nome: "osvaldo", descricao: "sanches2"});

       // }

    //journal.push({nome: "osvaldo", descricao: "sanches2"});
    //console.log("final tamanho: "+journal.length);
    //for (var i = 0; i < journal.length; i++) {
     //   console.log("final for valor "+journal[i]);
     //}

   res.send(journal);


});



app.use(cors());

app.use(express.json());

app.use(bodyParse.urlencoded({extended:true}));

app.post("/api/insert",(req,res)=>{
//app.post('/api/insert',(req,res)=>{   

    const nome = req.body.nome
    const descricao = req.body.descricao
    const sqs = 'https://sqs.sa-east-1.amazonaws.com/687255601585/AvancarEtapaProcesso?Action=SendMessage&MessageBody=';
    const url = sqs+'{"nomeRelatorio":"'+ nome+'","observacao":"'+descricao+'"}';

    console.log(url)

    axios
    .get(url, {
    })
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        //alert('Solicitação de relatório enviada.');
    })
    .catch(error => {
        console.error(error)
    })

});

app.listen(3001,()=>{
    console.log("running on port 3001");
});
