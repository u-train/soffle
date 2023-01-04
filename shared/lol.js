module.exports =(callback) => {
	let counter = 0
	let id = setInterval(() => {
		counter++
		callback(counter)
	}, 1000)

	return () =>
		clearInterval(id)
}