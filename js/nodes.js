/**
 * Created by Denis on 14.04.2016.
 */
'use strict';

var container = document.getElementById('container');

/*


 var firstChild = document.createElement('div');


firstChild.className  ='child';
firstChild.innerText = 'Первый дочерний элемент';

container.appendChild(firstChild);

var secondChild = document.createElement('div');

secondChild.className  ='child';
secondChild.innerText = 'Второй дочерний элемент';

container.insertBefore(secondChild, firstChild);*/

pictures.forEach(function (pictures) {

  var element = getElementFromTemplate(pictures);
  container.appendChild(element);

})

/**
 * @param {Object} data
 * @return {Element}
 */
function getElementFromTemplate(data){

  var template = document.querySelector('#picture-template');
  var element = template.content.children[0].cloneNode(true);

  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;

  var img = new Image();

  img.onload = function(){

    element.style.backgroundImage = 'url(http://localhost:8080/keksogram/'+img.src+')';

  };

  img.src = 'http://localhost:8080/keksogram/'+data.url;


  return element;

}
