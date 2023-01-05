const Planet = require("./entities/Planet")
const Player = require("./entities/Player")
const World = require("./World")

const startingAmount = 16

describe("Planet", () => {
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

	test("Planet combat occurs and no growth occurs", () => {
		const { world, playerA, playerB, planet } = warringPlanetWorld()
		
		world.tick()
		expect(planet.getUnitsFor(playerA.id).count).toBe(7)
		expect(planet.getUnitsFor(playerB.id).count).toBe(15)
	})

	test("Planet control changes when opponent wins", () => {
		const { world, playerA, playerB, planet } = warringPlanetWorld()

		// Combat should take 8 turns for the time being
		for (let i = 1; i <= 8; i++) world.tick()

		expect(planet.getUnitsFor(playerA.id).count).toBe(0)
		expect(planet.getUnitsFor(playerB.id).count).toBe(8)
		
		world.tick()

		expect(planet.isFullyControlled()).toBe(false)
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
		planetA.addUnitsIn(player.id, 16)
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

function warringPlanetWorld() {
	const world = new World()
	let playerA = world.addEntity(Player, "Bob", "#f00")
	let playerB = world.addEntity(Player, "Bob", "#f00")

	let planet = world.addEntity(Planet, playerA.id, { x: 30, y: 30 })
	planet.addUnitsIn(playerA.id, 8)
	planet.addUnitsIn(playerB.id, 16)

	return { world, playerA, playerB, planet }
}