console.log("GAME JS LOADED");

/* ================= GAME ================= */

let score = 0;

let timeLeft = 15;
let timer;

const questions = [
  {
    question: "🖥 Komputer tidak boleh dihidupkan langsung (tiada lampu, tiada bunyi kipas). Apakah tindakan penyiasatan pertama yang paling tepat?",
    options: [
      "Melakukan 'clear CMOS' pada motherboard untuk reset sistem bios.",
      "Menyemak unit bekalan kuasa (PSU) dan memastikan suis utama serta kabel kuasa berfungsi.",
      "Membuka RAM dan membersihkan pin keemasan menggunakan pemadam.",
      "Menukar bateri CR2032 pada motherboard kerana kehabisan cas."
    ],
    answer: 1 // Menyemak PSU adalah langkah asas pertama untuk masalah tiada kuasa langsung.
  },
  {
    question: "🌐 Internet sekolah tidak berfungsi untuk keseluruhan blok akademik. Selepas pengesahan dengan ISP didapati talian luar stabil, apakah langkah seterusnya?",
    options: [
      "Mengemas kini (update) firmware pada semua komputer klien di blok tersebut.",
      "Melakukan 'hard reset' atau but semula (restart) pada router utama dan switch pusat.",
      "Menukar alamat IP statik pada setiap komputer pengajar secara manual.",
      "Memformat semula pelayan DNS tempatan sekolah."
    ],
    answer: 1 // Memulakan semula peranti rangkaian pusat (router/switch) adalah standard troubleshooting bagi kegagalan rangkaian setempat.
  },
  {
    question: "🖨 Dokumen dihantar ke printer tetapi status tersangkut pada 'Spooling / Queue' dan tidak mencetak. Bagaimanakah cara menyelesaikannya?",
    options: [
      "Menyemak sambungan fizikal kabel dan memulakan semula (restart) perkhidmatan 'Print Spooler' dalam Windows Windows Services.",
      "Memformat semula sistem operasi komputer kerana kemungkinan fail sistem rosak.",
      "Membuka perkakasan printer untuk memeriksa kerosakan mekanikal pada fuser unit.",
      "Menaik taraf (upgrade) RAM komputer klien agar proses penghantaran data lebih cepat."
    ],
    answer: 0 // Isu spooling biasanya diselesaikan dengan memeriksa sambungan atau menyegarkan semula service Print Spooler.
  },
  {
    question: "💻 Sebuah laptop mengalami peningkatan suhu yang ekstrem (overheating) sehingga terpadam sendiri (thermal shutdown) semasa digunakan. Tindakan terbaik ialah:",
    options: [
      "Menukar mod pelan kuasa Windows (Power Plan) kepada 'High Performance'.",
      "Membersihkan habuk pada kipas & heatsink serta menggantikan pes terma (thermal paste) yang telah kering.",
      "Menukar skrin monitor kepada jenis LED yang kurang membebaskan haba.",
      "Memasang perisian antivirus pihak ketiga untuk mengurangkan beban pemprosesan grafik."
    ],
    answer: 1 // Pembersihan fizikal sistem penyejukan dan penukaran pes terma adalah penyelesaian mutlak untuk terpadam disebabkan terma.
  },
  {
    question: "🔒 Pengguna gagal mendaftar masuk (login) ke akaun Google Workspace sekolah dan menerima ralat 'Wrong Password', walaupun pasti kata laluan betul. Apakah pemeriksaan awal yang kritikal?",
    options: [
      "Memeriksa status sambungan internet dan memastikan butang 'Caps Lock' pada papan kekunci tidak diaktifkan secara tidak sengaja.",
      "Menggantikan tetikus (mouse) kerana kemungkinan isyarat klik berganda (double-click).",
      "Melakukan konfigurasi semula (factory reset) pada printer rangkaian sekolah.",
      "Menukar pemacu audio (audio driver) sistem untuk membetulkan ralat pengesahan suara."
    ],
    answer: 0 // Isu teks kata laluan sensitif huruf besar/kecil (Caps Lock) dan kestabilan internet adalah punca lazim ralat log masuk asas.
  },
  {
    question: "📡 Isyarat WiFi sekolah penuh tetapi kadar kelajuan capaian (speed) menjadi sangat perlahan apabila waktu rehat. Langkah optimasi yang sesuai ialah:",
    options: [
      "Melakukan but semula (restart) pada access point atau menguruskan had lebar jalur (bandwidth throttling) bagi setiap pengguna.",
      "Menukar panel skrin LCD pada komputer riba yang mengakses rangkaian tersebut.",
      "Menutup sambungan papan kekunci fizikal dan beralih kepada papan kekunci atas skrin (on-screen keyboard).",
      "Memformat tetikus logik (mouse driver) untuk meningkatkan respons navigasi web."
    ],
    answer: 0 // Pengurusan trafik access point dan kawalan bandwidth adalah penyelesaian mutlak untuk masalah kesesakan rangkaian (network congestion).
  },
  {
    question: "🖱 Tetikus (mouse) jenis USB tidak dikesan oleh sistem Windows dan tiada lampu sensor menyala. Langkah diagnostik yang betul ialah:",
    options: [
      "Mencuba tetikus pada port USB lain yang pasti berfungsi atau menguji tetikus pada komputer berasingan.",
      "Menukar kertas dinding (wallpaper) desktop kepada warna yang lebih gelap untuk refleksi sensor.",
      "Memasang fon (font) sistem yang baharu untuk membaiki pepijat paparan kursor.",
      "Memulakan semula pembesar suara (speaker) untuk menetapkan semula gangguan frekuensi bunyi."
    ],
    answer: 0 // Mengasingkan masalah menggunakan teknik 'cross-testing' pada port/PC lain adalah kaedah terbaik untuk troubleshooting perkakasan USB.
  },
  {
    question: "⌨ Beberapa butang pada papan kekunci (keyboard) komputer meja tidak memberikan sebarang input apabila ditaip. Bagaimanakah pemeriksaan awal dilakukan?",
    options: [
      "Memeriksa sambungan kabel USB/PS2 pada belakang CPU dan mengemas kini peranti pemacu (driver) melalui Device Manager.",
      "Menggantikan router wifi bilik komputer kerana gangguan isyarat tanpa wayar.",
      "Memulakan semula (restart) mesin printer untuk mengosongkan buffer memori papan kekunci.",
      "Menukar meja komputer ke kedudukan yang lebih rata untuk mengelakkan litar pintas fizikal."
    ],
    answer: 0 // Pemeriksaan port fizikal dan kestabilan pemacu perisian (driver) adalah protokol standard untuk papan kekunci tidak responsif.
  },
  {
    question: "🖥 Komputer dihidupkan, lampu LED pada CPU menyala hijau, tetapi monitor memaparkan mesej 'No Signal / Cable Not Connected'. Tindakan pertama ialah:",
    options: [
      "Memastikan kabel HDMI/VGA dipasang dengan ketat pada port yang betul (terutamanya pada kad grafik diskrit, jika ada).",
      "Menggantikan pelapik tetikus (mousepad) dengan jenis anti-statik.",
      "Memasang fail audio/lagu baharu untuk mematikan fungsi amaran senyap sistem.",
      "Menutup bekalan kuasa utama printer rangkaian bagi mengelakkan gangguan perkongsian paparan."
    ],
    answer: 0 // Mesej 'No Signal' menandakan tiada hantaran data grafik, biasanya berpunca daripada masalah sambungan kabel monitor atau port kad grafik.
  },
  {
    question: "🔊 Komputer tidak mengeluarkan sebarang bunyi walaupun ikon kelantangan (volume) pada Windows berada pada tahap 100%. Langkah pembetulan sistem ialah:",
    options: [
      "Semak pemacu audio (audio driver) dalam Device Manager dan pastikan peranti output (output device) yang betul telah dipilih.",
      "Menukar gambar latar belakang (wallpaper) desktop bagi menetapkan semula tema grafik sistem.",
      "Memulakan semula tetikus (restart mouse) untuk membetulkan herotan gelombang bunyi digital.",
      "Memformat susun atur papan kekunci (keyboard layout) kepada format antarabangsa."
    ],
    answer: 0 // Memilih peranti output yang betul dan memastikan kesahihan audio driver adalah penyelesaian perisian bagi isu ketiadaan bunyi.
  },
  {
    question: "🧾 Printer berfungsi secara mekanikal dan bergerak mencetak, tetapi kertas yang keluar adalah kosong sepenuhnya tanpa sebarang dakwat. Apakah punca utama?",
    options: [
      "Tahap dakwat/toner telah habis, atau pelekat keselamatan pada cartridge baharu belum ditanggalkan.",
      "Konfigurasi alamat IP pada router rangkaian telah berubah.",
      "Televisyen berhampiran tidak ditutup menyebabkan herotan elektromagnetik pada fuser.",
      "Format papan kekunci komputer bertukar kepada bahasa selain daripada bahasa lalai (default)."
    ],
    answer: 0 // Kertas kosong tetapi proses mekanikal berjalan menunjukkan masalah pemindahan dakwat (dakwat kering/habis/cartridge masih tersegel).
  },
  {
    question: "🌍 Laman web rasmi sekolah tidak boleh diakses oleh komputer di pejabat (ralat 'ERR_CONNECTION_TIMED_OUT'), tetapi boleh dibuka menggunakan internet telefon bimbit. Apakah puncanya?",
    options: [
      "Isu pada konfigurasi DNS atau sekatan Firewall pada rangkaian dalaman sekolah.",
      "Pembesar suara (speaker) komputer pejabat mengalami kerosakan litar pintas.",
      "Tetikus komputer perlu dimulakan semula (restart) untuk mengemas kini kuki (cookies) pelayar.",
      "Sistem komputer kekurangan fon (font) standard untuk memaparkan teks laman web tersebut."
    ],
    answer: 0 // Perbezaan akses antara rangkaian tempatan dan luar menunjukkan masalah spesifik pada tetapan rangkaian dalaman seperti DNS atau sekatan Firewall.
  },
  {
    question: "🖨 Mesin pencetak berhenti mengejut dan memaparkan ralat 'Paper Jam'. Apakah prosedur keselamatan yang paling tepat untuk mengatasinya?",
    options: [
      "Menarik kertas yang tersekat keluar perlahan-lahan mengikut arah laluan kertas (paper path) selepas mematikan kuasa printer.",
      "Menggantikan tetikus komputer dengan segera untuk menghentikan isyarat arahan cetakan.",
      "Menutup paparan monitor komputer klien agar proses pemanasan printer terhenti.",
      "Memasang perisian antivirus versi premium untuk membersihkan log cetakan yang rosak."
    ],
    answer: 0 // Menarik kertas mengikut arah reka bentuk mekanikal (paper path) menghalang kerosakan pada penggelek (roller) dan penderia (sensor) printer.
  },
  {
    question: "🔋 Bateri komputer riba (laptop) kehabisan cas dengan terlalu cepat berbanding spesifikasi asal pengeluar. Langkah penjimatan perisian yang paling berkesan ialah:",
    options: [
      "Mengurangkan tahap kecerahan skrin (brightness) dan menutup aplikasi latar belakang yang menggunakan CPU tinggi.",
      "Menukar papan kekunci fizikal kepada papan kekunci jenis mekanikal yang menggunakan kurang tenaga.",
      "Memformat semula panel cecair kristal (LCD) untuk membuang piksel mati yang menggunakan kuasa tinggi.",
      "Menggantikan pembesar suara dalaman (internal speaker) kepada jenis pasif."
    ],
    answer: 0 // Skrin dan proses latar belakang CPU adalah dua komponen utama yang memakan cas bateri paling tinggi pada sesebuah laptop.
  },
  {
    question: "📁 Selepas pendrive dimasukkan ke dalam komputer yang dijangkiti malware, semua fail di dalamnya hilang, namun ruang storan (storage capacity) masih kelihatan penuh. Bagaimanakah cara mengembalikan fail tersebut?",
    options: [
      "Menggunakan arahan 'attrib' melalui Command Prompt (CMD) atau menyemak tetapan 'Hidden files' selepas melakukan imbasan virus.",
      "Menukar router rangkaian sekolah kepada model yang mempunyai kelajuan gigabit.",
      "Memulakan semula (restart) mesin pencetak pejabat yang berkongsi storan rangkaian.",
      "Menukar meja kerja ke kawasan yang bebas daripada tarikan medan magnet bumi."
    ],
    answer: 0 // Atribut fail 'Hidden' atau 'System' sering diubah oleh virus/malware; arahan 'attrib' dalam CMD digunakan untuk memulihkannya semula.
  },
  {
    question: "🧠 Penggunaan memori (RAM) komputer mencapai 98% menyebabkan sistem menjadi sangat lembap dan kerap membeku (hang). Tindakan segera yang perlu diambil ialah:",
    options: [
      "Membuka Task Manager dan menamatkan proses (End Task) aplikasi latar belakang yang menggunakan memori tinggi.",
      "Menukar imej hiasan latar (wallpaper) desktop kepada format resolusi ultra-tinggi.",
      "Memasang perisian pemutar lagu pihak ketiga untuk mengosongkan cache sistem.",
      "Memulakan semula pembesar suara luaran bagi mengurangkan beban hantaran data bas (bus data)."
    ],
    answer: 0 // Task Manager membolehkan pengguna melihat dan menutup proses yang memonopoli memori RAM secara tidak efisien.
  },
  {
    question: "☁ Aplikasi Microsoft 365 (OneDrive/Teams) memaparkan status 'Sync Pending' dan fail tidak dikemas kini ke awan. Apakah langkah penyelesaiannya?",
    options: [
      "Memeriksa status log masuk akaun Microsoft dan memastikan sambungan internet adalah stabil serta tidak disekat.",
      "Menggantikan tetikus komputer kepada jenis tanpa wayar (wireless mouse).",
      "Memformat semula firmware printer yang disambungkan pada rangkaian tempatan.",
      "Menukar panel skrin LCD komputer bagi meningkatkan kadar penyegaran (refresh rate) aplikasi."
    ],
    answer: 0 // Isu penyegerakan awan (cloud sync) sentiasa berkait rapat dengan status pengesahan akaun pengguna (login session) dan ketersediaan internet.
  },
  {
    question: "🔌 Komputer meja sering terpadam secara tiba-tiba dan melakukan but semula (auto-restart) secara rawak semasa pengguna membuka aplikasi berat. Apakah komponen fizikal yang perlu disiasat?",
    options: [
      "Memeriksa kestabilan voltan Unit Bekalan Kuasa (PSU) dan memastikan suhu pemproses (CPU thermal) tidak terlalu tinggi.",
      "Menukar gambar latar belakang (wallpaper) desktop kerana kemungkinan fail imej tersebut rosak.",
      "Memasang fon (font) sistem baharu untuk membaiki pepijat pemaparan teks aplikasi.",
      "Menukar meja komputer kepada bahan kayu untuk mengurangkan elektrostatik luaran."
    ],
    answer: 0 // Kegagalan bekalan kuasa yang tidak stabil (PSU drop) atau perlindungan shutdown akibat overheat (suhu CPU tinggi) adalah punca utama PC terpadam sendiri semasa beban kerja tinggi.
  },
  {
    question: "🖥 Paparan Windows tiba-tiba bertukar kepada skrin biru dengan kod ralat tertentu (Blue Screen of Death - BSOD). Apakah langkah analisis terbaik?",
    options: [
      "Menyemak kod ralat BSOD tersebut, memeriksa kesahihan driver yang baru dipasang, atau menguji integriti modul RAM.",
      "Menukar pembesar suara (speaker) komputer kerana isyarat analog bunyi mungkin mengganggu kernel sistem.",
      "Memulakan semula tetikus (restart mouse) untuk membersihkan timbunan memori pemprosesan grafik.",
      "Memformat papan kekunci komputer bagi membetulkan kesilapan input kod binari perkakasan."
    ],
    answer: 0 // BSOD ialah ralat kritikal sistem operasi yang lazimnya berpunca daripada konflik pemacu (driver crash) atau kegagalan perkakasan seperti RAM yang rosak.
  },
  {
    question: "🌐 Lampu penunjuk 'Internet / WAN' pada router sekolah bertukar warna merah atau terpadam terus. Apakah maksud indikator ini?",
    options: [
      "Terdapat gangguan bekalan kuasa pada modem atau tiada isyarat internet yang diterima daripada Pembekal Perkhidmatan Internet (ISP).",
      "Monitor komputer pengajar utama telah rosak atau kehabisan jangka hayat paparan.",
      "Perisian antivirus pada komputer pelayan (server) telah menyekat fungsi fizikal router.",
      "Pelapik tetikus (mousepad) yang digunakan di dalam makmal komputer terlalu tebal."
    ],
    answer: 0 // Lampu WAN merah/padam menandakan router kehilangan sambungan fizikal atau digital dengan talian luar yang disediakan oleh pihak ISP.
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