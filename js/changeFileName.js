const fs = require('fs');

const dir = './'

fs.readdir(dir, function (err, files) {
	// body...
	const s = '...'
	for (var i = 0; i < files.length; i++) {
		// console.log()
		let oldPath = files[i]
		if ( path.join(__dirname, oldPath) == __filename ) {continue}
		console.log('oldPath', oldPath)

		if (oldPath.includes(s)) {

			let newPath = path.join(__dirname, oldPath.replace(s, ''))
			// console.log('newPath', newPath)

			fs.rename(oldPath, newPath, function (err) {
				// body...
				if (err) {throw err}
			})

		}
		// break
	}

})
