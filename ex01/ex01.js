function createSection(no, title, content, creatorName, createdTime) {
  const section = document.createElement("section");
  section.dataset.no = no;
  section.innerHTML = `
  <li>${no}</li></hr>
  <li><u>게시자</u></br></br>${creatorName}</li><hr>
  <h3><u>제목</u></br></br>${title}</h3><br>
  <li><u>본문</u></br></br>${content}</li><hr>
  <li><u>생성시간</u></br></br>
 ${new Date(createdTime).toLocaleString()}</li>`;
  return section;
}

(async () => {
  const data = await fetch("http://localhost:8080/posts");

  const result = await data.json();
  console.log(result);

  const body = document.querySelector("body");

  for (let item of result) {
    body.append(
      createSection(
        item.no,
        item.creatorName,
        item.title,
        item.content,
        item.createdTime
      )
    );
  }
})();

// 추가폼 처리
(() => {
  const form = document.querySelector("form");
  const input = form.querySelector("input");
  const inputContent = form.querySelector("textarea");

  const title = input;
  const content = inputContent;

  const add = form.querySelector("button");

  add.addEventListener("click", async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/posts", {
      // HTTP Method
      method: "POST",
      // 보낼 데이터 형식은 json
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
      }),
    });
    console.log(response);
    const result = await response.json();
    console.log(result);

    const div = document.querySelector("div");
    // 삭제할 때 사용하려고 데이터 속성을 추가함

    div.prepend(
      createSection(
        result.data.no,
        result.data.creatorName,
        title.value,
        content.value,
        result.data.createdTime
      )
    );
    form.reset();
    console.log("추가폼 처리 코드");
  });
})();

// (async () => {
//   const body = document.querySelector("body");

//   // 1. fetch, 서버에서 데이터 가져오기
//   const url = "http://localhost:8080/posts";
//   const response = await fetch(url);
//   const result = await response.json();
//   console.log(result);

//   // 배열 메서드를 사용하기 위해서...
//   const data = Array.from(result);
//   console.log(data);

//   // 2.-- 데이터배열 반복문으로 html문자열 만들고,
//   // 컨테이너에 추가
//   data.forEach((item) => {
//     const template = `<div style="width: 500px;" data-no="${item.no}">
//       <em>${item.creatorName}</em>
//       <hr>
//       <h3>${item.title}</h3>
//       <p>${item.content}</p>
//       <hr>
//       <small>${new Date(item.createdTime).toLocaleString()}</small>
//     </div>`;
//     body.insertAdjacentHTML("beforeend", template);
//   });
// })();
