let peopleArr = [
	{
		"fName": "John",
		"address": "100 N. Main",
		"phone": "+1-(123)-456-7890",
		"lName": "Smith",
	},
	{
		"fName": "John",
		"address": "100 N. Main",
		"phone": "+1-(123)-456-7890",
		"lName": "Doe",
	},
	{
		"fName": "John",
		"address": "100 N. Main",
		"phone": "+1-(123)-456-7890",
		"lName": "Brown",
	},
	{
		"fName": "John",
		"address": "100 N. Main",
		"phone": "+1-(123)-456-7890",
		"lName": "Akins",
	}
];

let activeArr = ["Smith", "Brown"];

let sortLName = (a, b) => {
	let lNameA = a.lName.toLowerCase();
	let lNameB = b.lName.toLowerCase();

	return lNameA < lNameB ? -1 : lNameA > lNameB ? 1 : 0
}

const sortParsePeople = (people, active) => 
    people.sort(sortLName).map(({fName, lName, phone, address}) => ({
        name: `${fName} ${lName}`, 
        phone, 
        address, 
        active: active.indexOf(lName) != -1
    }))

console.log(sortParsePeople(peopleArr, activeArr));
