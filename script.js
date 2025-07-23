const questions = [
  { q: "What is the capital of Nigeria?", a: ["Lagos", "Abuja", "Kano", "Ibadan"], c: 1 },
  { q: "Which language runs in a web browser?", a: ["Java", "C", "Python", "JavaScript"], c: 3 },
  { q: "Who is the current president of Nigeria (2025)?", a: ["Tinubu", "Jonathan", "Buhari", "Osinbajo"], c: 0 },
  { q: "HTML stands for?", a: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HyperText Markdown Language", "None"], c: 1 },
  { q: "Which of these is not a programming language?", a: ["Python", "Java", "HTML", "Ruby"], c: 2 },
  { q: "Which company developed the Android OS?", a: ["Apple", "Nokia", "Google", "Microsoft"], c: 2 },
  { q: "The full meaning of CSS is?", a: ["Color Style Sheet", "Cascading Style Sheet", "Computer Styled Sections", "Creative Style Sheet"], c: 1 },
  { q: "What year was JavaScript created?", a: ["1991", "1995", "2000", "1989"], c: 1 },
  { q: "Who invented the World Wide Web?", a: ["Elon Musk", "Mark Zuckerberg", "Tim Berners-Lee", "Bill Gates"], c: 2 },
  { q: "Which tag is used for headings in HTML?", a: ["<head>", "<h1>", "<heading>", "<title>"], c: 1 },
  { q: "Which is a backend language?", a: ["CSS", "JavaScript", "PHP", "HTML"], c: 2 },
  { q: "Which database is commonly used with PHP?", a: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"], c: 1 },
  { q: "console.log is used in?", a: ["HTML", "CSS", "PHP", "JavaScript"], c: 3 },
  { q: "Which HTML tag is used to insert an image?", a: ["<pic>", "<img>", "<image>", "<src>"], c: 1 },
  { q: "Which of the following is not an operating system?", a: ["Windows", "Linux", "Chrome", "Android"], c: 2 },
  { q: "Which is used to style web pages?", a: ["HTML", "JQuery", "CSS", "XML"], c: 2 },
  { q: "How many bits are in a byte?", a: ["4", "8", "16", "32"], c: 1 },
  { q: "What does URL stand for?", a: ["Uniform Resource Locator", "Universal Resource List", "Unique Resource Label", "None"], c: 0 },
  { q: "Which protocol is used to access websites?", a: ["FTP", "SMTP", "HTTP", "SSH"], c: 2 },
  { q: "Which tool is used to push code to GitHub?", a: ["FileZilla", "Git", "Chrome", "Editor"], c: 1 },
];

let currentQuestion = 0;
let score = 0;
let timer;
let userName = "";

// Admin password check for reset
window.onload = () => {
  const code = prompt("Enter admin code to manage CBT:");
  if (code === "abc") {
    document.getElementById("admin-reset").style.display = "inline-block";
  }

  if (localStorage.getItem("quiz_taken")) {
    document.getElementById("start-screen").innerHTML = `
      <h3>You have already taken this CBT.</h3>
      <p>This test can only be taken once unless reset by an admin.</p>
    `;
  }
};

function startCBT() {
  userName = document.getElementById("username").value.trim();
  if (!userName) return alert("Please enter your name.");

  if (localStorage.getItem("quiz_taken")) {
    alert("You have already taken this CBT.");
    return;
  }

  localStorage.setItem("quiz_taken", "true");

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    return endCBT();
  }

  document.getElementById("question-number").innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
  document.getElementById("question-text").innerText = questions[currentQuestion].q;
  const opts = document.getElementById("options");
  opts.innerHTML = "";

  questions[currentQuestion].a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(i);
    btn.className = "option-btn";
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
      selectAnswer(-1); // Timeout, treat as no answer
    }
  }, 1000);
}

function selectAnswer(index) {
  clearInterval(timer);
  if (index === questions[currentQuestion].c) score++;
  currentQuestion++;
  showQuestion();
}

function endCBT() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("user-final-name").innerText = userName;
  document.getElementById("score").innerText = `${score} / ${questions.length}`;

  emailjs.init("zDl8bcT-u-iOljWI8");
  emailjs.send("service_rdao21k", "template_qynaar8", {
    user_name: userName,
    score: `${score} / ${questions.length}`
  }).then(() => console.log("✅ Result sent via EmailJS"));
}

function resetCBT() {
  if (confirm("Are you sure you want to reset CBT access on this browser?")) {
    localStorage.removeItem("quiz_taken");
    alert("✅ CBT access reset. Reloading...");
    location.reload();
  }
}