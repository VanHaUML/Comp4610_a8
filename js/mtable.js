/*
	 File: https://vanhauml.github.io/Comp4610_a8/js/mtable.js
     Assignment 8: Using the jQuery UI Slider and Tab Widgets
	 Course: COMP4610 GUI I
	 Name: Van Ha, Senior UMass Lowell EE/CS Student
	 Email: van_ha@student.uml.edu
	 Copyright 2018 by Van Ha
	 Date Updated: 12/04/2018

    Javascript file for Interactive Dynamic Table page with
    jQuery Validation plugin, jQuery UI Slider, and jQuery Tab Widget.

*/

/* Adds multiplcation table to tabs. Not working right. Can add tabs
   and content but all content is shown and can't select tabs.
   Remove doesn't work right either.
   Handout was referenced for these, especially the remove function.
   */
var totalTabs = 0;
function addTab() {
  if ($("#multiplicationTableForm").valid()) {
    var numTab = $("tabs li").length + 1;
    totalTabs = totalTabs + 1;
    var xLow = parseInt(document.getElementById("lowColVal").value);
    var xHigh = parseInt(document.getElementById("highColVal").value);
    var yLow = parseInt(document.getElementById("lowRowVal").value);
    var yHigh = parseInt(document.getElementById("highRowVal").value);

    $("<li><a href='#t'" + numTab + ">" + xLow + " " + xHigh + " " + yLow + " "
    + yHigh + "</a></li>").appendTo("#tabs ul");

    $($("#table").html()).appendTo("#tabs");
    $("#tabs").tabs("refresh");
  }
}

function tabRemove() {
  $("#tabs").tabs("remove", parseInt($("tabRemove").val()));
}

// validates input of form to be integers only
$(document).ready(function() {
  // additional methods used to make sure low values are less than or equal to high values
  $.validator.addMethod("less_than_equal_to", function(value, element, param) {
    if ($(param).val() == "") {
      return true;
    }
    return parseInt(value) <= parseInt($(param).val());
  });

  $.validator.addMethod("greater_than_equal_to", function(
    value,
    element,
    param
  ) {
    if ($(param).val() == "") {
      return true;
    }
    return parseInt(value) >= parseInt($(param).val());
  });

  /* Two way binding of slider and input elements.
     Changes in one element will change the other.
     Multiplcation table automatically is validated and
     updated if form is valid. Code based on example found
     on Stackoverflow.

     Source: https://stackoverflow.com/questions/7523864/ui-slider-with-text-box-input#
  */
  $("#lowColValSlider").slider({
    min: -10,
    max: 10,
    step: 1,
    value: 0,
    slide: function(event, ui) {
      $("#lowColVal").val(ui.value);
      validate();
    }
  });

  $("#lowColVal").change(function() {
    var val = $(this).val();
    $("#lowColValSlider").slider("value", parseInt(val));
    validate();
  });

  $("#highColValSlider").slider({
    min: -10,
    max: 10,
    step: 1,
    value: 0,
    slide: function(event, ui) {
      $("#highColVal").val(ui.value);
      validate();
    }
  });

  $("#highColVal").change(function() {
    var val = $(this).val();
    $("#highColValSlider").slider("value", parseInt(val));
    validate();
  });

  $("#lowRowValSlider").slider({
    min: -10,
    max: 10,
    step: 1,
    value: 0,
    slide: function(event, ui) {
      $("#lowRowVal").val(ui.value);
      validate();
    }
  });

  $("#lowRowVal").change(function() {
    var val = $(this).val();
    $("#lowRowValSlider").slider("value", parseInt(val));
    validate();
  });

  $("#highRowValSlider").slider({
    min: -10,
    max: 10,
    step: 1,
    value: 0,
    slide: function(event, ui) {
      $("#highRowVal").val(ui.value);
      validate();
    }
  });

  $("#highRowVal").change(function() {
    var val = $(this).val();
    $("#highRowValSlider").slider("value", parseInt(val));
    validate();
  });

  $("#tabs").tabs();
  
  /* validation of form inputs*/
  $("#multiplicationTableForm").validate({
    rules: {
      lowColVal: {
        required: true,
        integer: true,
        min: -10,
        max: 10,
        less_than_equal_to: "#highColVal"
      },
      highColVal: {
        required: true,
        integer: true,
        min: -10,
        max: 10,
        greater_than_equal_to: "#lowColVal"
      },
      lowRowVal: {
        required: true,
        integer: true,
        min: -10,
        max: 10,
        less_than_equal_to: "#highRowVal"
      },
      highRowVal: {
        required: true,
        integer: true,
        min: -10,
        max: 10,
        greater_than_equal_to: "#lowRowVal"
      }
    },
    /* error messages for invalid input fields */
    messages: {
      lowColVal: {
        required: "This field is required.",
        integer: "Enter an integer for the low column value.",
        min: "Minimum value is -10.",
        max: "Maximum value is 10.",
        less_than_equal_to: "Value must be lower than high value."
      },
      highColVal: {
        required: "This field is required.",
        integer: "Enter an integer for the high column value.",
        min: "Minimum value is -10.",
        max: "Maximum value is 10.",
        greater_than_equal_to: "Value must be greater than low value."
      },
      lowRowVal: {
        required: "This field is required.",
        integer: "Enter an integer for the low row value.",
        min: "Minimum value is -10.",
        max: "Maximum value is 10.",
        less_than_equal_to: "Value must be lower than high value."
      },
      highRowVal: {
        required: "This field is required.",
        integer: "Enter an integer for the high row value.",
        min: "Minimum value is -10.",
        max: "Maximum value is 10.",
        greater_than_equal_to: "Value must be greater than low value."
      }
    },
    errorElement: "div"
  });
});

/* validates form and creates table if valid */
function validate() {
  if ($("#multiplicationTableForm").valid()) {
    makeTable();
  }
}

/* creates multiplication table */
function makeTable() {
  var xLow = parseInt(document.getElementById("lowColVal").value);
  var xHigh = parseInt(document.getElementById("highColVal").value);
  var yLow = parseInt(document.getElementById("lowRowVal").value);
  var yHigh = parseInt(document.getElementById("highRowVal").value);

  clearAll();
  var addition = "";

  addition += "<table>";
  for (var i = yLow - 1; i <= yHigh; i++) {
    addition += "<tr>";

    for (var j = xLow - 1; j <= xHigh; j++) {
      if (i < yLow && j < xLow) {
        addition += "<th></th>";
      } else if (i < yLow) {
        addition += "<th>" + j + "</th>";
      } else if (j < xLow) {
        addition += "<th>" + i + "</th>";
      } else {
        addition += "<td>" + i * j + "</td>";
      }
    }

    addition += "</tr>";
  }
  addition += "</table>";
  writeOut(addition);
}

/* writes to HTML file */
function writeOut(add) {
  document.getElementById("table").innerHTML = add;
}

/* clears section of HTML javascript writes to*/
function clearAll() {
  writeOut("");
}
