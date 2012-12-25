(function() {
  // Require module
  var finger = require('./finger');

  // Check number of arguments
  if (process.argv.length < 3) {
    console.error('Usage: cmu-finger <Andrew ID or email address>');
    process.exit(1);
  }

  finger.lookup(process.argv[2], function(data) {
    console.log(data);
  });
}).call(this)