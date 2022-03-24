import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './services/bike-service.js';

function clearFields() {
  $('#searchKey').val("");
  $('.showImages').text("");
  $('.showResults').text("");
  $('.showErrors').text("");
}


function getElements(response) {
  for (let i = 0; i < response.bikes.length; i++) {
  if (response.bikes[i].frame_model) {
    $('.showResults').append(`--${response.bikes[i].frame_model}<img src="${response.bikes[i].large_img}"><br>`);
    // $('.showImages').append(`<img src="${response.bikes[i].large_img}"><br>`);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response.message}`);
  }
}}

$(document).ready(function() {
  $('#enterSearch').click(function() {
    const keyword = $('#searchKey').val();
    const color = $("input:radio[name=color]:checked").val();
    clearFields();
    BikeService.getBike(keyword, color)
    .then(function(response) {
      getElements(response);
    });
  });
});



