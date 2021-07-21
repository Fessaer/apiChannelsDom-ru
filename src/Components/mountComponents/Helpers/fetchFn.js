const fetchFunction = async (method, url, fnBuildBody) => {
 

  let bodyfetch = fnBuildBody;

  let promise = new Promise(function (resolve, reject) {
    let http = new XMLHttpRequest();
    http.open(
      method,
      url
    );
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onload = function () {
      let response = http.responseText;
      resolve(response);
    };
    http.onerror = function () {
      arrResponseElements = [];
      noRenderPagination = true;
    };
    http.send(bodyfetch);
  });

  return promise
    .then(function (response) {
      console.log(response)
    })
    .catch((e) =>  console.log(e));
};
export default fetchFunction;