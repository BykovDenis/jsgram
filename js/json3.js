/**
 * Created by Denis on 21.04.2016.
 */
/**
 * Created by Denis on 14.04.2016.
 */
'use strict';


var arrPhotoes;
var tmplElement = document.getElementById("picture-template");
var PHOTO_PER_PAGE = 6;
var numberPage = 0;
var photoes = [];
var replace;
var TIME_OUT = 100;

//1. Получить массив с фото

var xhr = new XMLHttpRequest();

xhr.open('GET', 'data/pictures.json');

xhr.timeout = 10000;

xhr.onload= function(evt){

  photoes = JSON.parse(evt.srcElement.response)
  getPhotoes(photoes,numberPage);

};

xhr.send();

var scrollTime

// определяем текущую страницу на сайте
window.addEventListener('scroll',function () {
  clearTimeout(scrollTime);
  replace = 0;
  scrollTime = setTimeout(function() {

    var footerCoordinate = document.querySelector("footer").getBoundingClientRect();
    var viewportSize = window.innerHeight;

    if (numberPage < Math.ceil(photoes.length / PHOTO_PER_PAGE))
      if (footerCoordinate.bottom - viewportSize < footerCoordinate.height) {
        getPhotoes(photoes, ++numberPage);

      }


  }, TIME_OUT);

});


function getPhotoes(photoes, pageNumber) {

  var photoFrom = pageNumber * PHOTO_PER_PAGE;
  var photoTo = photoFrom + PHOTO_PER_PAGE;

  getElementsFromPhoto(photoes.slice(photoFrom, photoTo));
  return photoes;

}


function getElementsFromPhoto(photoes) {

  if(replace > 0) {
    tmplElement.innerText = '';
  }

  var fragment = document.createDocumentFragment();

  arrPhotoes = photoes.forEach(function(element){

    var node = tmplElement.content.children[0].cloneNode(true);
    fragment.appendChild(node);
    setContentIntoNodes(node, element);

  });

  tmplElement.appendChild(fragment);

}


function setContentIntoNodes(node, element){

  node.querySelector(".picture-comments").textContent = element.comments;
  node.querySelector(".picture-likes").textContent = element.likes;

  var img = new Image();
  var ONLOAD_TIMEMOUT = 10000;


  var imageLoadTimeOut = setTimeout(function () {
    img.src='';
  }, ONLOAD_TIMEMOUT);


  img.onload = function () {
    clearTimeout(imageLoadTimeOut);
    node.style.backgroundImage = 'url(' + img.src + ')';

  };

  img.src = './' + element.url;

}

var clickableElement = document.querySelectorAll("radio");

for(var i = 0; i < clickableElement.length; i++){

  clickableElement.addEventListener('click', _onClick, true);

}

function _onClick(evt){

  var clicked = document.querySelector('.clicked');
  if(clicked)
      evt.removeEventListener('click');

  evt.classList.add('clicked');

}

var filters = document.querySelector('.filters');

filters.addEventListener('click', function(evt){

  var clickedElement = evt.target;
  if(clickedElement.classList.contains('filters-radio')){

    setActiveFilter(clickedElement.id);

  }

  customEvent();

});


function customEvent(){

  var cst_evt = document.createEvent('CustomEvent');

  cst_evt.initCustomEvent('myEvent', false, false,{});

  window.addEventListener('myEvent', function(){

    console.log('Событие сработало')

  });

  window.dispatchEvent(cst_evt);

}



function setActiveFilter(id){

  replace = 1;
  if(id == 'filter-popular'){
    var subPhotoes = photoes;
    getPhotoes(photoes.splice(4,7),numberPage)
  }

  if(id == 'filter-new'){
    var subPhotoes = photoes;
    getPhotoes(photoes.splice(1,3),numberPage)
  }
  if(id == 'filter-discussed'){
    var subPhotoes = photoes;
    getPhotoes(photoes.splice(6,4),numberPage)
  }

}

