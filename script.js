const yearElement = document.getElementById("year");
const openStatusElement = document.getElementById("open-status");
const currentTimeElement = document.getElementById("current-time");
const scrollLogoElement = document.getElementById("scroll-logo");

const schedule = {
  0: { open: "10:00", close: "22:00" },
  1: { open: "10:00", close: "22:00" },
  2: { open: "10:00", close: "22:00" },
  3: { open: "10:00", close: "22:00" },
  4: { open: "10:00", close: "22:00" },
  5: { open: "10:00", close: "23:00" },
  6: { open: "10:00", close: "23:00" }
};

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function updateFooterYear() {
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function updateBusinessStatus() {
  if (!openStatusElement || !currentTimeElement) {
    return;
  }

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

  const days = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  const dayIndex = days.indexOf(weekdayName);
  const todaySchedule = schedule[dayIndex] || schedule[0];

  const nowInMinutes = hour * 60 + minute;
  const openInMinutes = timeToMinutes(todaySchedule.open);
  const closeInMinutes = timeToMinutes(todaySchedule.close);
  const isOpen = nowInMinutes >= openInMinutes && nowInMinutes < closeInMinutes;

  openStatusElement.textContent = isOpen
    ? `Aberto agora • Fecha às ${todaySchedule.close}`
    : `Fechado agora • Abre às ${todaySchedule.open}`;
  openStatusElement.classList.toggle("open", isOpen);
  openStatusElement.classList.toggle("closed", !isOpen);

  currentTimeElement.textContent = `Horário local em Jauá: ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} (${weekdayName})`;
}

let lastScrollY = window.scrollY || 0;

function updateLogoWithScroll() {
  if (!scrollLogoElement) {
    return;
  }

  const currentY = window.scrollY || 0;
  const isScrollingDown = currentY > lastScrollY;

  if (isScrollingDown) {
    const moveY = Math.min(28, currentY * 0.06);
    const rotation = Math.min(22, currentY * 0.05);
    scrollLogoElement.style.transform = `translateY(${moveY}px) rotate(${rotation}deg)`;
  }

  lastScrollY = currentY;
}

updateFooterYear();
updateBusinessStatus();

window.addEventListener("scroll", updateLogoWithScroll, { passive: true });
