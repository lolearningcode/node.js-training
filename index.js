const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////////////////
// FILES


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

//Created server that will hold the Hello from server
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '\overview') {
        res.end('This is the OVERVIEW!!!');
    } else if (pathName === '/product'){
        res.end('This is the product!!!');
    } else {
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