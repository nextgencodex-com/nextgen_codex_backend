const apiResponse = (statusCode, data, message) => {
  return {
    statusCode,
    data,
    message,
    success: statusCode < 400,
  };
};

export default apiResponse;
