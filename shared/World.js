const Player = require("./entities/Player.js")

module.exports = class World {
	static entityOrder = ["unitTransport", "planet"]

	constructor() {
		this.currentTick = 0
		this.entities = []
		this.nextId = 0

		this.neutral = this.addEntity(Player, "neutral", "rgb(127, 127, 127)")

	}

	moveUnits(fromWhoId, fromWhere, targetId, percentageFromEach = 0.5) {
		let thix = this

		fromWhere.forEach((entityId) => {
			let entity = this.findEntity(entityId)
			if (entity.holdUnits()) return;
			entity.moveUnitsOff(thix, fromWhoId, targetId, percentageFromEach)
		})
	}

	tick() {
		let thix = this
		this.currentTick++
		this.entities.forEach(entity => {
			if (entity.ticks())
				entity.tick(thix)
		})
	}

	addEntity(entityType, ...args) {
		let newEntity = new entityType(this.nextId++, ...args)
		this.entities.push(newEntity)
		this.sortEntityList()

		return newEntity
	}

	findEntity(id) {
		return this.entities.find((maybeEntity) => maybeEntity.id === id)
	}

	sortEntityList() {
		this.entities.sort((a, b) => {
			if (a.ticks())
				if (a.type === b.type) {
					if (a.id > b.id)
						return -1
					else if (a.id < b.id)
						return 0

					console.error("Invariant broken, two entities have the same ID!", a, b)
				}

			let aOrder = World.entityOrder.findIndex((value) => value === a.type)
			let bOrder = World.entityOrder.findIndex((value) => value === b.type)

			if (aOrder < bOrder)
				return -1
			else
				return 1
		})
	}
}