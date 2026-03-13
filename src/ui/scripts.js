export const WELCOME_MESSAGE =
	"The alarms when silent at 2:47 AM. The doors sealed three minute later.\nYou don't know who did this. You don't know why you're still inside.\nBut you do know one thing - every decision you make from this point could be your last.\nNavigate carefully. Trust nothing.";

export const STORY = {
	usb: {
		label: "USB Drive",
		text: "A USB drive on the floor. No label. No markings. Someone was here before you.",
		pos: [100, 200],
		choices: [
			{
				text: "Plug it in",
				outcome: "death",
				message:
					"The screen flickers once. Then every light in the facility dies. A mechanical sound echoes through every corridor - locks engaging. All of them. You won't be leaving.",
			},
			{
				text: "Pocket it",
				outcome: "collect",
				message:
					"It sits heavy in your pocket. You're not sure why you kept it. May be instinct.",
			},
		],
	},
	keycard: {
		label: "Keycard",
		text: "A red card sitting face-down on the desk. Like someone set it there in a hurry. Or wanted it to be found.",
		pos: [600, 250],
		choices: [
			{
				text: "Pick it up",
				outcome: "collect",
				message:
					"You flip it over. Access credentials. You slip it into your pocket without fully understandign why it was left here.",
			},
			{
				text: "Leave it",
				outcome: "death",
				message:
					"You walk away. Thirty seconds later the ceiling vents hiss open. The air turns sharp and cold. You realise too late that the ventialtion controls needed manual overriding. You had the tool in front of you.",
			},
		],
	},
	flask: {
		label: "Flask",
		text: "Something bubbling on the bench. Green. Warm. The cabinte beside it has a rusted lock - the kind that looks like it hasn't been opened in yeats.",
		pos: [1000, 300],
		choices: [
			{
				text: "Drink it",
				outcome: "death",
				message:
					"It burns before it even touches your throat. The label was on the underside of the flask the whole time. You just didn't look.",
			},
			{
				text: "Do something with it",
				outcome: "collect",
				message:
					"You read the label and read the message written, 'The lock gives way. Inside things weren't supposed to find. Things someone clearly tried to hide.'",
			},
			{
				text: "Leave it alone",
				outcome: "skip",
				message:
					"You step back. Whatever is in that cabine stays in that cabinet.",
			},
		],
	},
	laptop: {
		label: "Open Laptop",
		text: "The screen is still on. A single line waits for you, cursor blinking. Whoever was sitting here left in a hurry.",
		pos: [400, 400],
		choices: [
			{
				text: "Run it",
				outcome: "conditional",
				condition: "usb",
				ifTrue: {
					outcome: "door_opens",
					message:
						"Something in your pocket made you pause before hitting enter. You cross-referenced. The signature don't match. Different hands wrote this. You run it. Something shifts in the walls, deep, mechanical, building-wide.\nA door wide open. It looks you made wise decision to keep the USB, doors are opened and you are free to leave.",
				},
				ifFalse: {
					outcome: "death",
					message:
						"The cursor blinks once after you hit enter. Then nothing. THen everything goes dark. Whatever that script did, it finished its job.",
				},
			},
			{
				text: "Study it first",
				outcome: "conditional",
				condition: "usb",
				ifTrue: {
					outcome: "door_opens",
					message:
						"You take your time. Something in your pocket gave you a reference point. The code checks out. You run it. A deep mechanical groan travels through the building.",
				},
				ifFalse: {
					outcome: "skip",
					message:
						"You stare at it for a long time. Nothing to compare it against. You close the lid and walk away. The cursor keeps blinking in the dark.",
				},
			},
		],
	},
	exit: {
		label: "Emergency Exit",
		text: "The door at the end of it all. Steel. Heavy. Two ways to open it - or maybe neither works. You won't know until you try.",
		pos: [500, 600],
		choices: [
			{
				text: "Override button",
				outcome: "conditional",
				condition: "flask",
				ifTrue: {
					outcome: "door_opens",
					message:
						"It responds. The door opens. Cold air. Dark Sky. You walk out carrying things you were never meant to find and answers nobody wanted you to have.",
				},
				ifFalse: {
					outcome: "death",
					message:
						"Nothing. The button is dead. In the silenve you hear boots on the floor somewhere behind you. Getting closer.",
				},
			},
			{
				text: "Slot in the card",
				outcome: "conditional",
				condition: "keycard",
				ifTrue: {
					outcome: "door_opens",
					message:
						"A beep. A pause that feels too long. Then the door moves. You don't look back.",
				},
				ifFalse: {
					outcome: "death",
					message:
						"Your hands find nothing. Empty pockets. The panel waits. The door stays shut. The footsteps behind you do not.",
				},
			},
		],
	},
};
