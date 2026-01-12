class api_response {
  constructor(statusCode, data, message = "SUCCESS") {
    ((this.statusCode = statusCode),
      (this.message = message),
      (this.data = data),
      (this.sucess = statusCode < 400));
  }
}

export { api_response };
