const btn = document.querySelector("button");

// btn.onclick = function () {
//   alert("클릭!");
// };

function sayThanks() {
  alert("감사합니다.");
  // 이벤트 리스너 제거
  // ("이벤트명", 함수명)
  btn.removeEventListener("click", sayThanks); // 한번 실행되고 함수를 지워버림
}

// 함수의 이름은  함수본체의 대리자(deligate)
btn.addEventListener("click", sayThanks);

btn.addEventListener("click", (event) => {
  // console.log(this);
  console.log(event.target);
  alert("클릭-화살표");
});

// 이벤트 수신기(함수) 추가
btn.addEventListener("click", () => {
  console.log(this);
  alert("클릭-화살표"); // this 화살표는 this가 나옴
});

btn.addEventListener("click", function () {
  console.log(this);
  alert("클릭-선언식"); // button button이 실행시킨다
});
