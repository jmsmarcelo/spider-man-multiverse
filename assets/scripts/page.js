const queries = new URLSearchParams(location.search);
const toHome = () => location.href = './';
function loadStyle(param) {
    if(!param) {
        return toHome();
    }
    const cssUrl = `assets/styles/page-${param}.css`;
    fetch(cssUrl, {method: 'HEAD'})
        .then(r => {
            if(r.ok) {
                const css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = cssUrl
                document.head.appendChild(css);
            } else {
                toHome();
            }
        }).catch(r => {
            toHome();
        });
}
loadStyle(queries.get('pg'));
let data = {};
const navBtn = document.querySelector('.nav-btn');
const release = document.querySelector('.release');
const synopsis = document.querySelector('.synopsis');
const gallery = document.querySelector('.gallery');
const btnTrailer = document.querySelector('.btn-play');
const popup = {
    bg: document.querySelector('.popup-bg'),
    win: document.querySelector('.popup-win'),
    cont: document.querySelector('.popup-cont'),
    x: document.querySelector('.popup-x')
};
function loadData(param) {
    return fetch(`assets/scripts/page-${param}.json`, {method: 'GET'})
        .then(r => {
            if(!r.ok) {
                throw new Error('Failed to load data');
            }
            return r.json();
        }).catch(() => {
            toHome();
        });
}
async function setPage() {
    try {
        data = await loadData(queries.get('pg'));
    } catch(err) {
        return toHome();
    }
    for(let i = 0; i < data.navBtn.length; i++) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        if(data.navBtn[i] !== null) {
            btn.ariaLabel = btn.title = 'Go to Spider-Man 0' + (i + 1);
            btn.textContent = '0' + (i + 1);
            btn.onclick = (() => {
                location.href = 'page.html?pg=' + data.navBtn[i]
            });
        } else {
            btn.ariaLabel = btn.title = 'Is this page';
            btn.textContent = '0' + (i + 1);
            btn.classList.add('btn-active');
        }
        li.appendChild(btn);
        navBtn.appendChild(li);
    }
    for(let i = 0; i < data.release.length; i++) {
        const li = document.createElement('li');
        li.textContent = data.release[i];
        release.appendChild(li);
    }
    synopsis.textContent = data.synopsis;
}
function fullPic(el) {
    popup.bg.removeAttribute('style');
    const bg = window.getComputedStyle(el).backgroundImage;
    popup.cont.style.backgroundImage = bg;
    popup.win.classList.add('popup-pic');
    popup.x.onclick = () => {
        popup.bg.classList.remove('popup-show');
        setTimeout(() => {
            popup.bg.style.display = 'none';
            popup.win.classList.remove('popup-pic');
            popup.cont.removeAttribute('style');
        }, 300);
    };
    popup.bg.classList.add('popup-show');
}
for(let pic of gallery.children) {
    pic.addEventListener('click', () => {
        fullPic(pic);
    });
}
function watchTrailer() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + data.ytHash;
    iframe.width = '560';
    iframe.height = '315';
    iframe.style.border = 'none';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    popup.bg.removeAttribute('style');
    popup.cont.appendChild(iframe);
    popup.win.classList.add('popup-trailer');
    popup.bg.classList.add('popup-show');
    popup.x.onclick = () => {
        popup.bg.classList.remove('popup-show');
        setTimeout(() => {
            popup.bg.style.display = 'none';
            popup.win.classList.remove('popup-trailer');
            popup.cont.removeAttribute('style');
        }, 300);
        while(popup.cont.firstChild) {
            popup.cont.firstChild.remove();
        }
    };
}
btnTrailer.onclick = watchTrailer;
setPage();