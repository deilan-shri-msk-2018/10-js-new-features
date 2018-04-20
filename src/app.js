import { Request } from './request';

const request = new Request();

request
  .get('https://api.github.com/users', onSuccess, onError)
  .get('https://some.invalid.url', onSuccess, onError)
  .get('https://api.github.com/organizations', onSuccess, onError); 

function onSuccess(res) {
  console.log(res.status);
}

function onError(err) {
  console.error(err.message);
}
