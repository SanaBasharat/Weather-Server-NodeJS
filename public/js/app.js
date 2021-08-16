const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
console.log("Client Side JS")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loc = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
            }
        })
    })
})