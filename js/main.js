let settingBox = document.querySelector(".setting-box");
let settingBtn = document.querySelector(".toggle-setting .fa-gear");
settingBtn.onclick = function () {
    this.classList.toggle("fa-spin");
    settingBox.classList.toggle("opened");
};

const colors = document.querySelectorAll(".colors-list li");
if (localStorage.getItem("color")) {
    document.documentElement.style.setProperty(
        "--main-color",
        localStorage.getItem("color")
    );
    document.querySelectorAll(".colors-list li").forEach((e) => {
        e.classList.remove("active");
        if (e.dataset.color === localStorage.getItem("color")) {
            e.classList.add("active");
        }
    });
}
colors.forEach((li) => {
    li.addEventListener("click", (e) => {
        colors.forEach((li) => {
            document.documentElement.style.setProperty(
                "--main-color",
                e.target.dataset.color
            );
            localStorage.setItem("color", e.target.dataset.color);
            handleActiveClass(e)
        });
    });
});

const allBullets = document.querySelectorAll('.nav-bullets .bullet')
allBullets.forEach(bullet => {
    bullet.addEventListener('click', function (e) {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
    })
})
let bulletsSpan = document.querySelectorAll('.bullets-option span')
let bulletsContainer = document.querySelector('.nav-bullets')
let bulletLocal = localStorage.getItem('bullets-option')

if (bulletLocal !== null) {
    bulletsSpan.forEach((span) => {
        span.classList.remove('active')
    })
    if (bulletLocal === 'block') {
        bulletsContainer.style.display = 'block'
        document.querySelector('.bullets-option .yes').classList.add('active')
    } else {
        bulletsContainer.style.display = 'none'
        document.querySelector('.bullets-option .no').classList.add('active')
    }
}


bulletsSpan.forEach((span) => {
    span.addEventListener('click', (e) => {
        if (span.dataset.show === 'yes') {
            bulletsContainer.style.display = 'block'
            localStorage.setItem('bullets-option', 'block')
        } else {
            bulletsContainer.style.display = 'none'
            localStorage.setItem('bullets-option', 'none')
        }
        handleActiveClass(e)
    })
})

document.querySelector('.reset-option').onclick = function () {
    localStorage.clear()
    window.location.reload()
}


let landingPage = document.querySelector(".landing-page");
let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let bgOption = true;
let bgInterval;

function randomImgs() {
    if (bgOption === true) {
        bgInterval = setInterval(() => {
            let random = Math.floor(Math.random() * imgs.length);
            landingPage.style.backgroundImage = `url("imgs/${imgs[random]}")`;
        }, 5000);
    }
}

let bglocal = localStorage.getItem("bgOption");
if (bglocal !== null) {
    document.querySelectorAll(".random-backgrounds span").forEach((e) => {
        e.classList.remove("active");
    });
    if (bglocal === "true") {
        bgOption = true;
        document.querySelector(".random-backgrounds .yes").classList.add('active')
    } else {
        bgOption = false;
        document.querySelector(".random-backgrounds .no").classList.add('active')
    }

}

const rBackgroundEl = document.querySelectorAll(".random-backgrounds span");
rBackgroundEl.forEach((span) => {
    span.addEventListener("click", (e) => {
        handleActiveClass(e)
        if (e.target.dataset.bg === "yes") {
            bgOption = true;
            randomImgs();
            localStorage.setItem("bgOption", true);
        } else {
            bgOption = false;
            clearInterval(bgInterval);
            localStorage.setItem("bgOption", false);
        }
    });
});

randomImgs();

let skills = document.querySelector('#skills')
let spans = document.querySelectorAll('.skills .skill-box .progress span')
window.onscroll = function () {
    if (window.scrollY >= skills.offsetTop - 100) {
        spans.forEach((span) => {
            span.style.width = span.dataset.width
        })
    }
}

let gallery = document.querySelectorAll('.gallery img')
gallery.forEach(img => {
    img.addEventListener('click', (e) => {
        let overlay = document.createElement('div')
        overlay.className = 'popup-overlay'
        document.body.appendChild(overlay)
        let popBox = document.createElement('div')
        popBox.className = 'popup-box'
        if (img.alt !== null) {
            let imageHead = document.createElement('h3')
            let imageText = document.createTextNode(img.alt)
            imageHead.appendChild(imageText)
            popBox.appendChild(imageHead)
        }
        let popupImage = document.createElement('img')
        popupImage.src = img.src
        popBox.appendChild(popupImage)
        document.body.appendChild(popBox)
        let closeBtn = document.createElement('span')
        closeBtn.className = "close-button"
        let closeT = document.createTextNode("X")
        closeBtn.appendChild(closeT)
        popBox.appendChild(closeBtn)
        closeBtn.onclick = function () {
            overlay.remove()
            popBox.remove()
        }
    })
})

function handleActiveClass(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    })
    ev.target.classList.add("active");

}

let toggleBtn = document.querySelector('.toggle-menu')
let tLinks = document.querySelector('.header-area .links')

toggleBtn.onclick = function (e) {
    e.stopPropagation()
    this.classList.toggle('active')
    tLinks.classList.toggle('open')
}
document.addEventListener('click', (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle('active')
            tLinks.classList.toggle('open')
        }
    }
})
tLinks.onclick = function (e) {
    e.stopPropagation()
}
