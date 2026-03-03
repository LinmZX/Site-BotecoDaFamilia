const yearElement = document.getElementById("year");
const openStatusElement = document.getElementById("open-status");
const currentTimeElement = document.getElementById("current-time");
const hoursListElement = document.getElementById("hours-list");

const schedule = {
  0: { day: "domingo", open: "10:00", close: "22:00" },
  1: { day: "segunda-feira", open: "10:00", close: "22:00" },
  2: { day: "terça-feira", open: "10:00", close: "22:00" },
  3: { day: "quarta-feira", open: "10:00", close: "22:00" },
  4: { day: "quinta-feira", open: "10:00", close: "22:00" },
  5: { day: "sexta-feira", open: "10:00", close: "23:00" },
  6: { day: "sábado", open: "10:00", close: "23:00" }
};

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function updateFooterYear() {
  yearElement.textContent = new Date().getFullYear();
}

function updateBusinessStatus() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Bahia",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long"
  });

  const parts = formatter.formatToParts(now);
  const weekdayName = parts.find((part) => part.type === "weekday")?.value || "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value || 0);

  const dayIndex = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"].indexOf(weekdayName);

  const todaySchedule = schedule[dayIndex];
  const nowInMinutes = hour * 60 + minute;
  const openInMinutes = timeToMinutes(todaySchedule.open);
  const closeInMinutes = timeToMinutes(todaySchedule.close);

  const isOpen = nowInMinutes >= openInMinutes && nowInMinutes < closeInMinutes;

  openStatusElement.textContent = isOpen
    ? `Aberto agora • Fecha às ${todaySchedule.close}`
    : `Fechado agora • Abre às ${todaySchedule.open}`;
  openStatusElement.classList.toggle("open", isOpen);
  openStatusElement.classList.toggle("closed", !isOpen);

  currentTimeElement.textContent = `Horário local em Jauá: ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")} (${weekdayName})`;
}

function renderHoursList() {
  const orderedDays = [2, 3, 4, 5, 6, 0, 1];

  orderedDays.forEach((dayNumber) => {
    const dayInfo = schedule[dayNumber];
    const item = document.createElement("li");
    item.innerHTML = `<span>${dayInfo.day}</span><span>${dayInfo.open}–${dayInfo.close}</span>`;
    hoursListElement.appendChild(item);
  });
}

updateFooterYear();
updateBusinessStatus();
renderHoursList();
