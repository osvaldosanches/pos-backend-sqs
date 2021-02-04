const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const axios = require('axios');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    port: "3306",    
    password: "password",
    database: "gn",

});

app.get("/api/get",(req,res)=>{

    //const sqlSelect = "SELECT * FROM `sql10390375`.`norma`;";
    const sqlSelect = "SELECT * FROM norma;";

    db.query(sqlSelect,(err,result)=>{

        console.log("teste >>>>>>>>>>>>>>> osvaldo");   
        console.log(result); 
        console.log(sqlSelect);
        console.log(err);
        //console.log(err.code);

        //linhas para resolver o erro do console - o cabeçalho CORS 'Access-Control-Allow-Origin' não está presente
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(result);
        //res.send('hello Osvaldo teste2 ');
    }); 

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
        console.log(`statusCode: ${res.statusCode}`)
        //alert('Solicitação de relatório enviada.');
    })
    .catch(error => {
        console.error(error)
    })

});

app.listen(3001,()=>{
    console.log("running on port 3001");
});
