var util = require('util');
var chokidar = require('chokidar');
var _ = require('lodash');

var stdin = process.stdin;
// var EXIT_CONDITION = false;
var log = console.log;

clear();
// var repl = require('repl');
// var replSvr = repl.start({prompt:'test>'});

stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', function (text) {
    text = text.trim();
    if (text === 'quit') {
		process.exit();
    }
});

// , {ignored: /[\/\\]\./}
chokidar
  .watch(['./src'])
  .on('change', _.debounce(function(path) {
    try {
      clear();
      var key = require.resolve('./' + path);
      delete require.cache[key];

      makeCmdHeader([path]);
      var mod = require(key) || {};
      // if(mod.hasOwnProperty('test')) {
      //   mod.test();
      // }
    }
    catch(err) { log(err.message); }
  }, 300));



function makeCmdHeader(cmdHeader) {
    var line = '##################################################';
    var prefix = '#  ';

    log(line);
    for(var i = 0, len = cmdHeader.length; i < len; i++) {
        log(prefix + cmdHeader[i]);
    }
    log(line);
}


function clear() {
    process.stdout.write('\x1Bc');
    process.stdout.write('\u001B[2J\u001B[0;0f');
}



// (function wait () {
//   if (!EXIT_CONDITION) setTimeout(wait, 1000);
// }.bind(this))();
