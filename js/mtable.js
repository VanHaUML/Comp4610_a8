/*
	 File: https://vanhauml.github.io/Comp4610_a8/js/mtable.js
   Assignment 8: Using the jQuery UI Slider and Tab Widgets
	 Course: COMP4610 GUI I
	 Name: Van Ha, Senior UMass Lowell EE/CS Student
	 Email: van_ha@student.uml.edu
	 Copyright 2018 by Van Ha
	 Date Updated: 12/15/2018

    Javascript file for Interactive Dynamic Table page with
    jQuery Validation plugin, jQuery UI Slider, and jQuery Tab Widget.

*/

/* Adds multiplcation table to tabs. Capable of removing a single tab
   with close icon on each tab.
   Handout was referenced for these, especially the remove function.
   Other sources listed in comments.
   */

var totalTabs = 0;
// Adds a tab with current table as its content
function addTab() {
  if ($("#multiplicationTableForm").valid()) {
    if (totalTabs == 0) {
      totalTabs = $("#tabsList li").length + 1;
    }
    else {
      totalTabs++;
    }
    
    var xLow = parseInt(document.getElementById("lowColVal").value);
    var xHigh = parseInt(document.getElementById("highColVal").value);
    var yLow = parseInt(document.getElementById("lowRowVal").value);
    var yHigh = parseInt(document.getElementById("highRowVal").value);

    $("<li id='lt" + totalTabs + "'><a href='#t" + totalTabs + "'>t" + totalTabs + ": " + xLow + " " + xHigh + " " + yLow + " "
    + yHigh + "</a> <span class='ui-icon ui-icon-close' role='presentation'></span> </li>").appendTo("#tabsList");

    var tabContent = $("#tableDiv").html();
    tabContent = "<div id='t" + totalTabs + "'>" + tabContent + "</div>";
    $(tabContent).appendTo("#tabs");
    $("#tabs").tabs("refresh");
    $("#tabs").tabs("option", "active", -1);

    /* Close icon on tabs. Based on example found at the following link.
       https://jqueryui.com/tabs/#manipulation
    */
    $("#tabs").on( "click","span.ui-icon-close", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      $("#cb" + panelId).remove();
      $("#tabs").tabs( "refresh" );
    });

    addCheckbox(totalTabs);
  }
}

// Removes checked tabs
function removeTabs() {
  $("input[type=checkbox]:checked").each(function(){
    var cbVal = $(this).val();
    $("#" + cbVal).remove();
    $("#l" + cbVal).remove();
    $("#cb" + cbVal).remove();
    $("#tabs").tabs( "refresh" );
  })
}

// Adds checkbox for tab deletion
function addCheckbox (num) {
  var newCB = "<div class = 'cbDiv' id='cbt" + num + "'><input type='checkbox' id='c" + num + "' name='" + num + "' value='t" + num + "'>" + 
              "<label for='c" + num + "'>t" + num + "</label></div>";
  $(newCB).appendTo("#cbFieldset");
}


// Resets the page. Naming the function resetPage caused an error.
function reloadPage() {
  location.reload();
}

// Validates input of form to be integers only
$(document).ready(function() {
  // Additional methods used to make sure low values are less than or equal to high values
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

  
  // Validation of form inputs
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
    // Error messages for invalid input fields
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

  $("#tabs").tabs();

});

// Validates form and creates table if valid
function validate() {
  if ($("#multiplicationTableForm").valid()) {
    makeTable();
  }
}

// Creates multiplication table
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

// Writes to HTML file
function writeOut(add) {
  document.getElementById("tableDiv").innerHTML = add;
}

// Clears section of HTML javascript writes to
function clearAll() {
  writeOut("");
}
