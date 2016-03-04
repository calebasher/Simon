$(document).ready(function(){

	var buttonArray =[];
	var gameReady = false;
	var strict = false;
	var counter = 1;
	var buttonPresses = 0;
	var j = 0;
	var sounds = {"1": "https://s3.amazonaws.com/freecodecamp/simonSound1",
				  "2": "https://s3.amazonaws.com/freecodecamp/simonSound2", 
				  "3": "https://s3.amazonaws.com/freecodecamp/simonSound3", 
				  "4": "https://s3.amazonaws.com/freecodecamp/simonSound4"
	};

	function generateArray(){
		buttonArray = [];
		for(i=0;i<20;i++){
			var randomButton = Math.floor(Math.random() * 4 + 1);
			buttonArray.push(randomButton);
		}
	}

	function cycleColor() {
		$('#btn'+buttonArray[j]+'').toggleClass("regularColor"+buttonArray[j]+"");
		$('#btn'+buttonArray[j]+'').toggleClass("lightenColor"+buttonArray[j]+"");
		setTimeout(function(){
			$('#btn'+buttonArray[j-1]+'').toggleClass("regularColor"+buttonArray[j-1]+"");
			$('#btn'+buttonArray[j-1]+'').toggleClass("lightenColor"+buttonArray[j-1]+"");
		}, 1500);
	}

	function playback() {
	
		if (j == 0) {
			console.log('playBack1 fired');
			cycleColor();
			$.playSound(sounds[buttonArray[j]]);
			j++;
			setTimeout(function(){	
				playback();
			}, 2000);
		}

		else if (j < counter) {
			console.log('playBack2 fired');
			cycleColor();
			$.playSound(sounds[buttonArray[j]]);
			j++;
			setTimeout(function(){
				playback();
			}, 2000);
		}

		else if (j == counter) {
			console.log('playBack3 fired');
			j = 0;
		}	
	}

		$('.bigbtn').click(function(){

		if (this.id === "btn"+buttonArray[buttonPresses] && gameReady === true){

			$.playSound(sounds[buttonArray[buttonPresses]]);
			buttonPresses++;

			if (buttonPresses == 20) {
				$.playSound("http://www.soundjay.com/human/applause-01");
				gameReady = false;
				$('#counterFont').html(':)');
			}
			else if (buttonPresses == counter) {
				counter++;
				$('#counterFont').html(counter);
				buttonPresses = 0;
				setTimeout(function(){
					playback();
				}, 2000);			
			}	
		}
		else if (this.id !== "btn"+buttonArray[buttonPresses] && gameReady === true) {

			if (strict === true) {
				$.playSound("http://www.freesfx.co.uk/rx2/mp3s/5/5612_1335272419");
				generateArray();
				buttonPresses = 0;
				counter = 1;
				$('#counterFont').html('--');
			}

			else { 
				buttonPresses = 0;
				$.playSound("http://www.freesfx.co.uk/rx2/mp3s/5/5612_1335272419");
				setTimeout(function(){
						playback();
				}, 2000);
			}
		}
	});

	$('#switchButton').click(function(){

		$(this).toggleClass("on");
		$('#counterFont').toggleClass("red");
		counter = 1;
		buttonPresses = 0;
		gameReady = false;
		if (strict === true) {
			strict = false; 
			$('#strictLight').css("background-color", "#421717"); 
		} 
		$('#counterFont').html('--');
		generateArray();
		console.log(buttonArray);	

		$('#startButton').click(function(){
			playback();
			gameReady = true;
			$('#counterFont').html(counter);
		});

		$('#strictButton').click(function(){
			
			if (strict === false) {
				strict = true;
				$('#strictLight').css("background-color", "red");
			}
			else if (strict === true) {
				strict = false;
				$('#strictLight').css("background-color", "#421717");
			}
		});

	});

});
