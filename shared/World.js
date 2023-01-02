module.exports = class World {
	constructor(actions) {
		console.assert(
			typeof actions !== "undefined"
			&& typeof actions === "object",
			"Actions must be defined!"
		)

		this.actions = {};

		this.history = []
		this.state = {}
	}

	registerAction(name, callback) {
		this.actions[name] = callback
	}

	doAction(name, ...args) {

	}
}