import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';


$(document).ready(function (){
  $('#btn-addline').click(function(e) {
    $('#cantidadadd').append('      <tr>\n' +
      '        <td>\n' +
      '              <input class="" name="cantidad" id="cantidad" type="text" placeholder="Cantidad" />\n' +
      '        </td>\n' +
      '        <td>\n' +
      '          <textarea class="form-control" name="textarea"></textarea>\n' +
      '        </td>\n' +
      '      </tr>\n');
  });
});
/*
===============================================================

Hi! Welcome to my little playground!

My name is Tobias Bogliolo. 'Open source' by default and always 'responsive',
I'm a publicist, visual designer and frontend developer based in Barcelona.

Here you will find some of my personal experiments. Sometimes usefull,
sometimes simply for fun. You are free to use them for whatever you want
but I would appreciate an attribution from my work. I hope you enjoy it.

===============================================================
*/

$(document).ready(function () {
  $("input").focus(function () {
    $(this).parent().find(".label-txt").addClass("label-active");
  });

  $("input").focusout(function () {
    if ($(this).val() == "") {
      $(this).parent().find(".label-txt").removeClass("label-active");
    }
  });
});


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
