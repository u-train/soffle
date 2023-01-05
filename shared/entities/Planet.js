const Entity = require("./Entity.js")
const UnitTransport = require("./UnitTransport.js")

module.exports = class Planet extends Entity {
	type = "planet"

	// The game runs at 20 ticks per second, and it should take 6 seconds to control a planet.
	static TOTAL_CONTROL_UNITS = 20 * 6

	constructor(id, ownerId, position, startingUnits = 0) {
		super(id)
		this.ownerId = ownerId
		this.controlLevel = Planet.TOTAL_CONTROL_UNITS
		this.units = [{ ownerId, count: startingUnits }]
		this.position = position
	}

	tick(world) {
		if (this.isInCombat())
			return this.tickCombat()

		this.tickControl(world)
		this.tickGrowth(world)
	}

	moveUnitsOff(world, forWhoId, targetId, percentageFromEach = 0.5) {
		let currentUnits = this.getUnitsFor(forWhoId)

		if (!currentUnits) return;
		if (currentUnits.count === 0) return;

		let actualAmount = currentUnits.count * percentageFromEach
		currentUnits.count -= actualAmount

		return world.addEntity(UnitTransport, world, forWhoId, this.id, targetId, actualAmount)
	}

	addUnitsIn(forWhoId, howMany) {
		let unit = this.getUnitsFor(forWhoId)

		unit.count += howMany
	}

	isFullyControlled() {
		return this.controlLevel === Planet.TOTAL_CONTROL_UNITS
	}

	isInCombat() {
		let atLeastOnePlayerOn = false
		for (let { count } of this.units)
			if (count > 0)
				if (atLeastOnePlayerOn)
					return true
				else
					atLeastOnePlayerOn = true

		return false
	}

	tickCombat() {
		// TODO: Implement real combat
		this.units.forEach((army) => {
			if (army.count > 0)
				army.count--
		})
	}

	tickGrowth(world) {
		if (!this.isFullyControlled() || this.isInCombat()) return;
		if (this.ownerId === world.neutral.id) return;

		this.getUnitsFor(this.ownerId).count += 1
	}

	tickControl(world) {
		if (this.isInCombat()) return;

		let currentConqueror = this.potentialConqueror()
		if (!currentConqueror) return;

		if (currentConqueror === this.ownerId) {
			if (!this.isFullyControlled()) {
				this.controlLevel++
			}
		} else {
			this.controlLevel--

			if (this.controlLevel <= 0) {
				this.ownerId = currentConqueror
			}
		}
	}

	potentialConqueror() {
		let playerId

		for (let army of this.units) {
			if (army.count > 0) {
				if (playerId) return undefined;

				playerId = army.ownerId
			}
		}

		return playerId
	}

	getUnitsFor(id) {
		let unit = this.units.find((maybeUnit) => maybeUnit.ownerId === id)

		if (!unit) {
			unit = { ownerId: id, count: 0 }
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