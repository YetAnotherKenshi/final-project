export function setOfObjects(array) {
	const newArray = [];
	const ids = [];
	for (let obj of array) {
		if (!ids.includes(obj._id)) {
			newArray.push(obj);
			ids.push(obj._id);
		}
	}
	return newArray;
}
