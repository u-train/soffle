const express = require("express")
const Bundler = require("parcel-bundler")
const process = require("process")
const lol = require("./shared/lol.js")

const bundler = new Bundler("public/index.html", {
	outDir: "public_build",
	publicUrl: "/public"
})

const app = express()
app.use(bundler.middleware())
app.use("/shared", express.static("shared"))

app.listen(3000, () => console.log(`Server started, ${lol}`))