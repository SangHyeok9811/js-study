console.log("run");

const tr = document.querySelectorAll("tr");

// console.log(tr[1].children[1])
// console.log(tr.length);

const red = function () {
  for (let i = 0; i < tr.length; i++) {
    let a = tr[i];
    for (let j = 0; j < a.children.length; j++) {
      const b = a.children[j];
      if (i === j) {
        b.style.backgroundColor = "red";
      }
    }
  }
};

red();
