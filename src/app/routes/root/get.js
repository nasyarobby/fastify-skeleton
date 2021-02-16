const { send } = require('../../services/response');
const { status } = require('../../services/status');

module.exports = function getRoot(req, res) {
  send(req, res, status.SUCCESS, 200, `Edit this file at ${__filename}`, { data: 'Sample Data' });
};
