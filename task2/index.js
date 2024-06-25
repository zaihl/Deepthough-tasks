const heroTitle = document.querySelector(".hero-content-title");
const heroDescription = document.querySelector(".hero-content-description");
const sectionTitles = document.querySelectorAll("section div.section-title");
const sectionDescriptions = document.querySelectorAll(
  "section div.section-description"
);
const sectionContents = document.querySelectorAll(
  "section div.section-content"
);


async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data;
}

async function editData(assetContainer) {
  const tasks = assetContainer["tasks"][0];
  handleHeroContent(tasks);
  for (let i = 0; i < tasks["assets"].length; i++) {
    const asset = tasks["assets"][i];
    const assetTitle = asset["asset_title"];
    const assetDescription = asset["asset_description"];
    const assetContent = asset["asset_content"];
    handleSectionTitleAndDescription(assetTitle, assetDescription, i);
    handleSectionContent(asset["asset_content_type"], assetContent, i);
  }
}
function handleHeroContent(tasks) {
  const heroTitleContent = tasks["task_title"];
  const heroDescriptionContent = tasks["task_description"];
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  h2.textContent = heroTitleContent;
  p.textContent = heroDescriptionContent;
  heroTitle.appendChild(h2);
  heroDescription.appendChild(p);
}

function handleSectionTitleAndDescription(title, description, index) {
  const p_title = document.createElement("p");
  const p_description = document.createElement("p");
  p_title.textContent = title;
  p_description.innerHTML = "<span>Description : </span>" + description;
  sectionTitles[index].appendChild(p_title);
  sectionDescriptions[index].appendChild(p_description);
}

function handleSectionContent(type, assetContent, i) {
  const child = handleSectionType(type, assetContent);
  if (child === null) return;
  sectionContents[i].appendChild(child);
}

function handleSectionType(type, assetContent) {
  if (type.toLowerCase() === "image") {
    const img = document.createElement("img");
    img.src = assetContent;
    return img;
  } else if (type.toLowerCase() === "video") {
    if (assetContent.includes("youtube")) {
      const video = document.createElement("iframe");
      video.src = assetContent;
      video.referrerPolicy = "strict-origin-when-cross-origin";
      video.width = "480";
      video.height = "291";
      return video;
    } else {
      const video = document.createElement("video");
      const src = document.createElement("source");
      src.src = assetContent;
      video.appendChild(src);
    }
    return video;
  } else if (type.toLowerCase() === "text") {
    const p = document.createElement("p");
    p.textContent = assetContent;
    return p;
  } else if (type.toLowerCase() === "link") {
    const a = document.createElement("a");
    a.href = assetContent;
    a.textContent = "Link";
    return a;
  } else if (type.toLowerCase() === "audio") {
    const audio = document.createElement("audio");
    audio.src = assetContent;
    return audio;
  } else if (type.toLowerCase() === "pdf") {
    const iframe = document.createElement("iframe");
  } else return null;
}

async function init() {
  const data = await fetchData(
    "https://raw.githubusercontent.com/zaihl/Deepthought-tasks/main/data/assetData.json"
  );
  if (data !== null) {
    editData(data);
  }
}

init();
