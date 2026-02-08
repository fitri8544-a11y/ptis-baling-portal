function kemaskiniTarikh() {
  const hari = [
    "Ahad", "Isnin", "Selasa", "Rabu",
    "Khamis", "Jumaat", "Sabtu"
  ];

  const bulan = [
    "Januari", "Februari", "Mac", "April",
    "Mei", "Jun", "Julai", "Ogos",
    "September", "Oktober", "November", "Disember"
  ];

  const sekarang = new Date();

  const paparan =
    hari[sekarang.getDay()] + ", " +
    sekarang.getDate() + " " +
    bulan[sekarang.getMonth()] + " " +
    sekarang.getFullYear() + " • " +
    sekarang.toLocaleTimeString("ms-MY");

  const el = document.getElementById("tarikhHari");
  if (el) el.textContent = paparan;
}

document.addEventListener("DOMContentLoaded", () => {
  kemaskiniTarikh();
  setInterval(kemaskiniTarikh, 1000);
});
