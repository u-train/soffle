const World = require("shared/World.js")
const Screen = require("shared/Screen.js")

const HEIGHT = 480
const WIDTH = 720
const INPUT_LATENCY = 200
const TICK_RATE = 1000 / 60

const canvas = document.getElementById("canvas")
canvas.width = WIDTH
canvas.height = HEIGHT

// So, use  SetInterval for constantly running game logic in the background
// Interval should be some tick-rate. Probably 16ms, 60 ticks per second.
// So, make a function which sets the logic up for that.

// Use requestWindowAnimation for rendering. This is simple enough.
// Maybe make a function or object that handles rendering, view.
// Consumes the world and renders it, then it can always invoke callbacks into it.

// For now, we're simpletons and just requirestwindowanimation

let world = new World()
let screen = new Screen(world, canvas)

let planet = world.createPlanet({x: 80, y: 45})
let bobId = world.createPlayable("Bob", "#f00").id
let octoberId = world.createPlayable("October", "#0ff").id

planet.units.push({owner: bobId, count: 16})
planet.units.push({owner: octoberId, count: 16})

let lastMillisecondTimeStamp = window.performance.now()
let simulationBudget = 0


function main(millisecondTimeStamp) {
	let millisecondDelta = millisecondTimeStamp - lastMillisecondTimeStamp 
	lastMillisecondTimeStamp = millisecondTimeStamp
	simulationBudget += millisecondDelta

	while (simulationBudget >= TICK_RATE) {
		world.tick(TICK_RATE)
		simulationBudget -= TICK_RATE
	}

	screen.render(ctx)
	
	window.requestAnimationFrame(main)
}

window.requestAnimationFrame(main)
