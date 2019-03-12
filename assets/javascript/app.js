$(document).ready(function () {
    var aTrivia = [{
            q: "In our solar system, which planet has the shortest day?",
            a: "Jupiter",
            w: ["Earth", "Mars", "Uranus"],
        },
        {
            q: "The Great Red Spot is a gigantic storm located on which planet in our solar system",
            a: "Jupiter",
            w: ["Mercury", "Venus", "Earth"],
        },
        {
            q: "Titan, Enceladus, Mimas & Iapetus are just some of the moons orbiting which planet?",
            a: "Jupiter",
            w: ["Saturn", "Uranus", "Mars"],
        },
        {
            q: "Which planet in our solar system has the most oxygen?",
            a: "Earth",
            w: ["Pluto", "Neptune", "Mercury"],
        },
        {
            q: "Which planet is furthest from the sun?",
            a: "Neptune",
            w: ["Saturn", "Uranus", "Mercury"],
        },
        {
            q: "What planet in our solar system has the most gravity?",
            a: "Jupiter",
            w: ["Saturn", "Earth", "Mercury"],
        },
    ];
    var option = $(".answers")
    var question = $("#question")
    var nCounter = 0;
    var nTime = 30;
    var nConverted=30;
    var nCorrect = 0;
    var nIncorrect = 0;
    var nUnanswered = 0;
    var intervalID;
    var qInterval;
    var bAnswered=false;
    // var bClockRunning=false;

    //varriables
    //=======================================================================

//start
function start(){
    nextQuestion();
    intervalID = setInterval(count, 1000);
    qInterval = setInterval(nextQuestion, 30000);
}
    // display the question and options

    //question
    // question function

    function nextQuestion() {
        if (nCounter <= 5) {
            // reset timers
            // qInterval = setInterval(nextQuestion, 30000);
            nTime = 30;

            // change answered boolean to true
            bAnswered= false;
            //clear gif
            option.children().remove();
            $("#image-holder").empty();
            question.text(aTrivia[nCounter].q)
            // display correct option
            option.append("<span  id='c' class='option'>" + aTrivia[nCounter].a + "</span>" + "<br>");
            //wrong options
            for (var i = 0; i <= 2; i++) {
                var newSpan = $("<span id='w'>");
                newSpan.attr('class', 'option');
                newSpan.html(aTrivia[nCounter].w[i] + "<br>");
                option.append(newSpan);
            }
            nCounter++;
        } else {
            clearInterval(intervalID);
            clearInterval(qInterval);
            // option.empty();
            question.empty();
            question.html("Correct: " +nCorrect+ "<br>" + "Incorrect: " + nIncorrect + "<br>" + "Unanswered: " + nUnanswered);
            $(".answers").html("<span  id='again' class='option'>Play Again?</span>");   $("#image-holder").empty();   
        }
    }

    function count() {

        nTime--;
         nConverted = timeConverter(nTime);
        $("#timer").text("Time remaining: " + nConverted);
    }

    function timeConverter(t) {
        var minutes = Math.floor(t / 30);
        var seconds = t - (minutes * 30);

        if (seconds < 10) {
            seconds = "0" + seconds;
        } 
        if(t===0){
            nUnanswered++;
        }
        return seconds;
    }

    //correct guess GIF
    function correct() {
        $("#image-holder").html("<img src='assets/images/giphy.gif' width='200px'>");
        setTimeout(nextQuestion, 6000);

    }
    //incorrect guess GIFF
    function incorrect() {

        $("#image-holder").html("Correct answer: "+ aTrivia[nCounter-1].a+ "<img src='assets/images/wrong.gif' width='200px'>");
        setTimeout(nextQuestion, 6000);

    }

    //functions==========================================================================


    //main process
//display start button
    $("#timer").text("Click to start");
    $("#timer").live("click", function(){
        $("#timer").empty()
        start();
        nextQuestion();
})

    //display questions for 30 seconds each

    var value;
    // click event
    $(".option").live("click", function () {
        value = $(this).attr('id');
        console.log(this);

        if (value === "c" && bAnswered===false) {
            nCorrect++;
            bAnswered=true;
            //play winner gif
            correct();
        } else if (value === "w" && bAnswered===false) {
            bAnswered=true;
            nIncorrect++
            // value;
            // console.log(value)
            incorrect();
        } else if(value === "again"){
            nCounter = 0;
            nTime = 30;
            nCorrect = 0;
            nIncorrect = 0;
            nUnanswered = 0;
            option.children().remove();
            question.empty();
            nextQuestion();
            start();
        }
    });

    //document.ready close
})