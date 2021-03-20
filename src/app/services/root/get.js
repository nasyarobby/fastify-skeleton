module.exports = function getRoot(req, res) {
  res.box(`Edit this file at ${__filename}`, { data: 'Sample Data' });
};
