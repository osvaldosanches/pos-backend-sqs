//Osvaldo Sanches
//Projeto - POC PUC Minas
//2020-2021

const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const axios = require('axios');

//chamada de busca na fila - pela documentação pode vir uma ou mais msgs
app.get("/api/get",(req,res)=>{

    const resposta = [];

    axios
    .get('https://sqs.sa-east-1.amazonaws.com/687255601585/AvancarEtapaProcesso?Action=ReceiveMessage', {
    })
    .then(result => {

        console.log(`statusCode: ${result.status}`)
        
        const messages = result.data.ReceiveMessageResponse.ReceiveMessageResult.messages;
        //console.log(messages[0].Body);
        //console.log(res.data.ReceiveMessageResponse.ReceiveMessageResult.messages[0].Body);

        for (var i = 0; i < messages.length; i++) {
            console.log("for posicao "+i+": "+messages[i].Body);
            resposta.push({nome:+""+messages[i].Body, descricao:+""+messages[i].MD5OfBody}); 

        }

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(resposta);

     })
    .catch(error => {
      console.error(error)
    })

});

app.use(cors());

app.use(express.json());

app.use(bodyParse.urlencoded({extended:true}));

//chamada de insert na fina
app.post("/api/insert",(req,res)=>{

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

app.listen(process.env.PORT || 3001);
//app.listen(3001,()=>{
//   console.log("running on port 3001");
//});
