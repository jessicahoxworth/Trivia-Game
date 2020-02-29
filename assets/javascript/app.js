var card = $("#quiz");
var questions = [
    {
        question: "Which way does Earth spin?",
        choices: ["From East to West", "From North to South", "From West to East", "From South to North"],
        answer: "From West to East"
    },

    {
        question: "Which of these planets is the biggest?",
        choices: ["Mars", "Earth", "The Milky Way", "The Sun"],
        answer: "Earth"
    },
    {
        question: "How far is the distance between earth and the Milky Way?",
        choices: ["25,000 light years", "20,000 light years", "15,000 light years", "32,000 light years"],
        answer: "25,000 light years"
    },
    {
        question: "How many planets are in our solar system?",
        choices: ["12 planets", "7 planets", " 6 1/2 planets", "8 planets"],
        answer: "8 planets"
    },
    {
        question: "What flavor ice cream did Baskin-Robbins release in 1969 to commemorate America’s landing on the moon?",
        choices: ["Nebula Neopolitan", "Lunar Cheesecake", "Starry Sundae", "Galactic Moon Delight"],
        answer: "Lunar Cheesecake"
    },
    {
        question: "How much time does sun rays take to reach earth?",
        choices: ["8 minutes", " 5 minutes and 32 seconds", "45 seconds", "10 minutes"],
        answer: "8 minutes"
    }
];

var timer;
var scoreboard = {
    correct: 0,
    incorrect: 0,
    counter: 90,

    countdown: function () {
        scoreboard.counter--;
        $("#counter-number").html(scoreboard.counter);
        if (scoreboard.counter === 0) {
            console.log("time's up");
            scoreboard.done();
        }
    },

    start: function () {
        timer = setInterval(scoreboard.countdown, 1000);

        $("#qContainer").prepend(
            "<h2>Time Remaining: <span id='counter-number'>90</span> Seconds</h2>"
        );

        $("#start").remove();

        for (var i = 0; i < questions.length; i++) {
            card.append("<h2>" + questions[i].question + "</h2>");
            for (var j = 0; j < questions[i].choices.length; j++) {
                card.append("<input type='radio' name='question-" + i +
                    "' value='" + questions[i].choices[j] + "''>" + questions[i].choices[j]);

            }

        }

        card.append("<button id='done'>Done</button>");
    },


    done: function () {
        var inputs = card.children("input:checked");
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).val() === questions[i].answer) {
                scoreboard.correct++;
            } else {
                scoreboard.incorrect++;
            }
        }
        this.result();
    },

    // removes the quiz page to see results
    result: function () {
        clearInterval(timer);

        $("#qContainer h2").remove();

        card.html("<h6>All Done!</h6>");
        card.append("<h3>Correct Answers: " + this.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");

        card.append("<button id='restart'>Restart</button>");
    }
};

// restart game



//click events

$(document).on("click", "#start", function () {
    scoreboard.start();
});

$(document).on("click", "#done", function () {
    scoreboard.done();
});

// Partially done - need to hide "All Done" text

$(document).on("click", "#restart", function () {
    scoreboard.start()
    $("h3, #restart, h6").hide();

});


