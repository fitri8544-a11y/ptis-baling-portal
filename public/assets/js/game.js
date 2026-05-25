console.log("GAME JS LOADED");

/* ================= GAME ================= */

let score = 0;

let timeLeft = 15;
let timer;

const questions = [

{
question:"🖥 Komputer tidak boleh dihidupkan",
options:[
"Tukar wallpaper desktop",
"Semak Power Supply (PSU)",
"Tukar mouse",
"Install antivirus"
],
answer:1
},

{
question:"🌐 Internet sekolah tidak berfungsi",
options:[
"Tukar keyboard",
"Restart router/switch",
"Tukar monitor",
"Install printer"
],
answer:1
},

{
question:"🖨 Printer tidak dapat print",
options:[
"Semak sambungan printer",
"Tukar speaker",
"Format komputer",
"Tukar RAM"
],
answer:0
},

{
question:"💻 Laptop terlalu panas",
options:[
"Tukar wallpaper",
"Bersihkan kipas & heatsink",
"Tukar monitor",
"Install game"
],
answer:1
},

{
question:"🔒 Akaun Google tidak boleh login",
options:[
"Semak internet & password",
"Tukar mouse",
"Format printer",
"Tukar speaker"
],
answer:0
},

{
question:"📡 WiFi sekolah perlahan",
options:[
"Restart access point",
"Tukar LCD",
"Tutup keyboard",
"Format mouse"
],
answer:0
},

{
question:"🖱 Mouse tidak detect",
options:[
"Semak USB port",
"Tukar wallpaper",
"Install font",
"Restart speaker"
],
answer:0
},

{
question:"⌨ Keyboard tidak berfungsi",
options:[
"Semak driver / USB",
"Tukar router",
"Restart printer",
"Tukar meja"
],
answer:0
},

{
question:"🖥 Monitor tiada paparan",
options:[
"Semak kabel HDMI/VGA",
"Tukar mousepad",
"Install lagu",
"Tutup printer"
],
answer:0
},

{
question:"🔊 Tiada bunyi komputer",
options:[
"Semak audio driver",
"Tukar wallpaper",
"Restart mouse",
"Format keyboard"
],
answer:0
},

{
question:"🧾 Printer keluar kertas kosong",
options:[
"Semak toner/cartridge",
"Tukar router",
"Restart TV",
"Format keyboard"
],
answer:0
},

{
question:"🌍 Website sekolah tidak boleh dibuka",
options:[
"Semak DNS/internet",
"Tukar speaker",
"Restart mouse",
"Install font"
],
answer:0
},

{
question:"🖨 Printer jammed",
options:[
"Keluarkan kertas tersekat",
"Tukar mouse",
"Tutup monitor",
"Install antivirus"
],
answer:0
},

{
question:"🔋 Laptop cepat habis bateri",
options:[
"Kurangkan brightness",
"Tukar keyboard",
"Format LCD",
"Tukar speaker"
],
answer:0
},

{
question:"📁 File hilang dalam pendrive",
options:[
"Semak hidden file/virus",
"Tukar router",
"Restart printer",
"Tukar meja"
],
answer:0
},

{
question:"🧠 RAM penuh & komputer perlahan",
options:[
"Tutup aplikasi background",
"Tukar wallpaper",
"Install lagu",
"Restart speaker"
],
answer:0
},

{
question:"☁ M365 tidak sync",
options:[
"Semak login & internet",
"Tukar mouse",
"Format printer",
"Tukar LCD"
],
answer:0
},

{
question:"🔌 Komputer asyik restart",
options:[
"Semak PSU & suhu",
"Tukar wallpaper",
"Install font",
"Tukar meja"
],
answer:0
},

{
question:"🖥 Blue Screen Windows",
options:[
"Semak driver/RAM",
"Tukar speaker",
"Restart mouse",
"Format keyboard"
],
answer:0
},

{
question:"🌐 Router tidak online",
options:[
"Semak power & ISP",
"Tukar monitor",
"Install antivirus",
"Tukar mousepad"
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

  // ================= QUESTION NUMBER =================

  document.getElementById("questionNumber")
  .textContent =
  `${currentQuestion + 1} / ${questions.length}`;

  // ================= PROGRESS =================

  document.getElementById("progressBar")
  .style.width =
  `${((currentQuestion+1)/questions.length)*100}%`;

  // ================= TIMER =================

  startTimer();

}

/* ================= CHECK ANSWER ================= */

function startTimer(){

  clearInterval(timer);

  timeLeft = 15;

  document.getElementById("timer")
    .textContent = timeLeft + "s";

  timer = setInterval(()=>{

    timeLeft--;

    document.getElementById("timer")
      .textContent = timeLeft + "s";

    if(timeLeft <= 0){

      clearInterval(timer);

      checkAnswer(-1);

    }

  },1000);

}

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

  clearInterval(timer);

  document.getElementById("questionBox")
  .innerHTML = `

  <div class="text-center">

    <h2 class="

    text-5xl
    font-black
    text-cyan-300

    mb-6

    ">

    🎉 GAME SELESAI

    </h2>

    <p class="text-2xl text-white">

      Skor Akhir:

      <span class="text-emerald-300">

      ${score}

      </span>

    </p>

    <button

    onclick="location.reload()"

    class="

    mt-8
    px-8 py-4

    rounded-2xl

    bg-cyan-500/20
    hover:bg-cyan-500/30

    text-cyan-300
    font-bold

    transition

    ">

    🔄 Main Semula

    </button>

  </div>

  `;

  return;

}

    loadQuestion();

  },2000);

}

/* ================= START GAME ================= */

document.addEventListener("DOMContentLoaded", () => {

  loadQuestion();

});