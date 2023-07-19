console.log("run");
console.log("1번-----------");
// const ageTable = document.querySelector("#age-table");
const ageTable = document.getElementById("age-table");
console.log(ageTable);

console.log("2번------------");
// const ageLabel = ageTable.querySelectorAll("td > label");
const ageLabel = ageTable.getElementsByTagName("label");
console.log(ageLabel);

console.log("3번-----------");
const ageAge = ageTable.querySelector("tbody > tr > td");
// const ageAge = table.querySelector("td");
console.log(ageAge);

console.log("4번-------------");
const nameSearch = document.querySelectorAll("form[name='search']");
console.log(nameSearch);

console.log("5번------------");
const firstInput = document.querySelector("input");
console.log(firstInput);

console.log("6번------------");
