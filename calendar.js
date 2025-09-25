// Bangla numerals, month names, weekdays, and seasons
const banglaNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const banglaMonths = [
  'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
  'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
];
const banglaWeekdays = [
  'রবিবার', 'সোমবার', 'মঙ্গলবার',
  'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
];
const banglaSeasons = [
  'গ্রীষ্ম', 'গ্রীষ্ম', 'বর্ষা', 'বর্ষা',
  'শরৎ', 'শরৎ', 'হেমন্ত', 'হেমন্ত',
  'শীত', 'শীত', 'বসন্ত', 'বসন্ত'
];

// Transition dates for Bangla months in Gregorian calendar
const banglaDates = [
  [3, 14, 0],  // 14 April: 1 Boishakh
  [4, 15, 1],  // 15 May: 1 Joishtho
  [5, 15, 2],  // 15 June: 1 Asharh
  [6, 16, 3],  // 16 July: 1 Shraban
  [7, 16, 4],  // 16 August: 1 Bhadra
  [8, 16, 5],  // 16 September: 1 Ashwin
  [9, 16, 6],  // 16 October: 1 Kartik
  [10, 15, 7], // 15 November: 1 Agrahayon
  [11, 15, 8], // 15 December: 1 Poush
  [0, 14, 9],  // 14 January: 1 Magh
  [1, 13, 10], // 13 February: 1 Falgun
  [2, 14, 11]  // 14 March: 1 Choitro
];

// Convert a number to Bangla numerals
function toBanglaNumerals(num) {
  return num.toString()
    .split('')
    .map(d => banglaNumerals[parseInt(d)] || d)
    .join('');
}

// Convert a Gregorian date to Bangla date components
function gregorianToBangla(year, month, day) {
  // Compute Bangla year
  let banglaYear = year - 593;
  if (month < 3 || (month === 3 && day < 14)) {
    banglaYear--;
  }

  // Find the current Bangla month start
  let bMonth = 0, bDay = day;
  
  // Special handling for the December-January transition (Poush to Magh)
  // If we're in December after the 15th, we're in Poush
  if (month === 11 && day >= 15) {
    bMonth = 8; // Poush
    bDay = day - 15 + 1;
    return { year: banglaYear, month: bMonth, day: bDay };
  }
  
  // If we're in January before the 14th, we're still in Poush
  if (month === 0 && day < 14) {
    bMonth = 8; // Still Poush
    // Calculate days: days left in December + days in January
    const daysInDec = 31;
    bDay = (daysInDec - 15 + 1) + day;
    return { year: banglaYear, month: bMonth, day: bDay };
  }
  
  // Handle other months normally
  for (let i = 0; i < banglaDates.length; i++) {
    const [gm, gd, bm] = banglaDates[i];
    const next = banglaDates[(i + 1) % banglaDates.length];
    const [ngm, ngd] = next;

    // Handle year boundary when checking "next" month
    let checkNextMonth = ngm;
    let checkNextYear = year;
    if (gm > ngm) {
      // This means we're crossing a year boundary
      checkNextYear = year + 1;
    }

    const afterStart = (month > gm) || (month === gm && day >= gd);
    
    // Check if before next month's start, considering year boundary
    let beforeNext = false;
    if (year < checkNextYear) {
      beforeNext = true;
    } else if (year === checkNextYear) {
      beforeNext = (month < checkNextMonth) || (month === checkNextMonth && day < ngd);
    }

    if (afterStart && beforeNext) {
      bMonth = bm;
      // Days since the Bangla month started
      if (month === gm) {
        bDay = day - gd + 1;
      } else {
        // Count full days across intervening Gregorian months
        let count = new Date(year, gm + 1, 0).getDate() - gd + 1;
        let m = gm + 1;
        let y = year;
        
        // If we crossed a year boundary
        while (m !== month) {
          count += new Date(y, m + 1, 0).getDate();
          m++;
          if (m > 11) {
            m = 0;
            y++;
          }
        }
        
        bDay = count + day;
      }
      break;
    }
  }

  return { year: banglaYear, month: bMonth, day: bDay };
}

// Calendar state
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Render the calendar grid
function renderCalendar() {
  const today = new Date();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = firstDay.getDay();

  // Determine overlapping Bangla months
  const firstBangla = gregorianToBangla(currentYear, currentMonth, 1);
  const lastBangla = gregorianToBangla(currentYear, currentMonth, daysInMonth);
  const monthA = firstBangla.month;
  const monthB = lastBangla.month;

  // Update header
  const titleEl = document.getElementById('calendar-title');
  const headerEl = document.getElementById('month-year');
  const daysContainer = document.getElementById('calendar-days');
  titleEl.innerHTML = '<span class="title-highlight">বাংলা ক্যালেন্ডার</span>';
  headerEl.innerHTML = `
    <div class="month-year-container">
      <span class="bangla-month">
        ${banglaMonths[monthA]}${monthA !== monthB ? ' - ' + banglaMonths[monthB] : ''}
      </span>
      <span class="bangla-year">${toBanglaNumerals(firstBangla.year)} বঙ্গাব্দ</span>
      <span class="english-month">
        ${firstDay.toLocaleString('en-US',{month:'long'})} ${currentYear}
      </span>
    </div>`;

  // Populate days
  daysContainer.innerHTML = '';
  
  // Empty days at the beginning
  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day empty-day';
    daysContainer.appendChild(emptyCell);
  }
  
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    const bDate = gregorianToBangla(currentYear, currentMonth, d);
    cell.innerHTML = `
      <div class="bangla-day-number">
        ${toBanglaNumerals(bDate.day)}
      </div>
      <div class="english-day-number">${d}</div>
      <div class="bangla-month-label">
        ${banglaMonths[bDate.month]}
      </div>`;
    if (d === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()) {
      cell.classList.add('current-day');
    }
    daysContainer.appendChild(cell);
  }
  
  // Fill remaining cells to complete the 6-week grid (42 total cells)
  const totalCells = 42;
  const filledCells = startDay + daysInMonth;
  for (let i = filledCells; i < totalCells; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day empty-day';
    daysContainer.appendChild(emptyCell);
  }
}

// Navigate months
function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

// Update "Today" section
function updateTodayInfo() {
  const now = new Date();
  const b = gregorianToBangla(now.getFullYear(), now.getMonth(), now.getDate());
  const banglaDayName = banglaWeekdays[now.getDay()];
  const banglaDay = toBanglaNumerals(b.day);
  const banglaStr = `${banglaDayName}, ${banglaDay} ${banglaMonths[b.month]} ${toBanglaNumerals(b.year)}, বঙ্গাব্দ`;
  document.getElementById('today-bangla').innerText = banglaStr;
  document.getElementById('today-english').innerText =
    now.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  document.getElementById('today-season').innerText = `ঋতু: ${banglaSeasons[b.month]}`;
}

// Update clock
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour:'numeric', minute:'2-digit', second:'2-digit', hour12:true
  }).replace(',', '');
  document.getElementById('current-time').innerText = timeString;
  setTimeout(updateTime, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  updateTodayInfo();
  updateTime();
});