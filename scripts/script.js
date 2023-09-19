const cln = document.querySelectorAll(".cln"),
  ans = document.querySelector(".ans"),
  btn = document.querySelector(".search__button"),
  slt = document.querySelector(".search__select"),
  input = document.querySelector(".search__input");

const setAns = (matches) => {
  if (matches > 0) {
    ans.textContent = `Найдено совпадений: ${matches}`;
    ans.classList.add("green");
    ans.classList.remove("red");
  } else {
    ans.textContent = "Ничего не найдено";
    ans.classList.add("red");
    ans.classList.remove("green");
  }
};

const clearPrev = (el, style) => {
  el.forEach((item) => {
    for (let child of item.children) {
      child.classList.remove(style);
    }
  });
};

const toFoundMatches = (text, parent) => {
  let matchCounter = 0;
  let helper = false;

  for (let child of parent) {
    if (helper === false) {
      helper = true;
      continue;
    }

    const str = child.textContent.toLowerCase();
    if (str.length !== 0 && text.length === 0) continue;

    if (str.indexOf(text) !== -1) {
      matchCounter++;
      child.classList.add("red");
    }
  }

  return matchCounter;
};

const onBtnClick = () => {
  const text = input.value.toLowerCase();
  const index = slt.value - 1;
  const parent = cln[index].children;

  clearPrev(cln, "red");
  const matchCounter = toFoundMatches(text, parent);
  setAns(matchCounter);
};

const onKeyDown = (e) => {
  if (e.code === "Enter") {
    onBtnClick();
  }
};

btn.addEventListener("click", onBtnClick);
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keypress", (e) => {
  input.focus();
});
