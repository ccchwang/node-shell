var commands = require('./commands.js');
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  // var cmd = data.toString().trim(); // remove the newline
  var cmd = data.toString().trim().split(' ')[0];
  var args = data.toString().trim().split(' ').slice(1)

  //if this cmd exists as a fn, run it
  if (commands[cmd]) commands[cmd](args);
  else {process.stderr.write('not valid command')}
});
