export class RequestExecutor {
  constructor() {
    this.requestQueue = [];
    this.isExecuting = false;
  }

  execute(requestContext) {
    this.requestQueue.push(requestContext);
    if (!this.isExecuting) {
      this.isExecuting = true;
      this._postRequestToExecution();
    }
  }

  _postRequestToExecution() {
    setTimeout(() => {
      this._executeNextRequest();
    }, 0);
  }

  _executeNextRequest() {
    const requestCtx = this.requestQueue.shift();
    if (!requestCtx) {
      this.isExecuting = false;
      return;
    }
    const promise = fetch(requestCtx.url, requestCtx.options)
      .then(assertSuccess)
      .then((res) => {
        this._postRequestToExecution();
        return res;
      })
      .catch((err) => {
        this._postRequestToExecution();
        return Promise.reject(err);
      });
    if (requestCtx.onSuccess) {
      promise.then(requestCtx.onSuccess);
    }
    if (requestCtx.onError) {
      promise.catch(requestCtx.onError);
    }
  }
}

function assertSuccess(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    const error = new Error(response.statusText || response.status);
    error.response = response;
    return Promise.reject(error);
  }
}
