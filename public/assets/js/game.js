console.log("GAME JS LOADED");

/* ================= GAME ================= */

let score = 0;

const questions = [

{

question:
"🖥 Komputer tidak boleh dihidupkan",

options:[

"Tukar wallpaper desktop",

"Semak Power Supply (PSU)",

"Tukar mouse",

"Install antivirus"

],

answer:1

},

{

question:
"🌐 Internet sekolah tidak berfungsi",

options:[

"Tukar keyboard",

"Restart router/switch",

"Tukar monitor",

"Install printer"

],

answer:1

},

{

question:
"🖨 Printer tidak dapat print",

options:[

"Semak sambungan printer",

"Tukar speaker",

"Format komputer",

"Tukar RAM"

],

answer:0

}

];

let currentQuestion = 0;

/* ================= LOAD QUESTION ================= */

function loadQuestion(){

  const q = questions[currentQuestion];

  document.getElementById("questionText")
    .textContent = q.question;

  const buttons =
    document.querySelectorAll(".gameOption");

  buttons.forEach((btn,index)=>{

    btn.textContent =
      q.options[index];

  });

}

/* ================= CHECK ANSWER ================= */

function checkAnswer(selected){

  const result =
    document.getElementById("gameResult");

  const correct =
    questions[currentQuestion].answer;

  result.classList.remove("hidden");

  if(selected === correct){

    score += 10;

    document.getElementById("gameScore")
      .textContent = score;

    result.className = `

    mt-8
    rounded-2xl
    p-5

    text-center
    text-xl
    font-bold

    bg-emerald-500/20
    text-emerald-300
    border border-emerald-400/20

    `;

    result.innerHTML =
      "✅ Betul! Anda seorang juruteknik PTIS yang hebat.";

  }

  else{

    result.className = `

    mt-8
    rounded-2xl
    p-5

    text-center
    text-xl
    font-bold

    bg-red-500/20
    text-red-300
    border border-red-400/20

    `;

    result.innerHTML =
      "❌ Jawapan kurang tepat. Cuba lagi.";

  }

  setTimeout(()=>{

    result.classList.add("hidden");

    currentQuestion++;

    if(currentQuestion >= questions.length){

      currentQuestion = 0;

    }

    loadQuestion();

  },2000);

}

/* ================= START GAME ================= */

document.addEventListener("DOMContentLoaded", () => {

  loadQuestion();

});