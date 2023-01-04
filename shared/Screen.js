


module.exports = class Screen {
	currentlySelectingPlanets = false
	currentlySelectedPlanets = []
	sendingPercentage = []

	constructor(world, canvas) {
		this.elements = []
		this.world = world
		this.canvas = canvas

		canvas.addEventListener("mousemove", this.onMouseMoved.bind(this))
		this.ctx = canvas.getContext("2d")
		
	}

	onMouseMoved(event) {
		this.mouseX = event.offsetX
		this.mouseY = event.offsetY
	}

	render(ctx) {
		// let ctx = this.ctx
		let world = this.world

		ctx.fillStyle = "#222"
		ctx.fillRect(0, 0, 720, 480)

		world.entities.forEach((entity) => {
			switch (entity.type) {
				case "planet":
					const PLANET_RADIUS = 25
					const OWNERSHIP_RADIUS = PLANET_RADIUS + 4
					const UNIT_COUNT_RADIUS = OWNERSHIP_RADIUS + 10

					// Draw the planet
					let planetOwner = world.findEntity(entity.planetOwner)
					ctx.beginPath()
					ctx.arc(entity.position.x, entity.position.y, PLANET_RADIUS, 0, Math.PI * 2)
					ctx.closePath()
					ctx.fillStyle = planetOwner.color
					ctx.fill()

					// Check if hovering


					// Draw the unit counts
					let numOfUnits = entity.units.length
					let rotateAroundBy = Math.PI * 2 / numOfUnits

					ctx.textBaseline = 'middle';
					ctx.textAlign = 'center';
					for (let i = 0; i < numOfUnits; i++) {
						let currentAngle = (rotateAroundBy * i) - Math.PI / 2
						let placementY = Math.sin(currentAngle) * UNIT_COUNT_RADIUS + entity.position.y
						let placementX = Math.cos(currentAngle) * UNIT_COUNT_RADIUS + entity.position.x

						let ownerOfCurentUnits = world.findEntity(entity.units[i].owner)

						if (ownerOfCurentUnits) {
							ctx.fillStyle = ownerOfCurentUnits.color
							ctx.fillText(`${entity.units[i].count}`, placementX, placementY)
						}
					}

					// Draw the ownership level if needed.
					if (entity.planetOwnership < 1) {
						ctx.beginPath()
						ctx.arc(entity.position.x, entity.position.y, OWNERSHIP_RADIUS, -entity.planetOwnership * Math.PI * 2, 0)
						ctx.strokeStyle = planetOwner.color
						ctx.lineWidth = 3
						ctx.stroke()
					}
					break;
				case "playable":
					break;

				default:
					console.log(`Unknown entity type '${entity.type}' found while drawing.`)
			}
		})
	}
}