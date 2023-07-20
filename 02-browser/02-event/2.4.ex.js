const links = document.querySelectorAll("a");
console.log(links);
// const link2 = document.querySelector("a:nth-of-type(2)");
// console.log(link2);

const checkLink = (e) => {
  const check = confirm("사이트로 이동하시겠습니까?");
  if (!check) {
    e.preventDefault();
  }
};

for (let link of links) {
  link.onclick = checkLink;
}

// const links = document.querySelectorAll("a");
// console.log(links);
// // const link2 = document.querySelector("a:nth-of-type(2)");
// // console.log(link2);

// const checkLink = (e) => {
//   const check = confirm("사이트로 이동하시겠습니까?");
//   if (!check) {
//     e.preventDefault();
//   }
// };

// links.forEach((link) => (link.onclick = checkLink));

// const contents = document.querySelector("#contents");
// const links = document.querySelectorAll("a");
// // const link2 = document.querySelector("a:nth-of-type(2)");
// // console.log(link2);

// const checkLink = (e) => {
//   e.preventDefault();
//   console.log(e.target.closest("a"));
//   const check = e.target.closest("a");
//   if (check) {
//   }
// };

// contents.addEventListener("click", checkLink);
