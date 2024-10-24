const carousel = document.querySelector('.carousel'),
    controls = document.querySelector('.controls'),
    controlDirect = document.querySelector('.control-direct'),
    ageUrl = ['page.html?pg=tm-sm1', 'page.html?pg=ag-sm1', 'page.html?pg=th-sm1'],
    overBg = ["url('../images/tm--bg.jpg') center/cover no-repeat", "url('../images/ag--bg.jpg') center/cover no-repeat", "url('../images/th--bg.png') center/cover no-repeat"];
let selectedIndex = 0;
function carouselMouseEnter(i) {
    document.documentElement.style.setProperty('--body-over-backgroud', overBg[i]);
    const oldItemActive = document.querySelector('.item-active');
    if(oldItemActive) {
        oldItemActive.classList.remove('item-active');
    }
    carousel.children[i].classList.add('item-active');
    document.body.classList.add(`sm${i}`);
    const notThis = document.querySelectorAll('.carousel-item:not(.item-active)');
    notThis.forEach(elem => {
        elem.classList.add('item-not-active');
    });
}
function carouselMouseLeave(i) {
    carousel.children[i].classList.remove('item-active');
    document.body.classList.remove(`sm${i}`);
    const notThis = document.querySelectorAll('.item-not-active');
    notThis.forEach(elem => {
        elem.classList.remove('item-not-active');
    });
}
function changeItem(mode) {
    if(mode === '<' && selectedIndex > 0) {
        controlDirect.children[selectedIndex - 1].firstChild.click();
    } else if(mode === '>' && selectedIndex < 2) {
        controlDirect.children[selectedIndex + 1].firstChild.click();
    }
}
for(let i = 0; i < carousel.children.length; i++) {
    carousel.children[i].addEventListener('mouseenter', function(e) {
        carouselMouseEnter(i);
    });
    carousel.children[i].addEventListener('mouseleave', function(e) {
        carouselMouseLeave(i);
    });
    carousel.children[i].addEventListener('click', () => {
        location.href = pageUrl[i];
    })
    controlDirect.children[i].firstChild.addEventListener('click', function(e) {
        const oldBtnActive = document.querySelector('.btn-active');
        const oldEventAll = document.querySelector('.eventAll');
        oldEventAll.classList.remove('eventAll');
        carousel.children[i].classList.add('eventAll');
        oldBtnActive.classList.remove('btn-active');
        carousel.style.transform = `rotateY(${-120 * i}deg)`;
        this.classList.add('btn-active');
        selectedIndex = i;
    });
}
controls.children[0].firstChild.addEventListener('click', () => {
    changeItem('<');
});
controls.children[2].firstChild.addEventListener('click', () => {
    changeItem('>');
});