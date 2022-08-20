var mymap = L.map('mapid', { zoomControl: false }).setView([52, 19.4], 6);
let points = [];
let activepointindex = 0;
let activePoint = {};
let cruddata = {};

mymap.on('click', onMapClick);

function generateMap() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia29yZGl4IiwiYSI6ImNrNXM3YnN6cDBqZmozb211eGwxNjhzZGQifQ.UNDwB32m1pAfiBVBrkW4Qg'
    }).addTo(mymap);

}

async function getData() {
    await fetch('/api/read.php').then((res) => res.json()).then((res) => { points = res })
    drawPoints();
}


function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);

}

function showPosition(position) {
    document.querySelector('#inputx').value = position.coords.latitude;
    document.querySelector('#inputy').value = position.coords.longitude;

}

function drawPoints() {
    mymap.eachLayer((layer) => {
        layer.remove();
    });
    generateMap();



    for (let point of points) {

        let rediconsets = {
            iconUrl: 'redmarker.webp',
            iconSize: [38, 38], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        }

        if (point.index == activepointindex) {
            L.Icon.Default.prototype.options.iconSize = [45, 61];
            L.Icon.Default.prototype.options.iconAnchor = [20, 61];
            rediconsets.iconSize = [50, 50];
            rediconsets.iconAnchor = [25, 50];

        } else {
            L.Icon.Default.prototype.options.iconSize = [25, 41];
            L.Icon.Default.prototype.options.iconAnchor = [12, 41];
            rediconsets.iconSize = [40, 40];
            rediconsets.iconAnchor = [20, 40];

        }

        var redmarkerIcon = L.icon(rediconsets);


        let objectl = {}
        if (!point.photos) {
            objectl = L.marker([point.x, point.y]);
        } else if (point.photos.length == 0) {
            objectl = L.marker([point.x, point.y]);
        }
        else {
            objectl = L.marker([point.x, point.y], { icon: redmarkerIcon });

        }
        objectl.addTo(mymap)
        objectl.index = point.index;
        objectl.on('click', function () {
            activepointindex = objectl.index
            drawPoints();
            generateMiejsce();

        })


    }
}


function onMapClick(e) {
    document.querySelector('#inputx').value = e.latlng.lat;
    document.querySelector('#inputy').value = e.latlng.lng;
    alert("Doałeś punkt o koordynatach " + e.latlng);
}




function generateMiejsce() {
    activePoint = points.find((el) => el.index == activepointindex);
    document.querySelector('#activepointindex').innerHTML = activepointindex;
    document.querySelector('#miejsce').classList.remove('hide');

    galleryimages = activePoint.photos;
    generateGallery();

}


function add() {
    cruddata.x = document.querySelector('#inputx').value
    cruddata.y = document.querySelector('#inputy').value 
    cruddata.index = document.querySelector('#inputindex').value;
    points.push(cruddata);
    save();

    activepointindex = points[points.length - 1].index;
    self.drawPoints();
}



async function save() {
    let poststring = JSON.stringify(points);

    await axios.post('api/save.php', { tekst: poststring });

    getData();

}

async function submitupload() {
    let nextphoto = 999;

    let activePoint = points.find((el) => el.index == activepointindex);

    if (!activePoint.photos) {
        activePoint.photos = []
    }


    if (activePoint.photos) {
        if (activePoint.photos.length == 0) {
            nextphoto = 1
        } else {
            nextphoto = activePoint.photos.length + 1;
        }
    } else {
        nextphoto = 1;
    }

    let photoadd = '/uploads/' + activePoint.index + nextphoto + '.jpg';

    points.find((el) => el.index == activepointindex).photos.push(photoadd);
    save();

    // document.getElementById("uploadform").action = 'api/upload.php?nazwapliku=' + this.activepointindex + nextphoto;
    // document.getElementById("uploadform").submit();

    const avatar = document.querySelector('#fileToUpload');
    const formData = new FormData();
    formData.append('image', avatar.files[0]);
    try {
        const response = await fetch('api/upload2.php?nazwapliku=' + activepointindex + nextphoto, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
    } catch (e) {

    }

    generateMiejsce();

}

function removePhoto(index) {
    points.find((el) => el.index == activepointindex).photos.splice(index, 1);
    save();
    getData();
    generateMiejsce();
}

generateMap();
getData();