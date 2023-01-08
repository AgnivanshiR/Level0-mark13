var inputDate = document.querySelector("#input-date");
var checkBtn = document.querySelector("#check-btn");
var outputEl = document.querySelector("#output");

function isPalindrome(str) {
  var reveresed = str.split("").reverse("").join("");
  if (str === reveresed) {
    return true;
  }
}
function formateDate(date) {
  var day = String(date.day).padStart(2, 0);
  var month = String(date.month).padStart(2, 0);
  var year = String(date.year);
  return [
    `${day}${month}${year}`,
    `${month}${day}${year}`,
    `${year}${month}${day}`,
    `${day}${month}${year.substring(2)}`,
    `${month}${day}${year.substring(2)}`,
    `${year.substring(2)}${month}${day}`
  ];
}
function isPalindromeAllDateFormate(date) {
  let dateString = formateDate(date);
  for (let i = 0; i < dateString.length; i++) {
    if (isPalindrome(dateString[i])) {
      return true;
    }
  }
  return false;
}
// console.log(isPalindromeAllDateFormate({day:22 , month:11 , year:2022 }))

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

function getNextDay(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromDate(date) {
  var ctr = 0;
  var nextDay = getNextDay(date);
  while (1) {
    ctr++;
    var isPalindrome = isPalindromeAllDateFormate(nextDay);
    if (isPalindrome) {
      break;
    }
    nextDay = getNextDay(nextDay);
  }
  return [ctr, nextDay];
}
// console.log(getNextPalindromDate({day: 21, month: 10, year: 2022}))

function clickHandler() {
  let dateGiven = inputDate.value;
  let dateList = dateGiven.split("-");
  let date = {
    day: Number(dateList[2]),
    month: Number(dateList[1]),
    year: Number(dateList[0])
  };
  let isPalindrome = isPalindromeAllDateFormate(date);
  if (isPalindrome) {
    outputEl.innerText = "Yes, the bday is palindrom";
  } else {
    var [ctr, nextDay] = getNextPalindromDate(date);
    outputEl.innerText = `The next palindrom date is ${nextDay.day}- ${nextDay.month}- ${nextDay.year} you missed it by ${ctr} days`;
  }
}

checkBtn.addEventListener("click", clickHandler);
