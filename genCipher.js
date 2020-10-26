const crypto = require('crypto')
var mykey = crypto.createCipher('aes-128-cbc', 'pass');
var mystr = mykey.update('clientKey', 'utf8', 'hex')
mystr += mykey.final('hex');
console.log(mystr);
