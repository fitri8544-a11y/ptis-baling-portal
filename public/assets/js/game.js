console.log("PTIS GAME LOADED");

/* ================= VARIABLES ================= */

let score = 0;

let currentQuestion = 0;

let timeLeft = 20;

let timer;

/* ================= QUESTIONS ================= */

const questions = [

{
question:"🖥 Komputer tidak boleh dihidupkan langsung (tiada lampu, tiada bunyi kipas). Apakah tindakan penyiasatan pertama yang paling tepat?",

options:[
"Melakukan clear CMOS pada motherboard.",
"Menyemak PSU dan kabel kuasa.",
"Membuka RAM dan membersihkan pin.",
"Menukar bateri CMOS."
],

answer:1,

explanation:
"PSU ialah komponen pertama yang perlu diperiksa apabila sistem langsung tiada kuasa."
},

{
question:"🌐 Internet sekolah tidak berfungsi untuk keseluruhan blok akademik. Apakah tindakan terbaik?",

options:[
"Restart router/switch utama.",
"Update semua komputer klien.",
"Tukar IP semua komputer.",
"Format DNS server."
],

answer:0,

explanation:
"Restart router atau switch pusat ialah langkah standard untuk gangguan rangkaian tempatan."
},

{
question:"🖨 Printer tersangkut pada status Spooling / Queue. Apakah tindakan terbaik?",

options:[
"Restart Print Spooler service.",
"Format Windows.",
"Upgrade RAM komputer.",
"Menukar cartridge."
],

answer:0,

explanation:
"Masalah queue biasanya berkait dengan Print Spooler service Windows."
},

{
question:"💻 Laptop terlalu panas dan auto shutdown. Penyelesaian terbaik?",

options:[
"Menukar monitor.",
"Membersihkan heatsink dan thermal paste.",
"Install antivirus.",
"Menukar keyboard."
],

answer:1,

explanation:
"Thermal shutdown biasanya berpunca daripada sistem penyejukan tidak berfungsi."
},

{
question:"🔒 Akaun Google Workspace gagal login walaupun password betul.",

options:[
"Semak Caps Lock dan internet.",
"Tukar mouse.",
"Restart printer.",
"Format speaker."
],

answer:0,

explanation:
"Caps Lock dan kestabilan internet ialah punca biasa login gagal."
},

{
question:"📡 WiFi sekolah perlahan ketika ramai pengguna.",

options:[
"Restart access point dan kawal bandwidth.",
"Tukar LCD monitor.",
"Format keyboard.",
"Restart mouse."
],

answer:0,

explanation:
"Network congestion biasanya diselesaikan dengan bandwidth management."
},

{
question:"🖱 Mouse USB tidak dikesan.",

options:[
"Cuba port USB lain.",
"Tukar wallpaper.",
"Install font.",
"Restart speaker."
],

answer:0,

explanation:
"Cross-testing port USB ialah langkah troubleshooting asas."
},

{
question:"⌨ Keyboard tidak berfungsi.",

options:[
"Semak USB dan driver.",
"Restart printer.",
"Tukar router.",
"Format monitor."
],

answer:0,

explanation:
"Masalah keyboard biasanya melibatkan port atau driver."
},

{
question:"🖥 Monitor paparkan No Signal.",

options:[
"Semak kabel HDMI/VGA.",
"Tukar mousepad.",
"Install audio.",
"Restart printer."
],

answer:0,

explanation:
"No Signal menandakan tiada output grafik sampai ke monitor."
},

{
question:"🔊 Komputer tiada bunyi.",

options:[
"Semak audio driver dan output device.",
"Tukar wallpaper.",
"Restart mouse.",
"Format keyboard."
],

answer:0,

explanation:
"Driver audio atau output device salah ialah punca biasa."
},

{
question:"🧾 Printer keluar kertas kosong.",

options:[
"Semak toner/cartridge.",
"Tukar router.",
"Restart TV.",
"Format keyboard."
],

answer:0,

explanation:
"Kertas kosong menunjukkan dakwat/toner tidak dipindahkan."
},

{
question:"🌍 Website sekolah tidak boleh dibuka di pejabat sahaja.",

options:[
"Semak DNS atau firewall.",
"Tukar speaker.",
"Restart mouse.",
"Install font."
],

answer:0,

explanation:
"Masalah DNS/firewall boleh sekat akses laman web tempatan."
},

{
question:"🖨 Printer Paper Jam.",

options:[
"Keluarkan kertas ikut paper path.",
"Tukar mouse.",
"Install antivirus.",
"Restart monitor."
],

answer:0,

explanation:
"Kertas perlu dikeluarkan perlahan mengikut laluan printer."
},

{
question:"🔋 Laptop cepat habis bateri.",

options:[
"Kurangkan brightness dan aplikasi background.",
"Tukar keyboard.",
"Format LCD.",
"Restart speaker."
],

answer:0,

explanation:
"Brightness dan aplikasi background paling banyak guna bateri."
},

{
question:"📁 Fail dalam pendrive hilang selepas virus.",

options:[
"Guna attrib / semak hidden file.",
"Tukar router.",
"Restart printer.",
"Tukar meja."
],

answer:0,

explanation:
"Virus biasanya hide fail menggunakan hidden attribute."
},

{
question:"🧠 RAM usage 98% dan komputer hang.",

options:[
"End Task aplikasi berat.",
"Tukar wallpaper.",
"Install music player.",
"Restart speaker."
],

answer:0,

explanation:
"Task Manager membantu kenal pasti aplikasi guna RAM tinggi."
},

{
question:"☁ OneDrive / Teams Sync Pending.",

options:[
"Semak login Microsoft & internet.",
"Tukar mouse.",
"Format printer.",
"Tukar LCD."
],

answer:0,

explanation:
"Cloud sync sentiasa bergantung kepada internet & login session."
},

{
question:"🔌 Komputer auto restart ketika buka aplikasi berat.",

options:[
"Semak PSU dan suhu CPU.",
"Tukar wallpaper.",
"Install font.",
"Tukar meja."
],

answer:0,

explanation:
"PSU tidak stabil atau overheating boleh menyebabkan restart."
},

{
question:"🖥 Blue Screen (BSOD).",

options:[
"Semak driver dan RAM.",
"Tukar speaker.",
"Restart mouse.",
"Format keyboard."
],

answer:0,

explanation:
"BSOD biasanya berpunca daripada driver atau RAM."
},

{
question:"🌐 Lampu WAN router merah.",

options:[
"Semak modem/ISP.",
"Tukar monitor.",
"Restart speaker.",
"Tukar mousepad."
],

answer:0,

explanation:
"Lampu WAN merah menunjukkan tiada sambungan internet ISP."
}

];

/* ================= SHUFFLE ================= */

function shuffleArray(array){

  for(let i = array.length - 1; i > 0; i--){

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] =
    [array[j], array[i]];

  }

}

/* ================= TIMER ================= */

function startTimer(){

  clearInterval(timer);

  timeLeft = 20;

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

/* ================= LOAD QUESTION ================= */

function loadQuestion(){

  const q = questions[currentQuestion];

  document.getElementById("questionText")
    .textContent = q.question;

  const options =
    [...q.options];

  shuffleArray(options);

  const buttons =
    document.querySelectorAll(".gameOption");

  buttons.forEach((btn,index)=>{

    btn.textContent =
      options[index];

    btn.onclick = () => {

      const originalIndex =
        q.options.indexOf(options[index]);

      checkAnswer(originalIndex);

    };

  });

  document.getElementById("questionNumber")
  .textContent =
  `${currentQuestion + 1} / ${questions.length}`;

  document.getElementById("progressBar")
  .style.width =
  `${((currentQuestion+1)/questions.length)*100}%`;

  startTimer();

}

/* ================= CHECK ANSWER ================= */

function checkAnswer(selected){

  clearInterval(timer);

  const result =
    document.getElementById("gameResult");

  const q =
    questions[currentQuestion];

  result.classList.remove("hidden");

  if(selected === q.answer){

    score += 10;

    document.getElementById("gameScore")
      .textContent = score;

    result.className = `
    mt-8 rounded-2xl p-5
    text-center text-xl font-bold
    bg-emerald-500/20
    text-emerald-300
    border border-emerald-400/20
    `;

    result.innerHTML = `
    ✅ BETUL!<br><br>
    <span class="text-base text-slate-200">
    ${q.explanation}
    </span>
    `;

  }

  else{

    result.className = `
    mt-8 rounded-2xl p-5
    text-center text-xl font-bold
    bg-red-500/20
    text-red-300
    border border-red-400/20
    `;

    result.innerHTML = `
    ❌ KURANG TEPAT<br><br>
    <span class="text-base text-slate-200">
    ${q.explanation}
    </span>
    `;

  }

  setTimeout(()=>{

    result.classList.add("hidden");

    currentQuestion++;

    if(currentQuestion >= questions.length){

      showFinalScreen();

      return;

    }

    loadQuestion();

  },3500);

}

/* ================= FINAL SCREEN ================= */

function showFinalScreen(){

  let rank = "Trainee";

  if(score >= 160){

    rank = "🏆 PTIS EXPERT";

  }

  else if(score >= 120){

    rank = "🛠 SENIOR TECHNICIAN";

  }

  else if(score >= 80){

    rank = "💻 JUNIOR TECHNICIAN";

  }

  document.getElementById("questionBox")
  .innerHTML = `

  <div class="text-center">

    <h2 class="

    text-5xl
    font-black
    text-cyan-300

    mb-6

    ">

    🎉 SIMULASI SELESAI

    </h2>

    <p class="text-2xl text-white mb-4">

      Skor Akhir:

      <span class="text-emerald-300">

      ${score}

      </span>

    </p>

    <div class="

    inline-block

    px-6 py-3

    rounded-2xl

    bg-cyan-500/20
    border border-cyan-400/20

    text-cyan-300
    text-2xl
    font-black

    mb-8

    ">

    ${rank}

    </div>

    <br>

    <button

    onclick="location.reload()"

    class="

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

}

/* ================= START ================= */

document.addEventListener("DOMContentLoaded", () => {

  loadQuestion();

});