const World = require("shared/World.js")
const Screen = require("shared/Screen.js")
const Planet = require("shared/entities/Planet")
const Player = require("shared/entities/Player")

const HEIGHT = 480
const WIDTH = 720
const INPUT_LATENCY = 200
const TICK_RATE = 1000 / 20

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
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
let player = world.addEntity(Player, "Bob", "#f00")
let screen = new Screen(world, canvas, player.id)

let planetA = world.addEntity(Planet, player.id, { x: 100, y: 200 }, 16)
let planetB = world.addEntity(Planet, world.neutral.id, { x: 100, y: 100 }, 16)

planetB.addUnitsIn(player.id, 100)
PlanetB = planetB
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
