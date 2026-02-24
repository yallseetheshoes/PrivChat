const radarCircle = document.getElementById('loaderCircle')
const loaderText = document.getElementsByClassName('loadText')[0]
const pages = document.getElementsByClassName('pages')[0]
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