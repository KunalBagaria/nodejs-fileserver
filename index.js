let http = require('http');
let formidable = require('formidable');
let fs = require('fs');
let path = require('path');
let finalhandler = require('finalhandler');
let serveStatic = require('serve-static');

let server = http.createServer(function (req, res) {

let serve = serveStatic("./");

  if (req.url == '/fileupload') {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      let oldpath = files.filetoupload.path;
      let newpath = path.join(__dirname, files.filetoupload.name)
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else if (req.url == '/upload') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  } else {
    let done = finalhandler(req, res);
    serve(req, res, done);
  }
})

server.listen(process.env.PORT || 8000)