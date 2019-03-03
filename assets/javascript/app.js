
var gameMins = 3; //using variable mins to make it easy to adjust time limits based on minutes
var gameSecs = gameMins * 60; //in reality timers are only counting in seconds
var questionMins = 1;
var questionSecs = questionMins * 60;
var gameOver = false;

var questionsAnswered = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var totalQuestions = questions.length;
var questionIndex = 0;


function formatTimer(sec){ //take the second count and format it for the timer: 00:00
  var mins = Math.floor(sec / 60);
  var secs = sec % 60;
  return concatZero(mins) + mins + ":" + concatZero(secs) + secs;
}

function concatZero(num){ //if min or sec is 1 - 9 concatinate a 0 in front of it
  if(num < 10){
    return "0";
  }else{
    return "";
  }
}




function onLoad(){
  
	

	function loadQuestion(){

		console.log('question intex',questionIndex);

		$("#question").text(questions[questionIndex].question);
		setTimeout(function(){$("#question").fadeIn("slow")},3000);
		$("#answer-list").append(questions[questionIndex].answer);
		setTimeout(function(){$("#answer-list").fadeIn("slow")},3000);
		correctAnswer = $("li.correct").text();//update correct answer each time

		

		$(".answer").click(function(){
		
			if($(this).hasClass("correct")){
				$("#question").fadeOut("slow");
				$("#answer-list").fadeOut("slow");
				setTimeout(function(){$("#question-box").append("<h2 class='response'>Correct!</h2>");},800);
				setTimeout(function(){$(".response").fadeOut("slow")},2000);
				$("#answer-list").empty();//not emptying will result in the next set of answers being appended to old set
				setTimeout(function(){questionIndex++},1000);
				setTimeout(function(){loadQuestion()},1000);
				if(questionIndex == questions.length - 1){
					endGame();
				}
				correctAnswers++;
			}else if($(this).hasClass("incorrect")){
				$("#question").fadeOut("slow");
				$("#answer-list").fadeOut("slow");
				setTimeout(function(){
					$("#question-box").append("<h2 class='response'>Incorrect!</h2>");
					$("#question-box").append("<h3 class='response'>The correct answer was " + correctAnswer + ".</h3>");
				},800);
				setTimeout(function(){$(".response").fadeOut("slow")},2000);
				$("#answer-list").empty();
				setTimeout(function(){questionIndex++},1000);
				setTimeout(function(){loadQuestion()},1000);
				if(questionIndex == questions.length - 1){
					endGame();
				}
				incorrectAnswers++;
			}else{
				// Else whaaa???
			}

			
		});
		
	}

	function timeOut(){
		$("#question").fadeOut("slow");
				$("#answer-list").fadeOut("slow");
				$("#answer-list").empty();
				setTimeout(function(){
					$("#question-box").append("<h2 class='response'>Time Out!</h2>");
					$("#question-box").append("<h3 class='response'>The correct answer was " + correctAnswer + ".</h3>");
				},800);
				setTimeout(function(){$(".response").fadeOut("slow")},2000);
				$("#answer-list").empty();
				setTimeout(function(){questionIndex++},1000);
				setTimeout(function(){loadQuestion()},1000);
				if(questionIndex == questions.length - 1){
					endGame();
				}
				incorrectAnswers++;
		
		
	}



	$("#game-timer").text("Time left in game: " + formatTimer(gameSecs));
	function startGameTimer(){
		if(gameSecs > 0){
			gameSecs--;
		}
		if(gameSecs == 0){
			gameOver = true;
			endGame();
		}
		$("#game-timer").text("Time left in game: " + formatTimer(gameSecs));
	}
	setInterval(startGameTimer, 1000);


	$("#question-timer").text("Time left to answer question: " + formatTimer(questionSecs));
	function startQuestionTimer(){
		if(questionSecs > 0){
			questionSecs--;
		}
		if(questionSecs == 0){
			timeOut();
			questionSecs = questionMins * 60;
		}
		$("#question-timer").text("Time left to answer question: " + formatTimer(questionSecs));
	}
	setInterval(startQuestionTimer, 1000);


	loadQuestion();

	var correctAnswer = $("li.correct").text(); //Get text of correct answer to display to user if they get question wrong

	


	var endGameCalled = 0;
	function endGame(){
		gameOver = true;
		$("#question").fadeOut("slow");
		$("#answer-list").fadeOut("slow");
		$("#question-box").fadeOut("slow");
		$("#game-timer").fadeOut("slow");
		$("#question-timer").fadeOut("slow");
		console.log("end game");
		endGameCalled++;
		if(endGameCalled == 1){
			
			$("#q-a-box").append("<h2>Game Over</h2>");
			$("#q-a-box").append("<h3>Correct Answers: " + correctAnswers + "</h3>");
			$("#q-a-box").append("<h3>Incorrect Answers: " + incorrectAnswers + "</h3>");
			$("#q-a-box").append("<p> id='playAgain'>Play Again?</p>");
			$("#playAgain").click(function(){
				loadQuestion();
			});
			gameMins = .5; //using variable mins to make it easy to adjust time limits based on minutes
			gameSecs = gameMins * 60; //in reality timers are only counting in seconds
			questionMins = .5;
			questionSecs = questionMins * 60;
			gameOver = false;
			questionsAnswered = 0;
			correctAnswers = 0;
			incorrectAnswers = 0;
			totalQuestions = questions.length;
			questionIndex = 0;
		}
	}

}

