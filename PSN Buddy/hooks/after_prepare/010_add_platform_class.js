#!/usr/bin/env node

// Add Platform Class
// v1.0
// Automatically adds the platform class to the body tag
// after the `prepare` command. By placing the platform CSS classes
// directly in the HTML built for the platform, it speeds up
// rendering the correct layout/style for the specific platform
// instead of waiting for the JS to figure out the correct classes.

var fs = require('fs');
var path = require('path');
var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
var ImageMin = require('imagemin');
var imagemin = new ImageMin();
var cssMinifier = new CleanCSS({
    keepSpecialComments: 0
});

var rootDir = process.argv[2];
var platformPath = path.join(rootDir, 'platforms');
var platform = process.env.CORDOVA_PLATFORMS;
var cliCommand = process.env.CORDOVA_CMDLINE;
var isRelease = true;

var rootdir = process.argv[2];

console.log('cordova-minify STARTING - minifying your js, css, and images. Sit back and relax!');

function processFiles(dir) {
    fs.readdir(dir, function (err, list) {
        if (err) {
            console.log('processFiles - reading directories error: ' + err);
            return;
        }
        list.forEach(function(file) {
            file = path.join(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat.isDirectory()) {
                    processFiles(file);
                } else{
                    compress(file); 
                }
            });
        });
    });
}

function compress(file) {
    var ext = path.extname(file).toLowerCase();
    switch(ext) {
        case '.js':
            console.log('---->Compressing/Uglifying JS File: ' + file);
            var result = UglifyJS.minify(file, {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    join_vars: true,
                    unused: true,
                    conditionals: true,
                    join_vars: true
                }
            });
            fs.writeFileSync(file, result.code, 'utf8');
            break;
        case '.css':
            console.log('---->Minifying CSS File: ' + file);
            var source = fs.readFileSync(file, 'utf8');
            var result = cssMinifier.minify(source);
            fs.writeFileSync(file, result, 'utf8');
            break;
        // Image options https://github.com/imagemin/imagemin
        case '.svg':
            console.log('---->Minifying SVG File: ' + file);
            // svgGo options https://github.com/imagemin/imagemin#svgo
            imagemin.src(file).dest(file).use(ImageMin.svgo());
            break;
        case '.gif':
            console.log('---->Minifying GIF File: ' + file);
            // GifSicle options https://github.com/imagemin/imagemin#gifsicle
            imagemin.src(file).dest(file).use(ImageMin.gifsicle({
                interlaced: true
            }));
            break;
        case '.png':
            console.log('---->Minifying PNG File: ' + file);
            // OptiPNG options https://github.com/imagemin/imagemin#optipng
            imagemin.src(file).dest(file).use(ImageMin.optipng({
                optimizationLevel: 2
            }));
            break;
        case '.jpg':
        case '.jpeg':
            console.log('---->Minifying JPEG File: ' + file);
            // jpegTran options https://github.com/imagemin/imagemin#jpegtran
            imagemin.src(file).dest(file).use(ImageMin.jpegtran({
                progressive: true
            }));
            console.log('---->Minifying JPEG File: ' + file);
            break;
        default:
            console.log('---->Encountered file with ' + ext + ' extension - not compressing.');
            break;
    }
}

function minifyFiles(){
	switch (platform) {
	case 'android':
		platformPath = path.join(platformPath, platform, "assets", "www");
		break;
	case 'ios':
		console.log("inside ios")
		platformPath = path.join(platformPath, platform, "www");
		break;
	default:
		console.log('Hook currently supports only Android and iOS');
	return;
	}
	
	var isRelease = (cliCommand.indexOf('--release') > -1); // comment the above line and uncomment this line to turn the hook on only for release
	if (!isRelease) {
		return;
	}
	console.log("Minifying Files....")
	var foldersToProcess = ['css', 'img', 'app','lib'];
	
	foldersToProcess.forEach(function(folder) {
		processFiles(path.join(platformPath, folder));
	});	
}


function addPlatformBodyTag(indexPath, platform) {
  // add the platform class to the body tag
  try {
    var platformClass = 'platform-' + platform;
    var cordovaClass = 'platform-cordova platform-webview';

    var html = fs.readFileSync(indexPath, 'utf8');

    var bodyTag = findBodyTag(html);
    if(!bodyTag) return; // no opening body tag, something's wrong

    if(bodyTag.indexOf(platformClass) > -1) return; // already added

    var newBodyTag = bodyTag;

    var classAttr = findClassAttr(bodyTag);
    if(classAttr) {
      // body tag has existing class attribute, add the classname
      var endingQuote = classAttr.substring(classAttr.length-1);
      var newClassAttr = classAttr.substring(0, classAttr.length-1);
      newClassAttr += ' ' + platformClass + ' ' + cordovaClass + endingQuote;
      newBodyTag = bodyTag.replace(classAttr, newClassAttr);

    } else {
      // add class attribute to the body tag
      newBodyTag = bodyTag.replace('>', ' class="' + platformClass + ' ' + cordovaClass + '">');
    }

    html = html.replace(bodyTag, newBodyTag);

    fs.writeFileSync(indexPath, html, 'utf8');

    process.stdout.write('add to body class: ' + platformClass + '\n');
    minifyFiles();
  } catch(e) {
    process.stdout.write(e);
  }
}

function findBodyTag(html) {
  // get the body tag
  try{
    return html.match(/<body(?=[\s>])(.*?)>/gi)[0];
  }catch(e){}
}

function findClassAttr(bodyTag) {
  // get the body tag's class attribute
  try{
    return bodyTag.match(/ class=["|'](.*?)["|']/gi)[0];
  }catch(e){}
}

if (rootdir) {

  // go through each of the platform directories that have been prepared
  var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

  for(var x=0; x<platforms.length; x++) {
    // open up the index.html file at the www root
    try {
      var platform = platforms[x].trim().toLowerCase();
      var indexPath;

      if(platform == 'android') {
        indexPath = path.join('platforms', platform, 'assets', 'www', 'index.html');
      } else {
        indexPath = path.join('platforms', platform, 'www', 'index.html');
      }

      if(fs.existsSync(indexPath)) {
        addPlatformBodyTag(indexPath, platform);
      }

    } catch(e) {
      process.stdout.write(e);
    }
  }

}
