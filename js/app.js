// 1- define our elements here!
const apiKey = document.querySelector("#api_key")
const apiSecret = document.querySelector("#api_secret")
const btnSubmit = document.querySelector("#btn-submit")

const sendToServer = () => {
  // validate data api_key, api_secret
  if (apiKey.value && apiSecret.value)
    alert('mitoni data send koni be server')
  else alert('nemitni bug dari!')
  // send to server!
}

btnSubmit.addEventListener('click', sendToServer)

