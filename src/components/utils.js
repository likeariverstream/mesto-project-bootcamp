'use strict';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function checkResult(result) {
  console.log(result);
}

function checkError(err) {
  console.log(err);
}

export {
  checkError,
  checkResponse,
  checkResult
};