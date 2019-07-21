const http = require('http');
var fs = require('fs');
var replac = require('./replace')
var url = require('url');
var json = fs.readFileSync('data.json');
var obj = JSON.parse(json);
var templateCards = fs.readFileSync('templates/template-card.html',"utf8");
var templateOverview = fs.readFileSync('templates/template-overview.html',"utf8");
var templateProduct = fs.readFileSync('templates/template-product.html',"utf8");

function MakeCard(template,obj){
    return replac(template,obj)
}
const server = http.createServer(function(req,res){
    var pid = req.url.split('=').pop();
    // console.log("url requested"+req.url);

    // res.writeHead(200,{"content-type":"text/plain"});  //text/css,text/html,application/JSON,application/JavaScript

    var path = req.url;
    // var id = url.parse(path,true).query.id;
    var path = url.parse(path,true).pathname;

     
        if(path =="/"||"/overview"){

            var cards = "";
            for(var i=0;i<obj.length;i++){
                cards+=MakeCard(templateCards,obj[i]);
            }
            var ov = fs.readFileSync('templates/template-overview.html',"utf8");
            ov = String(ov).replace(/{%PRODUCT_CARDS%}/,cards);
            res.writeHead(200,{"content-type":"text/html"});
            

            res.write(ov);
            res.end();
        
    
    }
    
    else if(path=="/products"){
        var card = replac(templateProduct,obj[pid]);
            res.writeHead(200,{"content-type":"text/html"});
            

            res.write(card);
            res.end();
    }
  
    
    else if(path == "/api"){
        res.writeHead(200,{"content-type":"application/JSON"});
        var file = fs.readFileSync("./data.json")
        res.write(file);
        res.end();
    }
    else{
        res.end("Page Not Found");
    }

})
var port = process.env.PORT||80
server.listen(port);
console.log("port 3000 created");

