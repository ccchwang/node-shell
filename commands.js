  var exports = module.exports = {};
	var request = require('request');
  var fs = require('fs');


exports.done = function(output){
		process.stdout.write(output);
		process.stdout.write('\nprompt > ');
	}

exports.pwd = function(file) {
		exports.done(process.env.PWD);
  }

exports.date = function(file) {
		exports.done(Date());
  }

exports.ls = function(file) {
		var output = '';
  	fs.readdir('.', function(err, files) {
  		if(err) throw err;
  		files.forEach(function(file) {
				output += file.toString() + '\n'
  		})
  		exports.done(output);
  	});
  }

exports.echo = function(file) {
  	var output = file.join(' ');
		exports.done(output);
  }

exports.cat = function(file) {
	 var output = '';

	 fs.readFile(file[0], 'utf8', function(err, lines){
		 if(err) throw err;
		 output += lines + '\n';
		 exports.done(output);
	 });
 }

exports.head = function(file) {
	 var output = '';

	 fs.readFile(file[0], 'utf8', function(err, lines){
		 	if(err) throw err;
			 var splitLines = lines.split('\n')
			 output += splitLines.slice(0,5).join("\n");
			 exports.done(output);
	 });
 }

exports.tail = function(file) {
	  var output = '';

	 fs.readFile(file[0], 'utf8', function(err, lines) {
		 	if(err) throw err;
			 var splitLines = lines.split('\n')
			 var len = splitLines.length
			 output += splitLines.slice(len-5).join("\n");
			 exports.done(output);
	 });
 }

exports.sort = function(file) {
	 var output = '';

	 fs.readFile(file[0], 'utf8', function(err, lines){
		 	if(err) throw err;
			 var splitLines = lines.split('\n')
			 output += splitLines.sort().join("\n");
			 exports.done(output);
	 });
 }

exports.wc = function(file) {
	 var output = '';

	 fs.readFile(file[0], 'utf8', function(err, lines){
		 	if(err) throw err;
			 var splitLines = lines.split('\n')
			 output += String(splitLines.length);
			 exports.done(output);
	 });
 }

exports.uniq = function(file) {
	 fs.readFile(file[0], 'utf8', function(err, lines){
		 	if(err) throw err;
			 var splitLines = lines.split('\n');
			 var newArr = [];

			 splitLines.forEach(function(line, index){
						if (line !== splitLines[index-1]) {
						newArr.push(line);
					}
			 })

			 exports.done(newArr.join("\n"));
	 });
 }

exports.curl = function(file){
	 request(file[0], function (error, response, body) {
			if (!error && response.statusCode == 200) {
				exports.done(body);
			};
		});
 }
