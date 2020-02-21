let timer = null;
let fbWindow = null;

function closeAuthWindow() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (fbWindow) {
    fbWindow.close();
    fbWindow = null;
  }
}

const defaultUrloptions = {
  response_type: 'code',
  scope: 'email,public_profile'
};

const defaultWindowOptions = {
  status: 'no',
  scrollbars: 'no'
};

function reduce(obj, reducer, input) {
  let result = input;
  for (const attr in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, attr)) {
      result = reducer(result, obj[attr], attr);
    }
  }
  return result;
}

function respond(err, result, callback, resolve, reject) {
  const error = typeof err === 'string' ? new Error(err) : err;
  if (callback) {
    callback(error, result);
  }
  if (error) {
    reject(error);
  } else {
    resolve(result);
  }
}

function getParameterByName (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function waitForResponse (callback) {
  timer = setInterval(() => {
    try {
      if (fbWindow.closed) {
        closeAuthWindow();
        callback(new Error('The Facebook auth window got closed unexpectedly'));
        return;
      }
      const code = getParameterByName('code', fbWindow.location.href);
      if (code) {
        closeAuthWindow();
        callback(null, code);
      }
    } catch (e) {}
  }, 100);
}

export default function authFacebook (urlOptionsParams, windowOptionsParams = {}, ver = 'v3.2', callback) {
  if (typeof window === 'undefined') {
    return
  }
  if (!urlOptionsParams || !urlOptionsParams.client_id) {
    const settingsError = new Error('Facebook client id is not set!');
    if (!callback) {
      return Promise.reject(settingsError);
    }
    callback(settingsError);
    return;
  }
  closeAuthWindow();
  const redirect_uri = window.location.origin;
  const urlOptions = {redirect_uri, ...defaultUrloptions, ...urlOptionsParams};
  const windowOptions = {...defaultWindowOptions, ...windowOptionsParams};
  windowOptions.width = windowOptions.width || window.outerWidth < 1024 ? window.outerWidth : 1024;
  windowOptions.height = windowOptions.height || window.outerHeight < 1024 ? window.outerHeight : 1024;
  windowOptions.left = windowOptions.left || window.screenLeft + Math.round((window.outerWidth - windowOptions.width) / 2);
  windowOptions.top = windowOptions.top || window.screenTop + Math.round((window.outerHeight - windowOptions.height) / 2);
  const uri = reduce(urlOptions, (sum, val, key) => sum + `&${key}=${val}`, '');
  const options = reduce(windowOptions, (sum, val, key) => sum + `${key}=${val},`, '').slice(0, -1);
  const url = `https://www.facebook.com/${ver}/dialog/oauth?${uri}`;
  fbWindow = window.open(url, 'FBwindow', options);
  if (!callback) {
    return new Promise(function (resolve, reject) {
      waitForResponse(function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    })
  }
  waitForResponse(callback);
}