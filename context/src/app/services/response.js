const format = (request, reply, status, code, message, data) => {
  const response = {
    message,
    status,
    code,
    data,
  };

  return response;
};

const send = (request, reply, status, code, message, data) => {
  const statusCode = 200;
  const response = format(request, reply, status, code, message, data);
  return reply.status(statusCode).send(response);
};

module.exports.format = format;
module.exports.send = send;
