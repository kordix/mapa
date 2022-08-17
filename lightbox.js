/* const images = document.querySelectorAll('.grid > img') */
const grid = document.querySelector(".galeria");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let galleryimages = [
    '/images/IMG_20200606_185100.jpg',
    'https://orig06.deviantart.net/a7cc/f/2009/239/4/5/landscape_view_1_by_love1008.jpg',
    'http://www.notebookstories.com/wp-content/uploads/2013/07/usingnow1.jpg'
]

let currentsrc = '';
let galleryindex = 0;

grid.addEventListener("click", (e) => {
    lightbox.classList.add("active");
    lightboxImg.src = e.target.src;
    galleryindex = parseInt(e.target.getAttribute('num'));


    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.key === "Escape" || evt.key === "Esc") {
            lightbox.classList.remove("active");

        }
    };
});


lightbox.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove("active");
    return;
});

document.querySelector('#gallerynextbutton').addEventListener('click', function () {
    // let currentindex = galleryimages.findIndex(el => el == lightboxImg.src.replace(window.location.origin, '')) + 1;
    galleryindex++;
    console.log(window.location.origin);
    console.log(lightboxImg.src.replace(window.location.origin, ''));

    if (galleryindex >= galleryimages.length) {
        galleryindex = 0;
    }

    lightboxImg.src = galleryimages[galleryindex];


})



function generateGallery() {
    document.querySelector('#galeria').innerHTML = '';
    if (galleryimages) {
        for (let i = 0; i < galleryimages.length; i++) {
            let elem = galleryimages[i];
            document.querySelector('#galeria').innerHTML += /*html*/`<img src="${elem}" class="galleryelem" num="${i}" alt="">`

        }
    }
}

