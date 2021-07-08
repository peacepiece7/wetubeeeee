import "regenerator-runtime";

const video = document.querySelector("video");
const videoId = video.dataset["videoid"];
const textArea = document.querySelector("#video-comments-form input");
const form = document.querySelector("#video-comments-form");

const url = `/apis/${videoId}/comments`;

async function handleComments(event) {
  let text = textArea.value;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  textArea.value = "";
}

form.addEventListener("submit", handleComments);
