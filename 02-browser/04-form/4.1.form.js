// (() => {
//   const ageForm = document.querySelector("form");
//   const ages = ageForm.querySelectorAll("input[name='age']");
//   console.log(ages);

//   // 반복문으로 체크된 요소를 탐색
//   for (let age of ages) {
//     if (age.checked) {
//       console.log(age.value);
//     }
//   }

//   // 셀렉터로
//   const checkedAge = ageForm.querySelector("input[name='age']:checked");
//   console.log(checkedAge.value);

//   // DOM API 탐색해서 라디오 값을 조회
//   // 라디오 값: 그룹목록 중에서 선택된 라디오의 값
//   // document.forms[0].elements.age.value

//   // const ageForm = document.forms[0];
//   // const ages = ageForm.elements["age"];
//   // console.log(ages);
//   // console.log(ages.value);
// })(); // 함수실행

(() => {
  const ageForm = document.querySelector("form");
  const checkedFruit = ageForm.querySelectorAll("input[name='fruit']:checked");
  console.log(checkedFruit);
  // 선택된 값 배열로 변환
  // ['banana','kiwi']
  const values = Array.from(checkedFruit).flatMap((check) => check.value);
  console.log(values);
})();
