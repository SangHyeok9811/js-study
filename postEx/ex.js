addInput.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value === null || title.value == "") {
    alert("제목을 입력해주세요.");
    return;
  } else {
    if (content.value === null || content.value == "") {
      alert("내용을 입력해주세요.");
      return;
    }
  }
  const reader = new FileReader();
  reader.addEventListener("load", async (e) => {
    const image = e.target.result;
    // fetch로 보낸 response에 응답객체 반환
    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        // 나 json이야
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        image,
      }),
    });
    const result = await response.json();
    const { data } = result;
    const ul = document.querySelector("ul");
    ul.prepend(
      creatLi(
        data.no,
        data.title,
        data.creatorName,
        data.content,
        data.createdTime,
        data.image
      )
    );
    title.value = "";
    content.value = "";
  });
  reader.readAsDataURL(file.files[0]);
});
