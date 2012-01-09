
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    formidable = require('./multiparser'),
    config = require('./config'),
    fs = require('fs');

var app = module.exports = express.createServer(
    // connect-form (http://github.com/visionmedia/connect-form)
    // middleware uses the formidable middleware to parse urlencoded
    // and multipart form data
    formidable({ keepExtensions: true, uploadDir: './data'})
);

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
  delete express.bodyParser.parse['multipart/form-data'];
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

// Routes

app.get('/', routes.index);
app.post('/upload', function(req, res, next){
    req.form.complete(function(err, fields, files){
        if (err) {
            next(err);
        } else {
            console.log('\nuploaded %s to %s'
                ,  files.upload.filename
                , files.upload.path);
            fs.renameSync(files.upload.path, './public/images/test.gif');
            res.render('show', {title: 'Show Image ', name: files.upload.filename, path: 'images/test.gif'});
        }
    });

    req.form.on('progress', function(bytesReceived, bytesExpected){
        var percent = (bytesReceived / bytesExpected * 100) | 0;
        process.stdout.write('Uploading: %' + percent + '\r');
    });
});

app.listen(config.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
