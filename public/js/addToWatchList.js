const testText = document.querySelector("#testText");
const btn = document.querySelector("#changeColor");

const display = (title) => {
  console.log(title.name)
  title.sources.map((source) => console.log("sourceName: " + source.sourceName))
  console.log("i'm in the event listener")
}

btn.addEventListener("click", display)