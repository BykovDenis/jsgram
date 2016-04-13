/**
 * Created by Denis on 13.04.2016.
 */

'use strict'

/* Работа с валидацией формы */

var formHotel = document.forms['frmHotel'];

var dateFrom = formHotel['dateFr'];
var dateTo = formHotel['dateTo'];

var date = new Date(Date.now());


dateFrom.value = "2016-04-01";
dateTo.value = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay();

var cntPeople = formHotel['cntPeople'];
var cntNumber = formHotel['cntNumber'];

cntPeople.value = 2;
cntNumber.value = 1;
