
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    formidable = require('formidable'),
    url = require('url'),
    config = require('./config'),
    util = require('util'),
    test1 = require('./test1');

var app = module.exports = express.createServer();

//function(req, res){
//    var uri = req.url;//url.parse(req.url).pathname;
//
//    if (uri == '/upload' && request.method.toLowerCase() == 'post') {
//        //Parse Upload
//        var form = new formidable.IncomingForm();
//        form.uploadDir = config.files.upload_dir;
//        form.maxFieldsSize = config.files.max_fields_size;

    //Process listener
//        form.addListener('progress', function(bytesReceived, bytesExpected) {
//            //progress as percentage
//            var progress = (bytesReceived / bytesExpected * 100).toFixed(2);
//            mb = (bytesExpected / 1024 / 1024).toFixed(1);
//            util.debug('Uploading ' + mb + 'mb (' + progress + '%)\015');
//        });

//        form.parse(request);
//
//    } else {
//        if (uri == '/') {
//            res.render('index', {title: 'First TEST PAGE'});
//        }
//    }
//}

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var t = new test1('porry');
console.log(t.name);
t.see();
// Routes

app.get('/', routes.index);

app.listen(config.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
