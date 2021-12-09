const { server, app } = require('./app');
require('./db');

server.listen(app.get('port'), () => {
  console.log('Server running on port 3000');
});
