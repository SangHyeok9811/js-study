function createSection(no, title, content, creatorName, createdTime, image) {
  // 생성자(연결된 서버 필드값)을 담을 매개변수를 받음
  const section = document.createElement("section"); // section태그를 생성
  section.dataset.no = no; // 생성된 section의 data-no를 no로 지정
  // section을 아래 정의하는 html요소로 생성
  section.innerHTML = ` 
  <div>${no}</div></hr>
  <div><u>게시자</u></br></br>${creatorName}</div><hr>
  <h3><u>제목</u></br></br>${title}</h3><br>
  <div><u>본문</u></br></br>${content}</div><hr>
  <div>${
    image
      ? `<img width="auto" height="30" src="${image}" alt="${content}">`
      : ""
  }</div>
  <div><u>생성시간</u></br></br>
 ${new Date(createdTime).toLocaleString()}</div>`;
  return section; // 만들어진 section을 반환
}

const contentDiv = document.querySelector("#contentDiv"); // section을 위치시킬 기준점인 div를 지정

(async () => {
  // 비동기함수로 지정
  const data = await fetch("http://localhost:8080/posts");
  // await를 사용하여 서버로부터 데이터를 기다리며 해당코드가 진행되는동안
  // 다른 코드들이 진행되며 서버로부터 데이터를 받아왔을 경우 data에 spring 데이터를 할당

  const result = await data.json(); // 받아온 데이터를 json형태로 변환하고 result에 할당
  console.log(result);

  for (let item of result) {
    // json데이터를 순회하여 요소들로 section을 만들 매개변수를 받음
    contentDiv.append(
      createSection(
        item.no,
        item.creatorName,
        item.title,
        item.content,
        item.createdTime,
        // item.image ? item.image : null
        item.image
      )
    );
  }
})(); // 즉시실행함수

// 추가폼 처리
(() => {
  // 이벤트 함수를 제외한 부분을 즉시실행함수로 지정
  const form = document.querySelectorAll("form")[0];
  const title = form.querySelectorAll("input")[0];
  const content = form.querySelector("textarea");
  const file = form.querySelectorAll("input")[1];
  const add = form.querySelector("button");

  add.addEventListener("click", (e) => {
    // 클릭이벤트 발생
    e.preventDefault(); // 기본 이벤트를 삭제하고 사용자지정 이벤트를 정의
    async function createPost(image) {
      // 이미지를 매개변수로 받는 함수가 생성
      // 비동기함수
      const response = await fetch("http://localhost:8080/posts", {
        // 서버로 request를 보내고 response를 받은 것이 변수에 담김

        // HTTP Method 발생
        method: "POST",
        // 보낼 데이터 형식은 json형식임을 서버에 알림
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          // JSON객체 문자열형태로 반환
          title: title.value,
          content: content.value,
          image: image ? image : null,
        }),
      });

      console.log(response);
      const result = await response.json(); // result에 json 객체 할당
      console.log(result);

      // 삭제할 때 사용하려고 데이터 속성을 추가함

      contentDiv.prepend(
        createSection(
          result.data.no,
          result.data.creatorName,
          title.value,
          content.value,
          result.data.createdTime,
          result.data.image
        )
      );
      form.reset();
    }
    if (file.files[0]) {
      // 파일이 있을 때
      const reader = new FileReader();
      // reader로 파일을 읽기가 완료되면 실행되면 이벤트 핸들러 함수
      reader.addEventListener("load", async (e) => {
        console.log(e);
        // file -> base64 data-url
        const image = e.target.result;
        createPost(image);
      });
      // 파일을 dataURL(base64)로 읽음
      reader.readAsDataURL(file.files[0]);
    } else {
      // 파일이 없을 때
      createPost();
    }

    console.log("추가폼 처리 코드");
  });
})();

// 삭제폼
(() => {
  const form = document.querySelectorAll("form")[1];

  const no = form.querySelector("input");
  console.log(no);
  const del = form.querySelector("button");

  del.addEventListener("click", async (e) => {
    e.preventDefault();

    // 서버통신
    await fetch(`http://localhost:8080/posts/${no.value}`, {
      method: "DELETE",
    });
    const numSection = document.querySelector(`section[data-no="${no.value}"]`);
    console.log(no.value);
    if (!numSection) {
      alert("해당 번호 게시글이 없습니다.");
      return;
    }

    numSection.remove();

    form.reset();
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
