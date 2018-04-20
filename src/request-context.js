import {
  METHODS
} from './methods';

export class RequestContext {
  constructor({
    url,
    method,
    headers,
    onSuccess,
    onError
  }) {
    this.url = url;
    this.method = method || METHODS.GET;
    this.headers = headers || {};
    this.onSuccess = onSuccess,
      this.onError = onError
  }

  get method() {
    return this._method;
  }

  set method(value) {
    if (!Object.values(METHODS).includes(value)) {
      throw new Error(`Invalid method '${value}'`);
    }
    this._method = value;
  }
}
