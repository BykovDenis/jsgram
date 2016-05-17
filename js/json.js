/**
 * Created by Denis on 17.04.2016.
 */

/* Блок загрузки  данных из JSON файла */

var pictures = document.querySelector(".pictures");
var arrPictures;

var xhr = new XMLHttpRequest();

xhr.timeout = 10000;

xhr.open("GET","data/pictures.json");

xhr.onload = function (evt) {

  getPictures(JSON.parse(evt.srcElement.response));

};

xhr.send();

/* Отображение картинок */
function getPictures(arrPictures) {

  arrPictures.forEach(function(picture){

    var element = getElementFromTemplate(picture);
    pictures.appendChild(element);

    console.log(element);

  });

}

function getElementFromTemplate(data){

  var tmplPictures = document.getElementById("picture-template");
  var element = tmplPictures.content.children[0].cloneNode(true);

  element.querySelector(".picture-comments").textContent =  data.comments;
  element.querySelector(".picture-likes").textContent =  data.likes;

  var img = new Image();
  var ONLOAD_TIMEMOUT = 10000;


  var imageLoadTimeOut = setTimeout(function () {
    img.src='';
  }, ONLOAD_TIMEMOUT);


  img.onload = function () {
    clearTimeout(imageLoadTimeOut);
    element.style.backgroundImage = 'url(' + img.src + ')';

  };

  img.src = './' + data.url;

  return element;

}

