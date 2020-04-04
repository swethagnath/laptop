const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const jsonData = JSON.parse(json);

// server runs or hits here
const server = http.createServer((req, res) => {

  const pathName = url.parse(req.url, true).pathname;
  const id       = url.parse(req.url, true).query.id;

  if(pathName === '/products' || pathName === '/') {
    res.writeHead('200', { 'content-type' : 'text/html' })
    fs.readFile(`${__dirname}/template/card-laptop.html`, 'utf-8', (err, data) => {
      const overView = data
      fs.readFile(`${__dirname}/template/card.html`, 'utf-8', (err, data) => {
        const cardoutput = jsonData.map((ele) => templateReplace(data, ele)).join("")
        res.end(cardoutput)
      })
    }) 
  }
  
  else if(pathName === '/laptop'  && id < jsonData.length) {
    res.writeHead('200', { 'content-type' : 'text/html' })
    fs.readFile(`${__dirname}/template/laptop.html`, 'utf-8', (err, data) => {
      const laptop = jsonData[id]
      templateReplace(data, laptop)
      res.end(ouput)
    })
  }
  
  else if((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
    console.log("hello")
    fs.readFile(`${__dirname}/image/${pathName}`, (err, data) => {
      res.writeHead('200', { 'content-type': 'image/jpg' })
      console.log(data)
      res.end(data)
    })
  }

  else{
    res.writeHead('200', { 'content-type' : 'text/html' }) //setting header, each time req comen this call back gets called
    res.end('this is the response')
  }

})
server.listen(3000, '127.0.0.1', () => {
  console.log('server starts');
})

const  templateReplace = (data, laptop) => {

  let ouput = data.replace(/{%productName%}/g, laptop.productName)
  ouput     = ouput.replace(/{%storage%}/g, laptop.storage)
  output    = ouput.replace(/{%Ram%}/g, laptop.ram)
  output    = ouput.replace(/{%Price%}/g, laptop.price)
  let des    = ouput.replace(/{%description%}/g, laptop.description)
  des    = des.replace(/{%id%}/g, laptop.id)
  return des

}


