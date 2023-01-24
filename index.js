// Dont Change this
class Contestant {
    constructor(name, icon) {
        this.name = name
        this.icon = icon
        this.health = 100
        this.inventory = []
    }
}

class Element {
    constructor(type) {
        this.element = document.createElement(type)
    }
    apply(applyto) {
        applyto.appendChild(this.element)
    }
}

class Event extends Element {
    constructor(event, time) {
        super('div')
        this.element.innerHTML = eval('`' + time[event] + '`')
        this.element.className = 'event'
    }
}

class Inventories extends Element {
    constructor(otherIndex) {
        super('div')
        this.element.innerHTML = '<strong>' + contestants[otherIndex].name + '</strong>' + iterateArray(contestants[otherIndex].inventory, '<br>', ' - ') + '<br>'
        this.element.className = 'inventory'
    }
}

class Icon extends Element {
    constructor(contestant) {
        super('img')
        if (typeof contestant !== "number") {
            this.element.src = './img/' + contestant.icon
        } else if (typeof contestant == "number") {
            this.element.src = './img/' + contestants[contestant].icon
        }
        this.element.className = 'icon'
    }
}

class Wrapper extends Element {
    constructor(className) {
        super('div')
        this.element.className = className
    }
}

// Change this to change the contestants
//list of contestants
var contestants = [
    new Contestant("placeholder", "icon0.png"),
    new Contestant("placeholder1", "icon1.png"),
    new Contestant("placeholder2", "icon2.png"),
    new Contestant("placeholder3", "icon3.png"),
    new Contestant("placeholder4", "icon4.png"),
    new Contestant("placeholder5", "icon5.png"),
    new Contestant("placeholder6", "icon6.png"),
]

//Change if you want
//List of events for the bloodbath
const bloodbathEvents = [
    '${contestants[0].name} steps off the platform too early and is blown up.',
    '${contestants[0].name} impales ${contestants[1].name} with a trident near the Cornucopia.',
    '${contestants[0].name} stabs ${contestants[1].name} with a dagger near the cornucopia',
    '${contestants[0].name} runs away from the Cornucopia.',
    '${contestants[0].name} grabs a backpack with explosives.',
    '${contestants[0].name} grabs a trident leaning against the cornucopia.',
    '${contestants[0].name} grabs a dagger leaning against the cornucopia.',
    '${contestants[0].name} grabs a bow leaning against the cornucopia.', 
    '${contestants[0].name} grabs a backpack, not realising it is empty.',
    '${contestants[0].name} grabs a backpack with a lighter.',
    '${contestants[0].name} beats ${contestants[1].name} in a fight, but spares them', 
]

//Change if you want
//List of events for the bloodbath
const dayEvents = [
    "${contestants[0].name} goes hunting.",
    "${contestants[0].name} injures themself.",
    "${contestants[0].name} explores the arena.",
    "${contestants[0].name} fishes.",
    "${contestants[0].name} scares ${contestants[1].name} off.",
    "${contestants[0].name} diverts ${contestants[1].name}'s attention and runs away.",
    "${contestants[0].name} stalks ${contestants[1].name}. ",
    "${contestants[0].name} camouflages themelf in the bushes.",
    "${contestants[0].name} handcrafts a spear.",
    "${contestants[0].name} searches for a water source.",
]

// Tutorial
// - There is an array (some values inside square brackets) for each bloodbath event.
// - First value of each array is how many players are in the respective event
// - Second value is what item the *first* contestant gets ( ${contestants[0].name} ), null for nothing 
// - Third value is what item they need if any, null for nothing
// - Fourth value is if the event is fatal (if it is a one person event, ${contestants[0].name} dies, if it is a 2+ person event, everyone involved but ${contestants[0].name} dies.)
// - Fifth value is if the item needed is used/taken away after the event
const bloodbathEventsData = [
    [1, null, null, true, false],
    [2, 'Trident', null, true, false],
    [2, 'Dagger', null, true, false],
    [1, null, null, false, false],
    [1, 'Explosives', null, false, false],
    [1, 'Trident', null, false, false],
    [1, 'Dagger', null, false, false],
    [1, 'Bow', null, false, false],
    [1, null, null, false, false],
    [1, 'Lighter', null, false, false],
    [2, null, null, true, false],
]

// Same as last but for day
const dayEventsData = [
    [1, 'food', null, false, false],
    [1, -25, null, false, false],
    [1, null, null, false, false],
    [1, null, null, false, false],
    [2, null, null, false, false],
    [2, null, null, false, false],
    [2, null, null, false, false],
    [1, null, null, false, false],
    [1, 'Spear', null, false, false],
    [1, 'food', null, false, false]
]


//declaring variables
var index = 0

// ignore, its a function i made that generates a random integer for me
function ranInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// the guts of the code, specifically the bloodbath
function bloodbath() {
    console.log(contestantsNo)
    const inventoriesContainer = new Wrapper('inventories')
    inventoriesContainer.apply(document.body)
    // declare variables
    // Number of contestants (left)
    var contestantsNo = contestants.length
    // Amount of times to do an event
    var repeatNo = contestants.length
    // idk how to explain i honestly forgor what this does i have so many indexes
    let index1 = 0

    // the loop for events
    for (let i = 0; i < repeatNo; i++) {
        // Resets the inventories display to update
        inventories.innerHTML = ''

        // Picks a random event
        var event = ranInt(0, bloodbathEvents.length - 1)

        // Make sure it doesnt involve more players than the amount left to have an event in this round if that makes sense
        while (bloodbathEventsData[event][0] > contestantsNo) {
            event++
            if (event >= bloodbathEvents.length) {
                event = 0
            }
        }

        // Checks if it requires item, if it does check if the player has that item, then remove the item if need be
        if (bloodbathEventsData[event][2] != null) {
            //If player has the item
            if (contestants[0(contestants[0].name)].inventory.includes(bloodbathEventsData[event][2]) && bloodbathEventsData[event][4] == true) {
                removeItem(contestants[0].inventory, bloodbathEventsData[event][2])
            } else {
                event++
                if (event >= bloodbathEvents.length) {
                    event = 0
                }
            }
        }
        // Adding the event to the document
        let anotherIndex = 0
        const imgWrapper = new Wrapper("imgWrap")
        imgWrapper.apply(document.body)
        const eventIcon = new Icon(contestants[0]);
        eventIcon.apply(imgWrapper.element)
        if (bloodbathEventsData[event][0] > 1) {
            repeat(function () {
                repeatNo--;
                const eventIcon = new Icon(anotherIndex);
                eventIcon.apply(imgWrapper.element);
                anotherIndex++
            }, bloodbathEventsData[event][0] - 1)
        }
        const eventElement = new Event(event, bloodbathEvents)
        eventElement.apply(document.body)
        if (bloodbathEventsData[event][1] != null) {
            contestants[0].inventory.push(bloodbathEventsData[event][1])
        }
        // Fatal or not    
        if (bloodbathEventsData[event][3] == false) {
            // Non-Fatal
            for (let i = 0; i < bloodbathEventsData[event][0]; i++) {
                contestants.push(contestants[0])
                contestants.shift();
                contestantsNo--;
            }
        } else if (bloodbathEventsData[event][0] > 1) {
            // Fatal 2+ Contestants
            contestants.push(contestants[0])
            contestants.shift();
            contestantsNo--;
            for (let i = 0; i < bloodbathEventsData[event][0] - 1; i++) {
                contestants.shift();
                contestantsNo--;
            }
        } else {
            // Fatal 1 contestant
            contestants.shift();
            contestantsNo--;
        }

        // I remember what its for now its to check when its the end of the loop
        index1++
        if (index1 >= repeatNo) {
            let otherIndex = 0
            for (let i = 0; i < contestants.length; i++) {
                // Put the inventories on screen
                const inventories = new Inventories(otherIndex)
                inventories.apply(inventoriesContainer.element)
                otherIndex++
            }
        }
    }

    // Incomplete, but to go to Day 1/Next Day or Night
    const nextButton = document.createElement('button')
    nextButton.innerHTML = 'Next'
    nextButton.setAttribute('onclick', 'nextDay()')
    document.body.appendChild(nextButton)
}

// the guts of the code, specifically the day
function nextDay() {
    const inventoriesContainer = new Wrapper('inventories')
    inventoriesContainer.apply(document.body)
    // declare variables
    // Number of contestants (left)
    var contestantsNo = contestants.length
    // Amount of times to do an event
    var repeatNo = contestants.length
    // idk how to explain i honestly forgor what this does i have so many indexes
    let index1 = 0

    // the loop for events
    for (let i = 0; i < repeatNo; i++) {
        console.log(contestantsNo)
        // Resets the inventories display to update
        inventories.innerHTML = ''

        // Picks a random event
        var event = ranInt(0, dayEvents.length - 1)

        // Make sure it doesnt involve more players than the amount left to have an event in this round if that makes sense
        while(dayEventsData[event][0] > contestantsNo) {
            event++
            if (event >= dayEvents.length) {
                event = 0
            }
        }

        // Checks if it requires item, if it does check if the player has that item, then remove the item if need be
        if (dayEventsData[event][2] != null) {
            //If player has the item
            if (contestants[0].inventory.includes(dayEventsData[event][2]) && dayEventsData[event][4] == true) {
                removeItem(contestants[0].inventory, dayEventsData[event][2])
            } else {
                event++
                if (event >= dayEvents.length) {
                    event = 0
                }
            }
        }
        let anotherIndex = 0
        const imgWrapper = new Wrapper("imgWrap")
        imgWrapper.apply(document.body)
        const eventIcon = new Icon(contestants[0]);
        eventIcon.apply(imgWrapper.element)
        if (dayEventsData[event][0] > 1) {
            repeat(function () {
                repeatNo--;
                const eventIcon = new Icon(anotherIndex);
                eventIcon.apply(imgWrapper.element);
                anotherIndex++
            }, dayEventsData[event][0] - 1)
        }
        const eventElement = new Event(event, dayEvents)
        eventElement.apply(document.body)
        if (dayEventsData[event][1] != null) {
            contestants[0].inventory.push(dayEventsData[event][1])
        }

        // Fatal or not    
        if (dayEventsData[event][3] == false) {
            // Non-Fatal
            for (let i = 0; i < dayEventsData[event][0]; i++) {
                contestants.push(contestants[0])
                contestants.shift();
                contestantsNo--;
            }
        } else if (dayEventsData[event][0] > 1) {
            // Fatal 2+ Contestants
            contestants.push(contestants[0])
            contestants.shift();
            contestantsNo--;
            for (let i = 0; i < dayEventsData[event][0] - 1; i++) {
                contestants.shift();
                contestantsNo--;
            }
        } else {
            // Fatal 1 contestant
            contestants.shift();
            contestantsNo--;
        }

        // I remember what its for now its to check when its the end of the loop
        index1++
        if (index1 >= repeatNo) {
            let otherIndex = 0
            for (let i = 0; i < contestants.length; i++) {
                // Put the inventories on screen
                const inventories = new Inventories(otherIndex)
                console.log(inventories)
                inventories.apply(inventoriesContainer.element)
                otherIndex++
            }
        }
    }

    // Incomplete, but to go to Next Day or Night
    const nextButton = document.createElement('button')
    nextButton.innerHTML = 'Next'
    nextButton.setAttribute('onclick', 'nextNight()')
    document.body.appendChild(nextButton)
}

function nextNight() {

}

// A repeat function for when i cant be bothered for a for loop or one certain special case i had
function repeat(code, times) {
    for (let i = 0; i < times; i++) {
        code()
    }
}

// Remove a specific item of an array bc that isnt built in for whatever reason
function removeItem(array, target) {
    const index = array.indexOf(target);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
}

// Iterate through array and return an output string with all the items of the array with a prefix and suffix on them
function iterateArray(array, suffix, prefix) {
    if (!array[0]) {
        return suffix + 'Empty'
    }
    let output = ''
    let index = 0
    for (let i = 0; i < array.length; i++) {
        output = output + suffix + prefix + array[i]
        index++
        if (index >= array.length) {
            return output
        }
    }
}

