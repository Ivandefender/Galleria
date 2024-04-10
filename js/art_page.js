const URL = "./data.json";
const currentArt = new URLSearchParams(window.location.search).get("art");
let currentArtIndex = new URLSearchParams(window.location.search).get("index");
// console.log(currentArt);
// console.log(currentArtIndex);

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const progressBar = document.querySelector(".progress__bar");

async function addContent() {
  const artsData = await loadData(URL);
  console.log(artsData);

  const infoHref = Object.keys(artsData).map((key) => artsData[key].name);

  const currentArtData = await getCurrentArtData(artsData);
  console.log(currentArtData);

  await new Promise((resolve, reject) => {
    insertArtData(currentArtData, artsData.length, infoHref);
    resolve();
  });
}

async function loadData(url) {
  const responce = await fetch(url);
  const artsData = await responce.json();
  return artsData;
}

function getCurrentArtData(json) {
  for (const art of json) {
    if (art.name == currentArt) {
      return art;
    }
  }
  console.warn(`Картину з назвою ${currentArt} не знайдено`);
  return null;
}

function insertArtData(artData, length, artsName) {
  if (currentArtIndex == 0) {
    prevBtn.style.opacity = "0.5";
  } else if (currentArtIndex == length - 1) {
    nextBtn.style.opacity = "0.5";
  }

  const barLength = Math.floor(progressBar.getBoundingClientRect().width);
  const line = barLength / length * (Number(currentArtIndex) + 1);
  progressBar.style.width = `${line}px`;

  if (!artData) {
    console.error("Дані про картину не можуть бути відображені");
    return;
  }

  const artImage = document.querySelector(".info__item");

  const artName = document.querySelector(".info__art-name");
  const artAuthor = document.querySelector(".info__art-author");
  const authorImage = document.querySelector(".info__author-img");

  const artDate = document.querySelector(".info__date");
  const artInfo = document.querySelector(".info__text");

  const artAuthorFooter = document.querySelector(".footer__author");
  const artNameFooter = document.querySelector(".footer__art");

  const { artist, description, images, name, source, year } = artData;

  const imgArt = document.createElement("img");
  imgArt.src = `${images.hero.large}`;
  imgArt.alt = `${name}, ${artist.name}`;
  artImage.append(imgArt);

  const imgAuthor = document.createElement("img");
  imgAuthor.src = `${artist.image}`;
  imgAuthor.alt = `${artist.name}`;
  authorImage.append(imgAuthor);

  const artInfoGeneral = document.querySelector(".info__block-text");
  const a = document.createElement("a");
  a.innerHTML = `<a class="info__source" href="${source}">Go to source</a>`;
  artInfoGeneral.append(a);

  const popupImage = document.querySelector(".popup__inner");
  const imgPopup = document.createElement("img");
  imgPopup.src = `${images.gallery}`;
  imgPopup.alt = `${name}`;
  popupImage.append(imgPopup);

  artName.textContent = name;
  artAuthor.textContent = artist.name;
  artDate.textContent = year;
  artInfo.textContent = description;
  artNameFooter.textContent = name;
  artAuthorFooter.textContent = artist.name;

  nextBtn.addEventListener("click", () => {
    if (currentArtIndex == length - 1) {
      // currentArtIndex = 0;
      return;
    }
    currentArtIndex++;

    window.location.href = `./art_page.html?art=${artsName[currentArtIndex]}&&index=${currentArtIndex}`;
  });

  prevBtn.addEventListener("click", () => {
    if (currentArtIndex == 0) {
      // currentArtIndex = length;
      return;
    }
    currentArtIndex--;

    window.location.href = `./art_page.html?art=${artsName[currentArtIndex]}&&index=${currentArtIndex}`;
  });

  const popup = document.querySelector(".popup");
  const popupOpen = document.querySelector(".view__btn");
  const popupClose = document.querySelector(".popup__btn");

  popupOpen.addEventListener("click", () => {
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  popupClose.addEventListener("click", () => {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

addContent();
