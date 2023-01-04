const Planet = require("./entities/Planet")
const Player = require("./entities/Player")
const World = require("./World")

const startingAmount = 16

describe("Planet growth", () => {
	test("not grow neutral worlds.", () => {
		const world = new World()
		let planet = world.addEntity(Planet, world.neutral.id, { x: 50, y: 50 }, startingAmount)

		world.tick()
		expect(planet.units[0].count).toBe(startingAmount)
	})

	test("grow non-neutral worlds", () => {
		const world = new World()
		let player = world.addEntity(Player, "Bob", "#f00")
		let planet = world.addEntity(Planet, player.id, { x: 50, y: 50 }, startingAmount)

		world.tick()
		expect(planet.units[0].count).toBe(startingAmount + 1)
	})
})

describe("Ticking", () => {
	test("Make sure entities update in the correct order.", () => {
		const { world, player, planetA, planetB } = twoPlanetsWorld()
		expect(world.entities).toMatchSnapshot()
	})
})

describe("Moving units", () => {
	test("Should be able to move units from one planet to another successfully", () => {
		const { world, player, planetA, planetB } = twoPlanetsWorld()
		let transport = planetA.moveUnitsOff(world, player.id, planetB.id, 1)

		expect(planetA.getUnitsFor(player.id).count).toBe(0)
		expect(transport).toMatchSnapshot()

		// Should take 3 ticks.
		world.tick()
		world.tick()
		world.tick()

		expect(transport.hasReachedGoal()).toBe(true)
		expect(world.findEntity(transport.id)).toBe(undefined)

		expect(planetB).toMatchSnapshot()
	})

	test("Should do nothing if there's no units avaliable", () => {
		const { world, player, planetA, planetB } = twoPlanetsWorld()
		let transport = planetB.moveUnitsOff(world, player.id, planetB.id, 1)

		expect(transport).toBe(undefined)
	})

	test.todo("Two units should engage each other if close enough.")
})

function twoPlanetsWorld() {
	const world = new World()
	let player = world.addEntity(Player, "Bob", "#f00")
	let planetA = world.addEntity(Planet, player.id, { x: 30, y: 30 })
	let planetB = world.addEntity(Planet, player.id, { x: 60, y: 30 })

	return { world, player, planetA, planetB }
}