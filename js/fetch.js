
// 一个我封装的 fetch 请求

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else if (response.status == 401) {
    back_login()
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function parseBLOB(response) {
  return response.blob()
}

// <!-- header -->
var myHeaders = new Headers();
myHeaders.append('Authorization', "Token " + token);
myHeaders.append('Content-Type', "application/json");

var tokenHeaders = new Headers();
tokenHeaders.append('Authorization', "Token " + token);

function tFetch(url, method = 'GET') {
  var prefixedUrl = url.startsWith(baseurl) ? url : baseurl + url
  var myRequest = new Request(prefixedUrl, {
    headers: tokenHeaders,
    method,
  });
  return fetch(myRequest)
}

function getImg(url) {
  return tFetch(url).then(checkStatus).then(parseBLOB)
}

function getJSON(url) {
  return tFetch(url).then(checkStatus).then(parseJSON)
}

function JSONFetch(url, method = 'GET', body = null) {
  var prefixedUrl = url.startsWith(baseurl) ? url : baseurl + url
  var myRequest = new Request(prefixedUrl, {
    headers: myHeaders,
    method,
    body
  });
  return fetch(myRequest)
}

function postImg(url, body) {
  return JSONFetch(url, 'POST', body).then(checkStatus).then(parseBLOB)
}

function postJSON(url, body) {
  return JSONFetch(url, 'POST', body).then(checkStatus).then(parseJSON)
}

function putJSON(url, body) {
  return JSONFetch(url, 'PUT', body).then(checkStatus).then(parseJSON)
}

// 带有 token 的请求
function syncXHR(method, path, data, callback) {
  var r = new XMLHttpRequest()
  //设置方法和请求地址
  var path = baseurl + path
  r.open(method, path, false)
  //设置发送的数据的格式，当data不为空的时候，就需要设置
  r.setRequestHeader('Authorization', "Token " + token)
  r.setRequestHeader('Content-Type', "application/json")
  //注册响应函数
  r.onreadystatechange = function() {
    // console.log('r.status, r.readyState', r.status, r.readyState);
    if (r.status == 401) {
      back_login()
      // console.log('token', token);
    }

    if (r.readyState == 4) {
      // console.log(r.response);
      callback(r.response, r.status)
    }
  }
  //发送请求
  r.send(data)
}

export {
  tFetch,
  JSONFetch,
  getJSON,
  postJSON,
  putJSON,
  getImg,
  postImg,
  myHeaders,
  tokenHeaders,
  checkStatus,
  parseJSON,
  parseBLOB,
  syncXHR,
}
