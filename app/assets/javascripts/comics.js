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

				$(".panelRow").eq(i).append("<div class='panel'></div>");

			};			

		};

		$(".panel").css('height', panelHeight);
		addDroppableToPanel();
	});

	$("#remove").on("click", function removeElements(){
		
	});


	$("#title").on("click", function(){
		$(this).text("");
	});

	$(".scene").draggable({
    	helper: "clone",
    	revert: "invalid"
    });

    $(".character").draggable({
    	helper: "clone",
    	revert: "invalid"
    });

    $(".bubble").draggable({
    	helper: "clone",
    	revert: "invalid"
    });
	
	function addDroppableToPanel(){
	    $(".panel").droppable({
	    	accept: ".scene, .character, .bubble",

	    	drop: function(event, ui) {
	    		if ($(ui.draggable).hasClass('scene')){
					var srcImg = $(ui.draggable).clone().attr("src");
					var urlImg = "url("+srcImg+")";
				  	$(this).css("background-image", urlImg);
				  	
				}else if($(ui.draggable).hasClass('character')){
	    			$newChar = $(ui.draggable).clone()
	    			$(this).append($newChar);
			    	$newChar.toggleClass("character");
			    	$newChar.addClass("characterClone");
			    	var currentPanel = $(this)
	    			$newChar.draggable();
	    		
				}else{
					$newBub = $(ui.draggable).clone()
	    			$(this).append($newBub);
			    	$newBub.toggleClass("bubble");
			    	$newBub.addClass("bubbleClone");
			    	var currentPanel = $(this)
	    			$newBub.draggable();
	    			
				}
	    	}
	    });
	};

});
