const { createProxyMiddleware } = require('http-proxy-middleware');
// FOR DEVELOPMENT
// frontend proxy to backend running on localhost:6012
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5050',
      changeOrigin: true,
    })
  );
};