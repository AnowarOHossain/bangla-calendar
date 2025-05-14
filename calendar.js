// Bangla numerals and month names
const banglaNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const banglaMonths = [
    'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
    'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
];
const banglaDaysInMonth = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];

// Convert number to Bangla numerals
function toBanglaNumerals(num) {
    return num.toString().split('').map(digit => banglaNumerals[parseInt(digit)]).join('');
}

// Convert Gregorian date to Bangla date
function gregorianToBangla(year, month, day) {
    const banglaEpoch = new Date(594, 3, 14); // Bangla calendar starts 14 April 594 AD
    const gregorianDate = new Date(year, month, day);
    const diffDays = Math.floor((gregorianDate - banglaEpoch) / (1000 * 60 * 60 * 24));
    let banglaYear = Math.floor(diffDays / 365.25) + 1;
    let banglaMonth = 0;
    let banglaDay = day;

    // Adjust for Bangla calendar months
    const startOfBanglaYear = new Date(year, 3, 14); // 14 April
    if (gregorianDate < startOfBanglaYear) {
        banglaYear--;
        banglaMonth = Math.floor((month + 12 - 4) % 12);
    } else {
        banglaMonth = Math.floor((month - 4 + 12) % 12);
    }

    // Adjust day based on Bangla month start
    const daysSinceBanglaYearStart = Math.floor((gregorianDate - startOfBanglaYear) / (1000 * 60 * 60 * 24));
    banglaDay = (daysSinceBanglaYearStart % banglaDaysInMonth[banglaMonth]) + 1;
    if (banglaDay <= 0) {
        banglaDay += banglaDaysInMonth[(banglaMonth - 1 + 12) % 12];
        banglaMonth = (banglaMonth - 1 + 12) % 12;
    }

    return { year: banglaYear, month: banglaMonth, day: banglaDay };
}

// Calendar state
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Render calendar
function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    const today = new Date();

    // Update calendar title with Bangla year
    const banglaDate = gregorianToBangla(currentYear, currentMonth, 1);
    document.getElementById('calendar-title').innerText = 
        `বাংলা ক্যালেন্ডার-${toBanglaNumerals(banglaDate.year)}`;

    // Update month and year header
    document.getElementById('month-year').innerText = 
        `${banglaMonths[banglaDate.month]} ${toBanglaNumerals(banglaDate.year)} / ${firstDay.toLocaleString('en-US', { month: 'long' })} ${currentYear}`;

    // Clear previous days
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';

    // Add empty cells for days before the first day
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty-day';
        calendarDays.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        const banglaDate = gregorianToBangla(currentYear, currentMonth, day);
        dayElement.innerHTML = `
            <div class="text-base font-semibold">${toBanglaNumerals(banglaDate.day)}</div>
            <div class="text-xs text-gray-600">${day}</div>
        `;
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayElement.classList.add('current-day');
        }
        calendarDays.appendChild(dayElement);
    }
}

// Change month
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

// Initial render
renderCalendar();