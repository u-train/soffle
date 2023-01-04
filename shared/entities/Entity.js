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