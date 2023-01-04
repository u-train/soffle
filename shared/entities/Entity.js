// Generally speaking, this is bad.
// We should instead have components that can be attach to entities.
/*
	class SpaceCannon {
		constructor(id) {
			super(id)
			this.units = new UnitComponent()
		}
	}
*/

// Unit component would then have stuff like...
// .transferUnits
// .moveUnitsOut
// .getUnits

module.exports = class Entity {
	type = "unknown"
	constructor(id) { this.id = id }

	holdUnits() {
		return this.units !== undefined || this.units !== null
	}

	ticks() {
		return this.tick !== undefined
	}
}