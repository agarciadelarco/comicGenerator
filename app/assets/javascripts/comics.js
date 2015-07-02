$(document).ready(function(){

	var isDestroyingClick = false;
	var clickedTab = $(".tabs > .active");
	var tabWrapper = $(".tab__content");
	var activeTab = tabWrapper.find(".active");
	var activeTabHeight = activeTab.outerHeight();
	
	activeTab.show();
	
	tabWrapper.height(activeTabHeight);

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
					"<select id='columns"+i+"' class='form-control'>" +
						"<option value='1'>1</option>" +
						"<option value='2'>2</option>" +
						"<option value='3'>3</option>" +
						"<option value='4'>4</option>" +
					"</select>" +
				"</div><br>");
		};

		$("#panelContainer").append("<button id='submitPanels' class='btn btn-primary'>Gimme panels!</button>");

		$(".panelRow").css('height', panelHeight);
	});

	$("#left").on("click", "#submitPanels", function() {

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

	$(".tabs > li").on("click", function() {
		
		// Remove class from active tab
		$(".tabs > li").removeClass("active");
		
		// Add class active to clicked tab
		$(this).addClass("active");
		
		// Update clickedTab variable
		clickedTab = $(".tabs .active");
		
		// fade out active tab
		activeTab.fadeOut(100, function() {
			
			// Remove active class all tabs
			$(".tab__content > li").removeClass("active");
			
			// Get index of clicked tab
			var clickedTabIndex = clickedTab.index();

			// Add class active to corresponding tab
			$(".tab__content > li").eq(clickedTabIndex).addClass("active");
			
			// update new active tab
			activeTab = $(".tab__content > .active");
			
			// Update variable
			activeTabHeight = activeTab.outerHeight();
			
			// Animate height of wrapper to new tab height
			tabWrapper.stop().delay(1).animate({
				height: activeTabHeight
			}, 1, function() {
				
				// Fade in active tab
				activeTab.delay(1).fadeIn(1);
				
			});
		});
	});
	
	// Variables
	var colorButton = $(".colors li");
	
	colorButton.on("click", function(){
		
		// Remove class from currently active button
		$(".colors > li").removeClass("active-color");
		
		// Add class active to clicked button
		$(this).addClass("active-color");
		
		// Get background color of clicked
		var newColor = $(this).attr("data-color");
		
		// Change background of everything with class .bg-color
		$(".bg-color").css("background-color", newColor);
		
		// Change color of everything with class .text-color
		$(".text-color").css("color", newColor);
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

	$("#remove").on("click", function removeElements(){
		isDestroyingClick = !isDestroyingClick;
		console.log("Borrar", isDestroyingClick);
		if (isDestroyingClick){
			$('body').css("cursor", "url('/boma.png'), auto");
			$('#eraser').append("<div id='eraseMessage'>To stop deleting things just push me again</div>");
		}else{
			$('body').css("cursor", "default");
			$('#eraseMessage').remove();
		}
	});

	$("#page").on("click", ".panel", function(e){
		if(isDestroyingClick)
			$(this).css("background-image", "none");
		e.stopPropagation();
	});

	$("#page").on("click", ".characterClone", function(e){
		if(isDestroyingClick)
			$(this).remove()
		e.stopPropagation();
	});

	$("#page").on("click", ".bubbleClone", function(e){
		if(isDestroyingClick)
			$(this).remove()
		e.stopPropagation();
	});

	$("#genComic").on("click", function(){
		html2canvas($("#page"), {
		  	onrendered: function(canvas) {
		  		var img = canvas.toDataURL("image/png");
		  		var open = window.open("","","width=400, height=600");
		  		open.document.write("<div><img id='img'></div><a href='/path/to/image.png' download='AwesomeImage.png'><button id='saveComic' class='btn btn-primary'>Save Comic!</button></a>");
		  		open.document.getElementById('img').setAttribute("src", img);
  			}
		});
	})

});


