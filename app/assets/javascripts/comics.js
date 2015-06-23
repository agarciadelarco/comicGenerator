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


	$("#title").on("click", function(){
		$(this).text("");
	});

	$(".scene").draggable({
    	helper: "clone",
    	revert: "invalid"
    });

    $(".char").draggable({
    	helper: "clone",
    	revert: "invalid"
    });

    $(".bub").draggable({
    	helper: "clone",
    	revert: "invalid"
    });
	
	function addDroppableToPanel(){
	    $(".panel").droppable({
	    	accept: ".scene, .char, .bub",

	    	drop: function(event, ui) {
	    		if ($(ui.draggable).hasClass('scene')){
					var srcImg = $(ui.draggable).clone().attr("src");
					var urlImg = "url("+srcImg+")";
				  	$(this).css("background-image", urlImg);
				  	
				}else if($(ui.draggable).hasClass('char')){
	    			$newChar = $(ui.draggable).clone()
	    			$(this).append($newChar);
			    	$newChar.toggleClass("char");
			    	$newChar.addClass("characterClone");
			    	var currentPanel = $(this)
	    			$newChar.draggable();
	    			$newChar.append("<button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
	    			$("#page").on("click", ".close", function(){
						$(this).parent().remove()
					});
				}else{
					$newBub = $(ui.draggable).clone()
	    			$(this).append($newBub);
			    	$newBub.toggleClass("bub");
			    	$newBub.addClass("bubbleClone");
			    	var currentPanel = $(this)
	    			$newBub.draggable();
	    			$newBub.append("<button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
	    			$("#page").on("click", ".close", function(){
						$(this).parent().remove()
					});
				}
	    	}
	    });
	};

});
