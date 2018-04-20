import {
  RequestContext
} from './request-context';
import {
  RequestExecutor
} from './executor';

import { METHODS} from './methods';

export class Request {
  constructor() {
    this.executor = new RequestExecutor();
  }

  request(url, onResolve, onReject, options) {
    const requestContext = new RequestContext({
      url,
      method: options.method,
      headers: options.headers,
      onSuccess: onResolve,
      onError: onReject
    });
    this.executor.execute(requestContext);
    return this;
  }

  get(url, onResolve, onReject, options) {
    return this.request(url, onResolve, onReject, {
      method: METHODS.GET,
      headers: options.headers
    });
  }

  post(url, onResolve, onReject, options) {
    return this.request(url, onResolve, onReject, {
      method: METHODS.POST,
      headers: options.headers
    });
  }

  put(url, onResolve, onReject, options) {
    return this.request(url, onResolve, onReject, {
      method: METHODS.PUT,
      headers: options.headers
    });
  }

  delete(url, onResolve, onReject, options) {
    return this.request(url, onResolve, onReject, {
      method: METHODS.DELETE,
      headers: options.headers
    });
  }

  head(url, onResolve, onReject, options) {
    return this.request(url, onResolve, onReject, {
      method: METHODS.HEAD,
      headers: options.headers
    });
  }

  options(url, onResolve, onReject, options) {
    return this.request(url, onResolve, onReject, {
      method: METHODS.OPTIONS,
      headers: options.headers
    });
  }
}
