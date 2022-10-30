const counter = require("shared/lol.js")
console.log("hello world!")

let output = document.getElementsByTagName("output")[0]
counter((count) =>
	output.textContent = `${count} seconds`
)