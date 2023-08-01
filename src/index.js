// - Миллион - 1 000 000;
// - Биллион - 1 000 000 000;
// - Триллион - 1 000 000 000 000.
// 1 - 19
// 20 - 99
// 100 - one hundred
//     1 -20
//     21 - 99
// 1000 - one thousand
// ----DD
//      01 - 19
//      20 - 99
// --HDD hundred
//      01 - 09  
// TTHDD thousand 
//      01 - 19
//      20 - 99

module.exports = function toReadable(number) {
  if (number === 0) {
    return 'zero';
  }

  let result = '';
  let largeNumber = 0;
  while (number > 0) {
    // console.log(`toReadable: ${number}`);
    const digit3 = number % (10 ** 3);
    const hundreds = Math.trunc(digit3 / 10 ** 2);
    const tens = digit3 % (10 ** 2);
    const strTens = tensToStr(tens);
    const strHandreds = handredsToStr(hundreds);
    const strLargeNumber = largeNumberToStr(largeNumber);

    let str = strTens;
    // console.log(`toReadable: ${str}`);

    let separator = strHandreds.length > 0 && str.length > 0 ? ' ' : '';
    str = `${strHandreds}${separator}${str}`;
    // console.log(`toReadable: ${str}`);
    separator = strLargeNumber.length > 0 && str.length > 0 ? ' ' : '';
    str = `${str}${separator}${strLargeNumber}`;
    // console.log(`toReadable: ${str}`);

    separator = result.length > 0 && str.length > 0 ? ' ' : '';
    result = `${str}${separator}${result}`;

    number = Math.trunc(number / (10 ** 3));
    largeNumber++;
    if (largeNumber > 6) {
      return `too large number`;
    }
  }
  // console.log(`toReadable return: ${result}`);

  return result.trimEnd();
};

function digitToStr(digit) {
  // console.log(`digitToStr: ${digit}`);
  const digitNames = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
  ];
  // 0 - 19
  return digitNames[digit];
}

function tensToStr(tens) {
  // console.log(`tensToStr: ${tens}`);
  const tensNames = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
  ];
  if (tens < 20) {
    return digitToStr(tens);
  }
  const tensStr = tensNames[Math.trunc(tens / 10)];
  const digitStr = digitToStr(tens % 10);
  const separator = tensStr.length > 0 && digitStr.length > 0 ? ' ' : ''

  return `${tensStr}${separator}${digitStr}`;
}

function handredsToStr(hundreds) {
  // console.log(`handredsToStr: ${hundreds}`);
  if (hundreds === 0) {
    return '';
  }
  return `${digitToStr(hundreds)} hundred`
}

function largeNumberToStr(largeNumber) {
  // console.log(`largeNumberToStr: ${largeNumber}`);
  const largeNumberNames = [
    '', // less thousand
    'thousand',
    'million',
    'milliard',
    'billion',
    'billiard',
    'trillion'
  ];
  return largeNumberNames[largeNumber];
}