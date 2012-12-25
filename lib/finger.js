var request = require('request'),
    prefix = 'http://www.cs.cmu.edu/cgi-bin/finger?',
    domain = '@andrew.cmu.edu',
    regexp = /\s+(.+):\s+(.+)/;

Finger = {}
module.exports = Finger;

Finger.lookup = function(email, fn) {
  Finger.finger(email, function(data) {
    fn(Finger.parse(data));
  });
}

Finger.finger = function(email, fn) {
  if (email.indexOf('@') == -1) {
    email = email + domain;
  }
  var url = prefix + email;
  request(url, function(err, res, data) {
    if (err || res.statusCode != 200) {
      console.log('Error sending HTTP request');
    }
    else {
      fn(data);
    }
  });
};

Finger.parse = function(data) {
  var info = {},
      lines = data.split('\n');
  lines.forEach(function(line) {
    var match = regexp.exec(line);
    if (match) {
      info[camelCase(match[1])] = match[2];
    }
  });
  return info;
};

function camelCase(input) { 
  return input.toLowerCase().replace('-', '').replace(/\s(.)/g, function(match, group1) {
      return group1.toUpperCase();
  });
}