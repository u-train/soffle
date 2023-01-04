module.exports =(world) => {
	world.tick = 0
	
	return () => {
		world.tick++

		return () => {
			world.tick--
		}
	}
}