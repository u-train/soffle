const Entity = require("./Entity.js")
const UnitTransport = require("./UnitTransport.js")

module.exports = class Planet extends Entity {
	type = "planet"

	constructor(id, ownerId, position, startingUnits = 0) {
		super(id)
		this.ownerId = ownerId
		this.controlLevel = 1
		this.units = [{ ownerId, count: startingUnits }]
		this.position = position
	}

	tick(world) {
		if (this.isInCombat())
			this.tickCombat()
		else
			this.tickGrowth(world)
	}

	moveUnitsOff(world, forWhoId, targetId, percentageFromEach = 0.5) {
		let currentUnits = this.getUnitsFor(forWhoId)

		if (!currentUnits) return;

		let actualAmount = currentUnits.count * percentageFromEach
		currentUnits.count -= actualAmount

		world.addEntity(UnitTransport, forWhoId, targetId, numberOfUnits)
	}

	addUnitsIn(forWhoId, howMany) {
		let unit = this.getUnitsFor(forWhoId)
	
		unit.count += howMany
	}

	isFullyControlled() {
		return this.controlLevel == 1
	}

	isInCombat() {
		return this.units.length > 1
	}

	tickCombat() {
		// TODO: Implement real combat
		this.units.forEach((army) => {
			if (army.count > 0)
				army.count--
		})
	}

	tickGrowth(world) {
		if (!this.isFullyControlled() && !this.isInCombat()) return;
		if (this.ownerId === world.neutral.id) return;

		this.units[0].count += 1
	}

	getUnitsFor(id) {
		let unit = this.units.find((maybeUnit) => maybeUnit.ownerId === id)

		if (!unit) {
			unit = { ownerId: forWhoId, howMany: 0 }
			this.units.push(unit)
		}

		return unit
	}

	// Probably not the behavior we want.
	collapseUnits() {
		return this.units.forEach((unit, index) => {
			if (unit.count === 0) {
				this.units.splice(index, 1)
			}
		})
	}
}