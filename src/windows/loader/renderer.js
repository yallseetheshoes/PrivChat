const radarCircle = document.getElementById('loaderCircle')
const loaderText = document.getElementsByClassName('loadText')[0]
const pages = document.querySelector('.pages')
window.electron.connectionState((event, args) => {

    if (args === 'Connection successful') {
        loaderText.innerHTML = 'Connection successful!'
        radarCircle.classList.remove('searching');
        radarCircle.classList.add('success');
        setTimeout(() => {
            pages.classList.add('active-login')
        },1000)
    }
});

let loginDebounce = false
const loginPage = document.querySelector('.page.login');
const inputs = document.querySelectorAll('input');
const loginButton = document.querySelector('.loginBtn');
loginPage.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!loginDebounce) {
        loginDebounce = true
        loginButton.classList.add('attemptingLogin')
        window.electron.login({ Username: inputs[0].value, Password: inputs[1].value })
    }
})