function readArgs(args) {
	if (!args.length)
		errorMessage('Emplty arguments!');
	let equations = args.join('')
						.split(' ')
						.filter(split => split)
						.join('');
	checkForbiddenChar(equations);
	// equations = reduced(equations);
	reduced(equations);
	checkDegree(equations);
}

function errorMessage(message) {
	console.log(`Error: ${message}`);
	process.exit(1);
}

function checkForbiddenChar(arg) {
	const result = arg.replace(/\d|x| |=|\+|\/|\*|\^|-/gi, ''); 
	if (result.length)
		errorMessage('Invald symbols: ' + result);
	if (arg.split('=').length != 2)
		errorMessage('Invald polynomial');
}

function checkDegree(arg) {						
	let maxDegree = 0;
	arg.split('^').slice(1).forEach(degree => {
		degree = parseInt(degree);
		if (!degree || degree < 0)
			errorMessage('The degree of the polynomial must be a number');
		if (+degree > maxDegree)
			maxDegree = +degree;
	})
	console.log('Polynomial degree: ' + maxDegree);
	if (maxDegree > 2)
		errorMessage('The polynomial degree is strictly greater than 2, I can\'t solve.');
}

function reduced(arg) {
	const transfered = transfer(arg);
	const filtered = transfered.join('').split('X').filter(f => f.indexOf('^') != -1);
	console.log(filtered);
}

function getDegreeList(arg) {
	const degreeList = arg.split('')
}

function transfer(arg) {
	let part = arg.split('=');
	let afterEqual = searchBlock(part[0]);
	let beforeEqual = searchBlock(part[1], true);
	return afterEqual.concat(beforeEqual);
}

function searchBlock(arg, revert = false) {
	let result = arg.replace(/\+/g, '|+').replace(/-/g, '|-').split('|');
	if (revert)
		result = result.map(revert => {
			let sym = revert[0];
			if (!+sym) {
				sym = sym == '-' ? '+' : '-';
				revert = sym + revert.slice(1);
			}
			else
				revert = '-' + revert;
			return revert;
		});
	return result
}

function solve(arg) {

}

readArgs(process.argv.slice(2));
