module.exports = function getRoot(req, res) {
  // dapat juga menggunakan res.box
  res.xsend(`Edit this file at ${__filename}`, { data: 'Sample Data' });
};
