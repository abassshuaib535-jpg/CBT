
const questions = [
  { q: "What is the capital of Nigeria?", a: ["Lagos", "Abuja", "Kano", "Ibadan"], c: 1 },
  { q: "What is 2 + 2?", a: ["3", "4", "5", "2"], c: 1 },
  { q: "Which planet is known as the Red Planet?", a: ["Earth", "Venus", "Mars", "Jupiter"], c: 2 },
  { q: "Who wrote 'Things Fall Apart'?", a: ["Wole Soyinka", "Chinua Achebe", "Chimamanda Adichie", "Ngũgĩ wa Thiong’o"], c: 1 },
  { q: "What is the boiling point of water?", a: ["50°C", "90°C", "100°C", "120°C"], c: 2 },
  { q: "What language is primarily spoken in Brazil?", a: ["Spanish", "English", "Portuguese", "French"], c: 2 },
  { q: "Which gas do plants absorb from the atmosphere?", a: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], c: 2 },
  { q: "What is the largest continent in the world?", a: ["Africa", "Asia", "Europe", "Australia"], c: 1 },
  { q: "What is H2O commonly known as?", a: ["Salt", "Hydrogen", "Water", "Acid"], c: 2 },
  { q: "Who was the first President of Nigeria?", a: ["Olusegun Obasanjo", "Nnamdi Azikiwe", "Yakubu Gowon", "Muhammadu Buhari"], c: 1 },
  { q: "What is the currency of Nigeria?", a: ["Dollar", "Naira", "Cedi", "Pound"], c: 1 },
  { q: "What is the square root of 81?", a: ["8", "9", "10", "7"], c: 1 },
  { q: "Which device is used to measure temperature?", a: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"], c: 1 },
  { q: "Who discovered gravity?", a: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Charles Darwin"], c: 1 },
  { q: "What is the longest river in the world?", a: ["Niger", "Amazon", "Nile", "Mississippi"], c: 2 },
  { q: "Which continent is Nigeria located in?", a: ["Europe", "Africa", "Asia", "South America"], c: 1 },
  { q: "What organ pumps blood in the human body?", a: ["Liver", "Kidney", "Heart", "Lungs"], c: 2 },
  { q: "What is 10 × 10?", a: ["100", "10", "1000", "20"], c: 0 },
  { q: "What type of energy is produced by the sun?", a: ["Electrical", "Solar", "Mechanical", "Chemical"], c: 1 },
  { q: "Who painted the Mona Lisa?", a: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Michelangelo"], c: 1 }
];

let currentQuestion = 0;
let score = 0;
let timer;
let userName = "";

if (localStorage.getItem("quiz_taken")) {
  document.querySelector("#start-screen").innerHTML = "<h3>You have already taken the quiz.</h3>";
}

function startQuiz() {
  userName = document.getElementById("username").value.trim();
  if (!userName) return alert("Enter your name to start.");
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    return endQuiz();
  }

  document.getElementById("question-number").innerText = `Question ${currentQuestion + 1}`;
  document.getElementById("question-text").innerText = questions[currentQuestion].q;
  const opts = document.getElementById("options");
  opts.innerHTML = "";

  questions[currentQuestion].a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(i);
    opts.appendChild(btn);
  });

  let timeLeft = 5;
  document.getElementById("time-left").innerText = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      selectAnswer(-1);
    }
  }, 1000);
}

function selectAnswer(index) {
  clearInterval(timer);
  if (index === questions[currentQuestion].c) score++;
  currentQuestion++;
  showQuestion();
}

function endQuiz() {
  localStorage.setItem("quiz_taken", "true");
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("user-final-name").innerText = userName;
  document.getElementById("score").innerText = score;

  emailjs.init("zDl8bcT-u-iOljWI8");

  emailjs.send("service_rdao21k", "template_qynaar8", {
    user_name: userName,
    score: `${score} / 20`
  }).then(() => console.log("Result sent"));
}
