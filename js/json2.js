/**
 * Created by Denis on 14.04.2016.
 */
'use strict';


var arrPhotoes;
var tmplElement = document.getElementById("picture-template");

//1. Получить массив с фото

var xhr = new XMLHttpRequest();

xhr.open('GET', 'data/pictures.json');

xhr.timeout = 10000;

xhr.onload= function(evt){

//  arrPhotoes = JSON.parse(arr.srcElement.response);
  //arrPhotoes = arr.srcElement.response;
  // console.log(arrPhotoes);
  getPhotoes(JSON.parse(evt.srcElement.response))

};

xhr.send();


function getPhotoes(photoes) {

  //console.log(photoes);
  getElementsFromPhoto(photoes);
  return photoes;

}


function getElementsFromPhoto(photoes) {

  arrPhotoes = photoes.forEach(function(element){

    //console.log(tmplElement.content.children[0]);

    var node = tmplElement.content.children[0].cloneNode(true);
    tmplElement.appendChild(node);
    setContentIntoNodes(node, element);

  });

}


function setContentIntoNodes(node, element){

  console.log(element);

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







