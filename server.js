//  OpenShift sample Node application
var express = require('express'),
    app     = express();
    path    = require('path');
    
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.use(express.static(path.join(__dirname, './temp')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname = './temp/index.html'));
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;