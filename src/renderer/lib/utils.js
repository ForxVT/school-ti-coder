const { session } = require('electron').remote;

exports.clearCookies = () => {
  session.fromPartition('app').clearStorageData([], (data) => {
    
  });
};

exports.setCookie = (name, data) => {
  let expiration = new Date();
  expiration = new Date(expiration.setMonth(expiration.getMonth() + 1));
  session.fromPartition('app').cookies.set({
    url: `http://${window.location.host}/`,
    name: name,
    value: data,
    expiration: expiration,
  }, (error) => {
    if (error) {
      console.error(error);
    }
  });
};

exports.getCookies = (callback) => {
  session.fromPartition('app').cookies.get({}, (error, cookies) => {
    if (error) {
      console.error(error);
    }
    return callback(cookies);
  });
};

exports.getCookie = (name, callback) => {
  const value = {
    name: name,
  };
  session.fromPartition('app').cookies.get(value, (error, cookies) => {
    if (error) {
      console.error(error);
    }
    return callback(cookies[0]);
  });
};

exports.chunkify = (a, n) => { 
  let index = 0;
  const arrayLength = a.length;
  const tempArray = [];
  
  for (index = 0; index < arrayLength; index += n) {
    const myChunk = a.slice(index, index + n);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
};
