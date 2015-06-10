$(document).ready(function(){

	$("#submitRows").on("click", function() {

		$('#pageContent').empty();

		$('#panelContainer').empty();

		var numberOfRows = parseInt($('#rows').val());

		var panelHeight = ($("#pageContent").height() / numberOfRows);

		for (var i = 0; i < numberOfRows; i++){

			$("#pageContent").append("<div id='panelRow" + i + "' class='panelRow'></div>");

			$("#panelContainer").append(
				"<div id='choosePanels'>"+
					"<label for='columns'>Number of panels in row number " +(i + 1)+ "</label><br>"+
					"<select id='columns"+i+"'>" +
						"<option value='1'>1</option>" +
						"<option value='2'>2</option>" +
						"<option value='3'>3</option>" +
						"<option value='4'>4</option>" +
					"</select>" +
				"</div>");
		};

		$("#panelContainer").append("<button id='submitPanels'>Gimme panels!</button>");

		$(".panelRow").css('height', panelHeight);
	});

	$("#parameters").on("click", "#submitPanels", function() {

		$('.panelRow').empty();

		var panelHeight = ($(".panelRow").height())-5;

		for (var i = 0; i< $(".panelRow").size(); i++) {

			var numberOfPanels = $('#columns'+i).val();

			for (var j = 0; j < numberOfPanels; j++){

				$(".panelRow").eq(i).append("<div class='panel'><p></p></div>");

				var panelWidth = ($(".panelRow").width() / numberOfPanels)-5;
				$(".panel").css('width', panelWidth);

			};			

		};

		$(".panel").css('height', panelHeight);
		addDroppableToPanel();
	});


	$("#title").on("click", function(){
		$(this).text("");
	});

	$( ".scene" ).draggable({
	    	helper: "clone",
	    	revert: "invalid"
	    });
	
	function addDroppableToPanel() {
		console.log("funcionó!")

	    $( ".panel" ).droppable({
	    	drop: function( event, ui ) {
	    		$(this).find("p");
	    	}
	    });
	}


});
