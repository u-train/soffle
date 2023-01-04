const Entity = require("./Entity.js")

module.exports = class Player extends Entity {
	type = "player"

	constructor(id, name, color) {
		super(id)
		this.name = name
		this.color = color
	}
}