/**
 * Created by chenglian on 15/6/20.
 */

var debug = require('debug')('express-example');
var app = require('./app');

app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
