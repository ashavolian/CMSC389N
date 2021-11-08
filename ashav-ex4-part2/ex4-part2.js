// =========================================
// DO NOT MODIFY This code block
const url =
  "http://api.nobelprize.org/v1/prize.json";

const winners = [];
console.log("Starting fetch");
fetch(url)
  .then(resp => resp.json())
  .then(data => winners.push(...data.prizes));
// =========================================

// The following line displays the winner data in console for you.
console.log(winners);

/*
Your task is to complete the functions described below according to the
description given in comments.
*/

/*
(1) Display the list of 2021 winners. 

Output: An array of strings where each contains the category and the winner
names in the following format:

<category> : <firstname 1> <surname 1> / <firstname 2> <surname 2> / ...

- The first letter of the category should be capitalized. 
- If surname does not exist, use just firstname.
- If there is no winner for a category, use 'Not Awarded' as the winner name.
- The output should be sorted by category in ascending order
*/

function winner2021() {
  const current = winners.filter(a => a.year == '2021');
  const sorted = [current.filter(a => a.category == "literature"),
  current.filter(a => a.category == "peace"),
  current.filter(a => a.category == "economics"),
  current.filter(a => a.category == "medicine"),
  current.filter(a => a.category == "chemistry"),
  current.filter(a => a.category == "physics")];

  const strings = sorted.map(a => `${a[0].category.charAt(0).toUpperCase() + a[0].category.slice(1)}: ${a.map(b => b.laureates.map(c => `${c.firstname} ${c.surname}`).join(' / ')).join(' / ')}`);
  return convertToHTML(strings.sort());

}

/*
(2) Display the list of all Nobel peace winners, sorted by year, in an ascending
order.

Output: An array of strings where each contains the year and the winner names in
the following format:

<year> : <firstname 1> <surname 1> / <firstname 2> <surname 2> / ...

- If surname does not exist, use just firstname.
- If there is no winner for a year, use 'Not Awarded' as the winner name part
- 'Not Awarded' must be displayed in bold
- 2021 winner(s) must be displayed in blue, bold font.
- The output should be sorted by award year in ascending order
*/
function peaceWinners() {
  peace = winners.filter(a => a.category == 'peace')
  peace = peace.sort((a, b) => parseInt(a.year) -parseInt(b.year))
  yr = 2021

  byYear = new Array(yr - 1901)

  function addNames(a){
    try {
      return a.laureates.map(b => `${b.firstname} ${b.surname}`).join(' / ')
    } catch (err){
      return '<b>Not Awarded</b>'
    }
    
  }

  peace.forEach(a => byYear[yr - parseInt(a.year)] = `${addNames(a)}`);
  byYear = byYear.map(b => yr-- + ': ' + b);
  byYear = byYear.sort((a, b) => parseInt(a.substr(0, a.indexOf(':'))) - parseInt(b.substr(0, b.indexOf(':'))))
  return convertToHTML(byYear);
}

/*
(3) Display the total number of all Nobel Chemistry winners and also display the
counts of the years in which only one laureate was awarded, two laureates were
awarded, and three laureates were awarded. 

Output: Just an integer, followed by the 1-laureate, 2-laureate, and
3-laureate count)

For example, if only one laureates for 60 years, two laureates for 23 year, and
three laureates for 28 years, then, the output should be: 

190 (60, 23, 28)

- Consider a group as a winner.
- Display the output as underlined and 3 times bigger than the font of the body
  font size.
- Note that the prize was not awarded for some years. 
*/
function countChemistryWinners() {

  function winnersCount(a, count) {
    try {
      return a.laureates.length == count;
    } catch(err){
      return false;
    }
  }

  const chem = winners.filter(a => a.category == 'chemistry');
  const l1 = chem.filter(a => winnersCount(a, 1)).length;
  const l2 = chem.filter(a => winnersCount(a, 2)).length;
  const l3 = chem.filter(a => winnersCount(a, 3)).length;
  const str = `<u style = "font-size: 3rem;">${l1 + (l2 * 2) + (l3 * 3)} (${l1}, ${l2}, ${l3})</u>`;

  return convertToHTML([str]);

}

/* 
(4) Display the names of the winner(s) who won the prize 2 or more times

Output: An array of strings where each contains the winner name, category, and
year in the following format:

<firstname 1> <surname 1> (<category> <year>)

Note that same id is used in the data for each distinct laureate
*/
function multiTimeWinner() {

winnerStr = []

function addWinners(a){
  try {
    return a.laureates.forEach(b => (b.surname != null) ? winnerStr.push(`${b.firstname} ${b.surname} (${a.category})`) : winnerStr.push(`${b.firstname} (${a.category})`))
  } catch(err){
    return false;
  }
}
const multi = []
function getMulti(a, i){
  try{
    prev = winnerStr[i-1].substr(0, winnerStr[i-1].indexOf('('));
    next = winnerStr[i+1].substr(0, winnerStr[i+1].indexOf('('));
    cur = a.substr(0, a.indexOf('('));
    if (cur == prev || cur == next){
      multi.push(a);
    }
  } catch (err){

  }
}
winners.forEach(a => addWinners(a))
winnerStr = winnerStr.sort();
winnerStr.forEach((a, i) => getMulti(a, i))

return convertToHTML(multi);

}


// Utility function that takes an array of strings and converts into arrays into
// separate HTML list elements. (Hint: Use this to generate a series of list
// items from an array.)
function convertToHTML(query) {
  const results = query.map(e => `<li>${e}</li>`).join("");
  laureateList.innerHTML = results;
}

// A javascript reference to the unordered list with classname list. 
// (Hint: Use this!)
const laureateList = document.querySelector(".list");
console.log(laureateList);
