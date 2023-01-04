const Entity = require("./Entity.js")

// TODO: Right now, assumption is that the goal and origin will never disappear.
// This will not be the case in the future, and should be fixed by...
// (1) if the goal no longer exists, return back to origin.
// (2) if the origin no longer exists, find the nearest friendly planet to return back to.
// (3) if there are no friendly planets avaliable, find the weakest enemy planet.
// (4) if there are no planets avaliable, evaporate.
// Essentially, try to recoup this unit.

module.exports = class UnitTransport extends Entity {
	static speedPerTick = 10
	type = "unitTransport"

	constructor(id, world, ownerId, originId, goalId, amountOfUnits) {
		super(id)
		this.ownerId = ownerId
		this.amountOfUnits = amountOfUnits
		this.originId = originId
		this.goalId = goalId
		this.ticksTravelled = 0

		let origin = this.getOrigin(world)
		let goal = this.getGoal(world)

		this.totalDistanceTravelling = Math.sqrt(
			Math.pow(origin.position.x - goal.position.x, 2)
			+ Math.pow(origin.position.y - goal.position.y, 2)
		)

		this.totalTicksTravelling = Math.ceil(this.totalDistanceTravelling / UnitTransport.speedPerTick)
	}

	tick(world) {
		if (!this.hasReachedGoal()) {
			this.tickMovement()
		}

		if (this.hasReachedGoal()) {
			world.removeEntity(this.id)
			let goal = this.getGoal(world)
			goal.addUnitsIn(this.ownerId, this.amountOfUnits)
		}
	}

	getOrigin(world) {
		return world.findEntity(this.originId)
	}

	getGoal(world) {
		return world.findEntity(this.goalId)
	}

	hasReachedGoal() {
		return this.ticksTravelled === this.totalTicksTravelling
	}

	// TODO: Implement combat between nearby transports.
	tickMovement() {
		this.ticksTravelled++
	}
}
