import authFacebook from './index.js'
console.log('Start test')

const fbError = document.getElementById('fb-error');
const fbResult = document.getElementById('fb-result');

function openFB() {
  fbError.innerText = '';
  fbResult.innerText = '';
  const client_id = document.getElementById('fb-client-id').value;
  authFacebook({
    client_id
  }).then((response) => {
    console.log(response)
    fbResult.innerText = response;
  }, function(err) {
    console.error(err);
    fbError.innerText = err.message;
  })
}

document.getElementById('fb-button').addEventListener('click', openFB)
