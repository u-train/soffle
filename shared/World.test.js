const Planet = require("./entities/Planet");
const Player = require("./entities/Player");
const World = require("./World")

describe("Planet growth", () => {
	test("not grow neutral worlds.", () => {
		let world = new World()
		const startingAmount = 16

		let planet = world.addEntity(Planet, world.neutral.id, { x: 50, y: 50 }, startingAmount)
		world.tick()
		expect(planet.units[0].count).toBe(startingAmount)
	})

	test("grow non-neutral worlds", () => {
		let world = new World()
		const startingAmount = 16

		let player = world.addEntity(Player, "Bob", "#f00")
		let planet = world.addEntity(Planet, player.id, { x: 50, y: 50 }, startingAmount)
		world.tick()
		expect(planet.units[0].count).toBe(startingAmount + 1)
	})
})

describe("Ticking", () => {
	test.todo("Make sure entities update in the correct order.")
})

describe("Moving units", () => {
	test.todo("Should be able to move units from one planet to another successfully")

	test.todo("Should take all if the requested unit count is more than the actual.")

	test.todo("Should do nothing if there's no units avaliable")
})