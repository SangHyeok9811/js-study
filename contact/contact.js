// template: UI형식의 틀
function createRow(name, phone, email, image) {
  // 1. 요소 생성
  const tr = document.createElement("tr");

  // 2. 요소의 속성 설정
  tr.dataset.email = email;
  tr.innerHTML = `
  <td>${name}</td>
  <td>${phone}</td>
  <td>${email}</td>
  <td><img width="auto" height="30" src="${image}" alt="${name}"></td>`;
  return tr;
}

// 데이터 조회 및 목록 생성
(async () => {
  const response = await fetch("http://localhost:8080/contacts");

  // 결과가 배열
  const result = await response.json();
  console.log(result);

  const tbody = document.querySelector("tbody");

  // 배열 반복을 해서 tr만든다음에 tbody 가장 마지막 자식에 추가
  for (let item of result) {
    tbody.append(createRow(item.name, item.phone, item.email, item.image));
  }
  console.log("연동?");
})();

// 추가폼 처리
(() => {
  const form = document.forms[0];
  const inputs = form.querySelectorAll("input");

  const name = inputs[0];
  const phone = inputs[1];
  const email = inputs[2];
  const file = inputs[3]; // input type="file"

  const add = form.querySelector("button");

  add.addEventListener("click", (e) => {
    e.preventDefault();

    if (email.value === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (name.value === "") {
      alert("이름을 입력해주세요.");
      return;
    }

    if (phone.value === "") {
      alert("전화번호를 입력해주세요.");
      return;
    }

    const reader = new FileReader();
    // reader로 파일을 읽기가 완료되면 실행되는 이벤트 핸들러 함수
    reader.addEventListener("load", async (e) => {
      console.log(e);
      // file -> base64 data-url
      const image = e.target.result;

      // -- 서버전송하면 UI 생성

      // 서버에  데이터를 전송
      // fetch(url, options)
      const response = await fetch("http://localhost:8080/contacts", {
        // await를 쓰지않으면 코드가 기다리지않고 돌아감
        // HTTP Method
        method: "POST",
        // 보낼 데이터 형식은 json
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          phone: phone.value,
          email: email.value,
          image,
        }),
      });
      console.log(response);

      const result = await response.json();
      console.log(result);

      // 화면에 요소를 추가하는 것은 데이처리가 정상적으로 된 다음에
      // 서버에서 응답받은 데이터
      const { data } = result;

      // --- 3. 어딘가(부모, 다른요소)에 추가한다(append, prepend);

      document
        .querySelector("tbody")
        .prepend(createRow(data.name, data.phone, data.email, data.image));
      form.reset();
    });
    // 파일을 dataURL(base64)로 읽음
    reader.readAsDataURL(file.files[0]);

    return;

    // // 서버에  데이터를 전송
    // // fetch(url, options)
    // const response = await fetch("http://localhost:8080/contacts", {
    //   // await를 쓰지않으면 코드가 기다리지않고 돌아감
    //   // HTTP Method
    //   method: "POST",
    //   // 보낼 데이터 형식은 json
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email.value,
    //     name: name.value,
    //     phone: phone.value,
    //   }),
    // });
    // console.log(response);
    // const result = await response.json();
    // console.log(result);

    // // 화면에 요소를 추가하는 것은 데이처리가 정상적으로 된 다음에
    // // --- 3. 어딘가(부모, 다른요소)에 추가한다(append, prepend);

    // const tbody = document.querySelector("tbody");
    // const tr = document.createElement("tr");
    // // 삭제할 때 사용하려고 데이터 속성을 추가함

    // tbody.prepend(createRow(name.value, phone.value, email.value));
    // form.reset();
  });

  console.log("추가폼 처리 코드");
})();

// 삭제폼
(() => {
  const form = document.forms[1];

  const email = form.querySelector("input");
  const del = form.querySelector("button");

  del.addEventListener("click", async (e) => {
    e.preventDefault();

    // 서버통신
    await fetch(`http://localhost:8080/contacts/${email.value}`, {
      method: "DELETE",
    });
    const tr = document.querySelector(`tr[data-email="${email.value}"]`);

    if (!tr) {
      alert("해당 이름의 이메일이 없습니다.");
      return;
    }

    tr.remove();

    form.reset();
  });
})();