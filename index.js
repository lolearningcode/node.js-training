const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////////////////////////
// FILES
//npm run start or npm start to run devdependencies
//npm outdated checks for the outdated dependencies
//npm update "package name" updates that dependency
//npm uninstall "package name" uninstalls dependency

//Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

// const textOut = `This is what we know about avocados : ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('File system has new updates');

//Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('Error...💥!')
//     //Takes the data1 that equals read this and puts it into the
//     //next callback function and then returns avocado info
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, err => {
//                 console.log('Your file has been written😃😎')
//             });
//         });
//     });
// });
//Logs this one first and put the other function in the background until it's
// ready to be presented in the main thread
// console.log('Will read file!')

////////////////////////////////////////////////
// SERVER

//Reading the JSON from the API in the dev data folder-----BLOCKING Sync
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);
//.map returns an array of elements
const slugs = dataObject.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

//Created server that will hold the Hello from server
const server = http.createServer((req, res) => {
  //creates two variables with separate sets to two different things
  //query sets the id and pathname sets the /product
  const { query, pathname } = url.parse(req.url, true);

  // const pathName = req.url;
  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    //returns an array and replaces each placeholder(el) with a new object(tempcard)
    const cardsHtml = dataObject
      .map(el => replaceTemplate(tempCard, el))
      .join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    // console.log(product.organic);
    res.end(output);
    //Product Page
  } else if (pathname === '/product') {
    //formats the content to be displayed on the page
    res.writeHead(200, { 'Content-type': 'text/html' });
    //gets the product at the dataObjects arrays at the position of the query id so if the query id is 2 then it will return the product at the second position
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
    //API
  } else if (pathname === '/api') {
    // console.log(productData);
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    //NOT FOUND
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }
});
//Actually creates the servers address and stores it on the IP address
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000!!!');
});
