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


const loginPage = document.querySelector('.page.login');
const inputs = document.querySelectorAll('input');
loginPage.addEventListener('submit', (event) => {
    event.preventDefault()
    window.electron.login({ username: inputs[0].value, password: inputs[1].value })
})