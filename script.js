const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}
// main function
function downloadImages() {
  // clear previous results
  output.innerHTML = "";
  errorDiv.textContent = "";
  // show loading spinner
  loading.style.display = "block";
  // start downloading all images in parallel
  const promises = images.map((img) => downloadImage(img.url));
  Promise.all(promises)
    .then((downloadedImages) => {
      // hide spinner
      loading.style.display = "none";
      // append images to output
      downloadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      // hide spinner
      loading.style.display = "none";
      // show error message
      errorDiv.textContent = err;
    });
}
// button click event
btn.addEventListener("click", downloadImages);
