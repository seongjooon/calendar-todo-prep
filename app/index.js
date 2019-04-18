// Load application styles
import 'styles/index.css';
import server from './server';

// ================================
// START YOUR APP HERE
// ================================

// You can get the initial data
server.get(function (data) {
  alert('Here is the data: ' + JSON.stringify(data));
});
