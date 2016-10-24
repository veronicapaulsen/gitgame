var express = require('express');

var server = express();
server.use(express.static(__dirname + '/.'));



const PORT=8080;
server.listen(PORT, function() {
    console.log('server listening on port ' + PORT);
});
