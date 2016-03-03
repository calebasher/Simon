$(document).ready(function(){

	var buttonArray =[];
	var gameReady = false;
	var counter = 1;
	var buttonPresses = 0;
	var j = 0;
	var sounds = {"1": "https://s3.amazonaws.com/freecodecamp/simonSound1",
				  "2": "https://s3.amazonaws.com/freecodecamp/simonSound2", 
				  "3": "https://s3.amazonaws.com/freecodecamp/simonSound3", 
				  "4": "https://s3.amazonaws.com/freecodecamp/simonSound4"
	};

	function generateArray(){
		for(i=0;i<20;i++){
			var randomButton = Math.floor(Math.random() * 4 + 1);
			buttonArray.push(randomButton);
		}
		console.log(buttonArray);
	}

	function cycleColor() {
	$('#btn'+buttonArray[j-1]+'').toggleClass("regularColor"+buttonArray[j-1]+"");
	$('#btn'+buttonArray[j-1]+'').toggleClass("lightenColor"+buttonArray[j-1]+"");
	$('#btn'+buttonArray[j]+'').toggleClass("regularColor"+buttonArray[j]+"");
	$('#btn'+buttonArray[j]+'').toggleClass("lightenColor"+buttonArray[j]+"");
	}

	$('.bigbtn').click(function(){
	
		console.log("whatyoupressed:"+this.id);
		console.log("buttonArray[buttonPresses]"+"btn"+buttonArray[buttonPresses]);
		console.log(buttonPresses);

		if (this.id === "btn"+buttonArray[buttonPresses] && gameReady === true){
			console.log("matched!");
			$.playSound(sounds[buttonArray[buttonPresses]]);
			buttonPresses++;
			console.log("presses:"+buttonPresses);

			if (buttonPresses == 20) {
				$.playSound("http://www.soundjay.com/human/applause-01");
				gameReady = false;
				$('#counterFont').html(':)');
			}
			else if (buttonPresses == counter) {
				counter++;
				$('#counterFont').html(counter);
				buttonPresses = 0;
				playback();		
			}	
		}
		else if (this.id !== "btn"+buttonArray[buttonPresses] && gameReady === true) {
			console.log("did not match!");
			buttonPresses = 0;
			$.playSound("http://www.soundjay.com/misc/fail-buzzer-04");
			playback();
		}
	});

	function playback() {
		console.log('nothing');
		console.log(j);
		if (j == 0) {
			console.log('playBack1 success!');
			$('#btn'+buttonArray[j]+'').toggleClass("regularColor"+buttonArray[j]+"");
			$('#btn'+buttonArray[j]+'').toggleClass("lightenColor"+buttonArray[j]+"");
			$.playSound(sounds[buttonArray[j]]);
			j++;
			setInterval(function(){		
				playBack();	
			}, 1000);
		}

		else if (j < counter) {
			console.log('playBack2 success!');
			cycleColor()
			$.playSound(sounds[buttonArray[j]]);
			j++;
			setInterval(function(){		
				playBack();	
			}, 1000);
		}

		else if (j == counter) {
			console.log('playBack3 success!');
			clearInterval(setInterval(function(){playBack();}, 1000));
			j = 0;
		}	
	}

	$('#switchButton').click(function(){

		$(this).toggleClass("on");
		$('#counterFont').toggleClass("red");
		buttonArray=[];
		counter = 1;
		gameReady = false;
		$('#counterFont').html('--');
		generateArray();

		$('#startButton').click(function(){
			playback();
			gameReady = true;
			$('#counterFont').html(counter);	
		});

	});

});
