const Planet = require("./entities/Planet")

module.exports = class Screen {
	static PLANET_RADIUS = 25
	static OWNERSHIP_RADIUS = Screen.PLANET_RADIUS + 4
	static UNIT_COUNT_RADIUS = Screen.OWNERSHIP_RADIUS + 10

	constructor(world, canvas, playerId) {
		this.world = world
		this.canvas = canvas
		this.playerId = playerId

		this.mouseX = 0
		this.mouseY = 0

		this.selectingPlanets = false
		this.selectedPlanets = []

		canvas.addEventListener("mousemove", this.onMouseMoved.bind(this))
		canvas.addEventListener("mouseup", this.onMouseUp.bind(this))
		canvas.addEventListener("mousedown", this.onMouseDown.bind(this))
		this.ctx = canvas.getContext("2d")
	}

	onMouseMoved(event) {
		this.mouseX = event.offsetX
		this.mouseY = event.offsetY
	}

	onMouseDown(event) {
		// Primary mouse button.
		let thix = this
		if (event.button === 0) {
			this.world.entities.filter((entity) => entity.type === "planet").forEach((planet) => {
				if (thix.positionInPlanet(this.mouseX, this.mouseY, planet)) {
					thix.selectingPlanets = true
				}
			})
		}
	}

	onMouseUp(event) {
		if (this.selectedPlanets) {
			let maybePlanetId = this.selectedPlanets.find((planetId) => this.positionInPlanet(this.mouseX, this.mouseY, this.world.findEntity(planetId)))
			// FIXME: Technically, there could be multiple planets that qualify.
			// We do not care as that is incredibly unlikely to happen.

			if (maybePlanetId) {
				this.selectedPlanets.filter((planetId) => planetId !== maybePlanetId).forEach((planetId) => {
					this.world.findEntity(planetId).moveUnitsOff(this.world, this.playerId, maybePlanetId)
				})
			}
		}


		this.selectedPlanets = []
		this.selectingPlanets = false
	}

	positionInPlanet(x, y, planet) {
		return Math.pow(x - planet.position.x, 2) + Math.pow(y - planet.position.y, 2) < Math.pow(Screen.PLANET_RADIUS, 2)
	}

	outlinePlanet(ctx, planet) {
		ctx.beginPath()
		ctx.arc(planet.position.x, planet.position.y, Screen.PLANET_RADIUS + 1, 0, Math.PI * 2)
		ctx.strokeStyle = "#fff"
		ctx.lineWidth = 2
		ctx.stroke()
	}

	isPlanetSelected(entity) {
		return this.selectedPlanets.find((id) => id === entity.id) !== undefined
	}

	renderSelectionLines(ctx) {
		for (const planetId of this.selectedPlanets) {
			let planet = this.world.findEntity(planetId)
			if (planet.type !== "planet")
				continue

			ctx.strokeStyle = "#fff"
			ctx.beginPath();
			ctx.moveTo(planet.position.x, planet.position.y)
			ctx.lineTo(this.mouseX, this.mouseY)
			ctx.stroke()
		}
	}

	render(ctx) {
		let world = this.world

		ctx.fillStyle = "#222"
		ctx.fillRect(0, 0, 720, 480)

		if (this.selectingPlanets) {
			this.renderSelectionLines(ctx)
		}

		world.entities.forEach((entity) => {
			switch (entity.type) {
				case "planet":
					this.renderPlanet(world, entity, ctx)
					break;
				case "unitTransport":
					this.renderUnitTransport(world, entity, ctx)
					break;
				case "player":
					// Do nothing
					break;

				default:
					console.log(`Unknown entity type '${entity.type}' found while drawing.`)
			}
		})
	}

	renderUnitTransport(world, unitTransport, ctx) {
		unitTransport
	}

	renderPlanet(world, planet, ctx) {
		let planetOwner = world.findEntity(planet.ownerId)
		ctx.beginPath()
		ctx.arc(planet.position.x, planet.position.y, Screen.PLANET_RADIUS, 0, Math.PI * 2)
		ctx.closePath()
		ctx.fillStyle = planetOwner.color
		ctx.fill()

		// Is this planet selected?
		if (this.isPlanetSelected(planet)) {
			this.outlinePlanet(ctx, planet)

			// Check if hovering
		} else if (this.positionInPlanet(this.mouseX, this.mouseY, planet)) {
			// TODO: holding right mouse button should prevent it from being selected.
			this.outlinePlanet(ctx, planet)
			if (this.selectingPlanets && !this.isPlanetSelected(planet)) {
				this.selectedPlanets.push(planet.id)
			}
		}

		// Draw the unit counts
		let numOfUnits = planet.units.length
		let rotateAroundBy = Math.PI * 2 / numOfUnits

		ctx.textBaseline = 'middle'
		ctx.textAlign = 'center'

		planet.getAllUnits().map((unit, index) => {
			let currentAngle = (rotateAroundBy * index) - Math.PI / 2
			let placementY = Math.sin(currentAngle) * Screen.UNIT_COUNT_RADIUS + planet.position.y
			let placementX = Math.cos(currentAngle) * Screen.UNIT_COUNT_RADIUS + planet.position.x

			let ownerOfCurentUnits = world.findEntity(unit.ownerId)

			if (ownerOfCurentUnits) {
				ctx.fillStyle = ownerOfCurentUnits.color
				ctx.fillText(`${unit.count}`, placementX, placementY)
			}
		})

		// Draw the ownership level if needed.
		if (!planet.isFullyControlled()) {
			ctx.beginPath()
			ctx.arc(planet.position.x, planet.position.y, Screen.OWNERSHIP_RADIUS, (1 - (planet.controlLevel / Planet.TOTAL_CONTROL_UNITS)) * Math.PI * 2, 0)
			ctx.strokeStyle = planetOwner.color
			ctx.lineWidth = 3
			ctx.stroke()
		}
	}
}