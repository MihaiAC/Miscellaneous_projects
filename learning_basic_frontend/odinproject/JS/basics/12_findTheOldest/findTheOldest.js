function getDeathDate(person) {
    if (Object.hasOwn(person, "yearOfDeath")) {
        return person["yearOfDeath"];
    } else {
        return new Date().getFullYear();
    }
}

function calculateAge(person) {
    return getDeathDate(person) - person["yearOfBirth"];
}

function returnOlderPerson(person1, person2) {
    if (calculateAge(person1) > calculateAge(person2)) {
        return person1;
    }
    return person2;
}

function findTheOldest(people) {
    return people.reduce(returnOlderPerson);
}

// Do not edit below this line
module.exports = findTheOldest;
