function calculateAge() {
    // Clear previous messages
    document.getElementById("error-message").innerText = "";
    document.getElementById("result").innerText = "";
    document.getElementById("zodiac-sign").innerText = "";
    document.getElementById("life-expectancy").innerText = "";
    document.getElementById("next-birthday").innerText = "";

    // Get the input values
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    // Get the current date
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; 
    const currentDay = today.getDate();

    // validation for the date
    if (!isValidDate(day, month, year)) {
        document.getElementById("error-message").innerText = "Please enter a valid date.";
        return;
    }
    if (year > currentYear || (year === currentYear && month > currentMonth) || (year === currentYear && month === currentMonth && day > currentDay)) {
        document.getElementById("error-message").innerText = "Please enter a date that is not in the future.";
        return;
    }

  
    let age = currentYear - year;

    // Adjust age if the birthday hasn't occurred yet this year
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        age--;
    }

   
    document.getElementById("result").innerText = `You are ${age} years old.`;

  
    const zodiacSign = getZodiacSign(day, month);
    document.getElementById("zodiac-sign").innerText = `Your zodiac sign is ${zodiacSign}.`;

  
    const lifeExpectancy = calculateLifeExpectancy(age);
    document.getElementById("life-expectancy").innerText = `Your life expectancy is approximately ${lifeExpectancy} years.`;


    const nextBirthday = getNextBirthdayCountdown(day, month);
    document.getElementById("next-birthday").innerText = `Time remaining until your next birthday: ${nextBirthday}`;
}

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day); 
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}

function getZodiacSign(day, month) {
    const zodiacSigns = [
        { sign: "Capricorn", start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
        { sign: "Aquarius", start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
        { sign: "Pisces", start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
        { sign: "Aries", start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
        { sign: "Taurus", start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
        { sign: "Gemini", start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
        { sign: "Cancer", start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
        { sign: "Leo", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
        { sign: "Virgo", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
        { sign: "Libra", start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
        { sign: "Scorpio", start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
        { sign: "Sagittarius", start: { month: 11, day: 22 }, end: { month: 12, day: 21 } }
    ];

    for (const sign of zodiacSigns) {
        if (
            (month === sign.start.month && day >= sign.start.day) ||
            (month === sign.end.month && day <= sign.end.day)
        ) {
            return sign.sign;
        }
    }

    return "Unknown";
}

function calculateLifeExpectancy(age) {
    return 80 - age;  // Assuming average life expectancy is 80 years
}

function getNextBirthdayCountdown(day, month) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextBirthday = new Date(currentYear, month - 1, day);

    
    if (nextBirthday < today) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const timeDiff = nextBirthday.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return `${daysDiff} days`;
}
