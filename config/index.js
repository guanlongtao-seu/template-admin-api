const dev = require('./dev');
const pro = require('./pro');
const env = process.env.NODE_ENV;

if (env === 'dev') {
  module.exports = dev;
} else if (env === 'pro') {
  module.exports = pro;
} else {
  module.exports = dev;
}

