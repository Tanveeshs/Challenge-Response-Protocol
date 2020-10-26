const express = require('express')
const app = express()
const jsonwebtoken = require('jsonwebtoken')
const bodyParser = require('body-parser')
const crypto = require('crypto')

app.use(bodyParser.json())
app.get('/genToken',(req,res)=>{
    const token = jsonwebtoken.sign({
        data: 123,
    }, 'secret', { expiresIn: '1h' });
    res.json({token:token})
})

app.post('/verifyToken',(req,res)=>{
    const token = req.body.token;
    const cipherText = req.body.cipher;
    var mykey = crypto.createDecipher('aes-128-cbc', 'pass');
    var mystr = mykey.update(cipherText, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    let decoded = jsonwebtoken.verify(token, 'secret');
    console.log(decoded)
    if(decoded.data!=123){
        res.send("NOT VERIFIED")
    }else {
        res.send({status:"VERIFIED",plainText:mystr})
    }

})

app.listen(3000,function (err){
    if(err){
        console.log(err)
    }else {
        console.log("PORT 3000")
    }
})