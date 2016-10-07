var require = {
  baseUrl: 'app',
  paths: {
	'angular-resource': '../lib/ionic/js/angular/angular-resource.min',  
    'ionic': '../lib/ionic/js/ionic.bundle.min',
    'qrScanner': '../lib/qr-scanner/qr-scanner',
    'jsqrcode': '../lib/qr-scanner/jsqrcode-combined.min'
    /*'webqr-grid': '../lib/webqr/grid',
    'webqr-version': '../lib/webqr/version',
    'webqr-detector': '../lib/webqr/detector',
    'webqr-formatinf': '../lib/webqr/formatinf',
    'webqr-errorlevel': '../lib/webqr/errorlevel',
    'webqr-bitmat': '../lib/webqr/bitmat',
    'webqr-datablock': '../lib/webqr/datablock',
    'webqr-bmparser': '../lib/webqr/bmparser',
    'webqr-datamask': '../lib/webqr/datamask',
    'webqr-rsdecoder': '../lib/webqr/rsdecoder',
    'webqr-gf256poly': '../lib/webqr/gf256poly',
    'webqr-gf256': '../lib/webqr/gf256',
    'webqr-decoder': '../lib/webqr/decoder',
    'webqr-qrcode': '../lib/webqr/qrcode',
    'webqr-findpat': '../lib/webqr/findpat',
    'webqr-alignpat': '../lib/webqr/alignpat',
    'webqr-databr': '../lib/webqr/databr'*/
    // jquery: '../lib/jquery/jquery.min.js'
  },
  shim: {
	  'angular-resource': {
		  deps: ['ionic']
	  },
	  'qrScanner': {
		  deps: ['ionic','jsqrcode']
	  }
  }
  // if you are using jquery you have to add a shim for ionic and add jquery as deps
  // shim: {
  //   'ionic': {deps: ['jquery']},
  // }
  // sometimes you need to set the loading priority especially
  // priority: [
  //   'jquery',
  //   'ionic'
  // ]
};
