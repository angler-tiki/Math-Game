var playing = false;
var score;
var action;
var timeleft;
var correctAnswer;

// Click on Start/Reset Button
document.getElementById('startreset').onclick = function(){
	// If Playing
	if(playing == true){
		location.reload(); // Reload Page
	}	else {
		// If Not Playing

		// Change Mode to Play
		playing = true;
			// Set Score to Zero
			score = 0;
			document.getElementById("scorevalue").innerHTML = score; 

			// Show Countdown Box
			show("timeleft");
				timeleft = 60;
				document.getElementById("timeleftvalue").innerHTML = timeleft;	

				// Hide Game Over Box
				hide("game-over");

		// Change Button to Reset
		document.getElementById("startreset").innerHTML = "<b>Reset</b>";

		// Start Countdown
		startCountdown();

		// Generate New Q&A
		generateQA();
	}
}

// Click on Answer Box
for(i=1; i<5; i++){
	document.getElementById("box"+i).onclick = function(){
	// Check if playing
	if(playing == true){
		// Yes?
		if(this.innerHTML == correctAnswer){
			// Correct Answer?
			// Increase Score by 1
			score++;
			
			document.getElementById("scorevalue").innerHTML = score;

			// Hide Wrong Box and Show Correct Box
			hide("wrong");
			show("correct");
			setTimeout(function(){
				hide("correct");
			}, 1000);

			// Generate New Q&A
			generateQA();

		} else {
			// Wrong Answer?
			hide("correct");
			show("wrong");
			setTimeout(function(){
				hide("wrong");
			}, 1000);
		}
	}
}
}



// Functions

// Start Countdown
function startCountdown(){
	action = setInterval(function(){
		timeleft -=1;
		document.getElementById("timeleftvalue").innerHTML = timeleft;
			if(timeleft == 0){
				// Game Over
				stopCountdown();
					show("game-over");
					document.getElementById("game-over").innerHTML = "<p><b>game over!</b></p><p>score: <i><b>" + score + "</b></i></p>";
					hide("timeleft");
					hide("correct");
					hide("wrong");
					document.getElementById("startreset").innerHTML = "<b>Start</b>";
					playing = false;
			}
	}, 1000);
}

// Stop Countdown
function stopCountdown(){
	clearInterval(action);
}

// Hide Elements
function hide(Id){
	document.getElementById(Id).style.display = "none";
}

// Show Elements
function show(Id){
	document.getElementById(Id).style.display = "block";
}

// Generate Q&A
function generateQA(){
	var x = 1+ Math.round(9*Math.random());
	var y = 1+ Math.round(9*Math.random());
	correctAnswer = x*y;
		// Channge Inner HTML of Q&A
		document.getElementById("question").innerHTML = x + "x" + y;

		// Choose Random Location for Correct Answer
		var correctPosition = 1+ Math.round(3*Math.random());
			// Fill One Box with Correct Answer
			document.getElementById("box"+correctPosition).innerHTML = correctAnswer; 

			// Fill Three Boxes with Wrong Answers
			var answers = [correctAnswer];

			for(i=1; i<5; i++){
				// Check if it is NOT the correct box
				if(i != correctPosition){
					// Wrong Answer
					var wrongAnswer;
					do{
						// Generate Wrong Answers
						wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random()));
					} while (answers.indexOf(wrongAnswer)>-1) // Locate Correct Box
					document.getElementById("box"+i).innerHTML = wrongAnswer;
						answers.push(wrongAnswer);
				}
			}
}