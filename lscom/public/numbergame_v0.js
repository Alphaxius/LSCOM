















// TODO undo function
// TODO instructions toggle cookie
// TODO score keeping cookie
// TODO apply stylesheets



function hideInstructionParagraph() {
	document.getElementById("instructionParagraph").classList.toggle("hidden");
	setCookie(hideInstructionParagraph,true,30);
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uidAtomL() {
	return String.fromCharCode(randInt(65, 90));
}

function uidAtomD() {
	return String.fromCharCode(randInt(48, 57));
}

function uidAtom() {
	if(Math.floor(Math.random() * 36) < 10) return uidAtomD();
	return uidAtomL();
}

function uid() {
	let localString = "";
	for(let localCounter = 0; localCounter < 48; localCounter++) {
		localString = localString.concat(uidAtom());
	}
	return localString;
}


//https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



















class LocalNumber {
	constructor(value, id) {
		this.value = value;
		this.uid = id;
		this.selected = false;
	}
}

class NumberContainer {
	constructor() {
		this.count = 0;
		this.maxSlots = 6;
		this.slots = {};
	}
	getNumber(id) {
		if(!(id in this.slots)) return false;
		return this.slots[id].number;
	}
	giveNumber(value) {
		if(this.count === this.maxSlots) return false;
		const number = new LocalNumber(value, uid());
		this.slots[number.uid] = {number: number, active: true};
		this.count++;
		return number.uid;
	}
	takeNumber(id) {
		if(!(id in this.slots)) return false;
		if(this.slots[id].active === false) return false;
		this.slots[id].active = false;
		this.count--;
		return true;
	}
	selectNumber(id) {
		if(!(id in this.slots)) throw "Value does not exist.";
		if(this.getNumber(id).selected) {
			this.getNumber(id).selected = false;
			return false;
		} else {
			this.getNumber(id).selected = true;
			return true;
		}
	}
	operateAdd(idl, idr) {
		const numberLeft = this.getNumber(idl);
		this.takeNumber(idl);
		const numberRight = this.getNumber(idr);
		this.takeNumber(idr);
		const aid = this.giveNumber(numberLeft.value + numberRight.value);
		return [this.slots[aid].number];
	}
	operateSub(idl, idr) {
		const numberLeft = this.getNumber(idl);
		this.takeNumber(idl);
		const numberRight = this.getNumber(idr);
		this.takeNumber(idr);
		const aid = this.giveNumber(numberLeft.value - numberRight.value);
		return [this.slots[aid].number];
	}
	operateMul(idl, idr) {
		const numberLeft = this.getNumber(idl);
		this.takeNumber(idl);
		const numberRight = this.getNumber(idr);
		this.takeNumber(idr);
		const aid = this.giveNumber(numberLeft.value * numberRight.value);
		return [this.slots[aid].number];
	}
	operateDiv(idl, idr) {
		const numberLeft = this.getNumber(idl);
		const numberRight = this.getNumber(idr);
		if(numberLeft.value < numberRight.value) return false;
		this.takeNumber(idl);
		this.takeNumber(idr);
		const answerValue0 = Math.floor(numberLeft.value / numberRight.value);
		const answerId0 = this.giveNumber(answerValue0);
		const answerValue1 = numberLeft.value % numberRight.value;
		if(answerValue1 === 0) {
			const answerNumber = this.slots[answerId0].number;
			return [answerNumber];
		} else {
			const answerId1 = this.giveNumber(answerValue1);
			const answerNumber0 = this.slots[answerId0].number;
			const answerNumber1 = this.slots[answerId1].number;
			return [answerNumber0, answerNumber1];
		}
	}
	innerDisplay() {
		let innerString = "";
		const slotsKeys = Object.keys(this.slots);
		for(const key of slotsKeys) {
			const slot = this.slots[key];
			if(!slot.active) continue;
			const number = slot.number;
			innerString = innerString.concat(`
				<input type='button'
					class='individualNumber${number.selected ? ' selected' : ''}'
					onclick='pageRunner.numberClick("${number.uid}")'
					id='${number.uid}'
					value='${number.value}'
				></input>
			`);
		}
		return innerString;
	}
	display() { 
		return `<div class='numberContainer'>
		${this.innerDisplay()}
		</div>`
	}
}

class NumberMagazine {
	constructor(amount) {
		this.eggs = [];
		this.numEggsRemaining = amount;
		const minCountLarge = Math.floor(amount / 4);
		const maxCountLargeDivisor = randInt(0, 2) === 0 ? 3 : 2;
		const maxCountLarge = Math.floor(amount / maxCountLargeDivisor);
		const countLarge = randInt(minCountLarge, maxCountLarge);
		const countSmall = amount - countLarge;
		let possibleLarge = [10,12,14,15,18,20,24,25,30,36,40,42,48,50,60];
		for(let count = 0; count < countLarge; count++) {
			const inner0 = randInt(0,possibleLarge.length - 1);
			const inner1 = possibleLarge.splice(inner0,1)[0];
			this.eggs.push(inner1);
		}
		for(let count = 0; count < countSmall; count++) {
			this.eggs.push(randInt(1,9));
		}
	}
	takeNumber() {
		if(this.numEggsRemaining === 0) return false; 
		this.numEggsRemaining--;
		return this.eggs.splice(randInt(0,this.numEggsRemaining),1)[0];
	}
	eggsDisplay() {
		if(this.numEggsRemaining === 0) return "";
		let dispString = "";
		for(let count = 0; count < this.numEggsRemaining; count++) {
			dispString = dispString.concat("&#129370");
		}
		return dispString;
	}
	newNumberDisplay() {
		if(this.numEggsRemaining === 0) return "";
		return "<input type='button' onclick='pageRunner.crackEgg()' value='New Number'></input>";
	}
	display() {
		return `
			<div class='newNumberContainer'>
				${this.newNumberDisplay()}
				<br>${this.eggsDisplay()}
			</div>
		`;
	}
}

class OperatorButtons {
	constructor() {
		this.currentSelection = "";
	}
	display() {
		return `
			<div class='operatorsContainer'>
				<input type='button' 
					onclick='pageRunner.opClick("+")'
					class='operationButton${this.currentSelection === '+' ? ' selected' : ''}'
					value='+'
				></input> 
				<input type='button' 
					onclick='pageRunner.opClick("-")'
					class='operationButton${this.currentSelection === '-' ? ' selected' : ''}'
					value='−'
				></input> 
				<input type='button' 
					onclick='pageRunner.opClick("*")'
					class='operationButton${this.currentSelection === '*' ? ' selected' : ''}'
					value='×'
				></input> 
				<input type='button' 
					onclick='pageRunner.opClick("/")'
					class='operationButton${this.currentSelection === '/' ? ' selected' : ''}'
					value='÷'
				></input>
			</div>
		`;
	}
}

class CurrentOperation {
	constructor() {
		this.ln = {};
		this.op = "";
		this.rn = {};
	}
	giveNumber(number) {
		if(Object.keys(this.ln).length === 0) {
			this.ln = number;
			return true;
		} else if (Object.keys(this.rn).length === 0) {
			this.rn = number;
			return true;
		} else {
			return false;
		}
	}
	takeOperator() {
		if(this.op === "") throw "Attempted to take operator from current operation when there was none.";
		const localOp = this.op;
		this.op = "";
		return localOp;
	}
	takeNumber(id) {
		if(id === undefined) {
			if(Object.keys(this.rn).length !== 0) {
				const number = this.rn;
				this.rn = {};
				return number;
			} else if(Object.keys(this.ln).length !== 0) {
				const number = this.ln;
				this.ln = this.rn;
				this.rn = {};
				return number;
			} else {
				throw "Attempted to take a number from the current operation when there weren't any.";
			}
		} else if(this.ln.uid === id) {
			this.ln = this.rn;
			this.rn = {};
			return true;
		} else if(this.rn.uid === id) {
			this.rn = {};
			return true;
		} else {
			return false;
		}
	}
	readyForAnsHTML() {
		if(Object.keys(this.ln).length !== 0  && this.op !== "" && Object.keys(this.rn).length !== 0) {
			return `<input type='button' onclick='pageRunner.equalsClick()' value='='></input>`;
		}
		return "";
	}
	display() {
		return `
			<div class='currentOperation'>
				<p>
					${Object.keys(this.ln).length === 0 ? "" : this.ln.value}
					${this.op}
					${Object.keys(this.rn).length === 0 ? "" : this.rn.value}
					${this.readyForAnsHTML()}
				</p>
			</div>
		`;
	}
}

class OperationHistoryAtom {
	constructor(ln, op, rn, an) {
		this.ln = ln;
		this.op = op;
		this.rn = rn;
		this.an = an;
	}
	anDisplay() {
		let anValues = [];
		for(const a of this.an) {
			anValues.push(a.value);
		}
		return anValues.join(", ");
	}
	display() {
		return `<p>${this.ln.value} ${this.op} ${this.rn.value} = ${this.anDisplay()}</p>`;
	}
}

class OperationHistory {
	constructor() {
		this.historyListory = [];
	}
	giveHistory(ln, op, rn, an) { 
		this.historyListory.push(new OperationHistoryAtom(ln, op, rn, an));
	}
	takeHistory() {
		return this.historyListory.pop();
	}
	display() {
		let innerHTMLString = "";
		for(const item of this.historyListory) {
			innerHTMLString = innerHTMLString.concat(item.display());
		}
		return `<div class='operationHistory'>${innerHTMLString}</div>`;
	}
}

class OperationEnteredStates {
	constructor() {
		this.smallStates = [
			"Wow!",
			"Nice!",
			"Sweet!",
			"Nice math!",
			"Neat!",
			"Lovely!",
			"Great!",
			"Stunning!"
		];
		this.bigStates = [
			"Huge!",
			"Massive!",
			"OMG!",
			"That's crazy!",
			"WHAT!",
			"Wholly cow!",
			"Never seen it!",
			"Big guy!",
			"Jumbo!"
		];
		this.closeStates = [
			"So close!",
			"Oooooooh!",
			"Almost there!",
			"Wowie!",
			"Nearly!"
		];
	}
	getNextState(stateChooser) {
		if(stateChooser === "close") {
			return this.closeStates.splice(randInt(0,this.closeStates.length - 1),1)[0];
		} else if(stateChooser === "large") {
			return this.bigStates.splice(randInt(0,this.bigStates.length - 1),1)[0];
		} else {
			return this.smallStates.splice(randInt(0,this.smallStates.length - 1),1)[0];
		}
	}
}

class GameState {
	constructor() {
		this.stateStringHistory = ["See instructions below."];
	}
	nextState(stateString) {
		return this.stateStringHistory.push(stateString);
	}
	prevState() {
		return this.stateStringHistory.pop();
	}
	currentState() {
		return this.stateStringHistory.slice(-1)[0];
	}
	display() {
		return `<p>${this.currentState()}</p>`;
	}
}

class GoalValue {
	constructor() {
		this.value = randInt(100,500);
	}
	display() {
		return `<p class="goalValue">Goal Value: <b>${this.value}</b></p>`
	}
}

class EndGameButton {
	constructor() {}
	display() {
		return "<input type='button' value='End Now' onclick='pageRunner.endGame()' />";
	}
}

class TotalScore {
	constructor(points) {
		this.points = points;
	}
	display() {
		return `<p class='score'>Total Score: <b>${this.points}</b></p>`;
	}
}

class Score {
	constructor() {
		this.values = [0];
	}
	currentScore() {
		return this.values.slice(-1)[0];
	}
	addPoints(value) {
		const newScore = this.currentScore() + value
		this.values.push(newScore);
		return newScore;
	}
	previous(penalty) {
		this.values.pop();
		const newValue = this.values.pop();
		this.values.push(newValue - penalty);
	}
	display() {
		return `<p class='score'>Score: <b>${this.currentScore()}</b></p>`;
	}
}

class GameCookie {
	constructor() {
		this.totalScore = 0;
		let cookies = decodeURIComponent(document.cookie).split(";");
		for(let cookie of cookies) {
			cookie = cookie.trim();
			if(cookie.indexOf("totalScore") === 0) {
				this.totalScore = Number(cookie.slice(11));
			} else if(cookie.indexOf("hideInstructionParagraph") === 0) {
				if(cookie.slice(25) === "true") hideInstructionParagraph();
			}
		}
	}
	addPoints(value) {
		this.totalScore += value;
		setCookie("totalScore",this.totalScore,30);
	}
}

class newGameButton {
	constructor() {}
	display() {
		return "<input type='button' value='New Game' onclick='location.reload()' />";
	}
}


class PageRunner {
	constructor() {
		this.gameCookie = new GameCookie();
		this.currentOperation = new CurrentOperation();
		this.operationHistory = new OperationHistory();
		this.numberContainer = new NumberContainer();
		this.operatorButtons = new OperatorButtons();
		this.numberMagazine = new NumberMagazine(6);
		this.goalValue = new GoalValue();
		this.gameState = new GameState();
		this.endGameButton = new EndGameButton();
		this.operationEnteredStates = new OperationEnteredStates();
		this.score = new Score();
		this.endGameStateFlag = false;
		this.totalScore = new TotalScore(this.gameCookie.totalScore);
		this.newGameButton = new newGameButton();
	}
 	numberClick(id) {
		if(this.numberContainer.selectNumber(id)) {
			const number = this.numberContainer.getNumber(id);
			if(this.currentOperation.giveNumber(number) === false) {
				this.numberContainer.selectNumber(id);
			}
		} else {
			if(!(this.currentOperation.takeNumber(id))) {
				throw "Number unselected but was not registered in current operation.";
			}
		}
		this.updatePage();
	}
	eggScore() {
		return this.numberMagazine.numEggsRemaining * 50;
	}
	endGameNotExactPoints() {
		const goal = this.goalValue.value;
		const numbers = this.numberContainer.slots;
		let differences = [];
		for(const id of Object.keys(numbers)) {
			const number = numbers[id];
			// if(!number.active) continue;
			const value = number.number.value;
			if(value < 50) continue;
			differences.push(Math.abs(goal - value));
		}
		const minimumDifference = Math.min(differences);
		const eggScore = this.eggScore();
		if(minimumDifference > 49) return 50 + eggScore;
		else if(minimumDifference > 24) return 75 + eggScore;
		else if(minimumDifference > 9) return 100 + eggScore;
		else if(minimumDifference > 4) return 150 + eggScore;
		else if(minimumDifference > 2) return 200 + eggScore;
		else if(minimumDifference > 0) return 250 + eggScore;
		else return 0;
	}
	endGame(correct) {
		this.endGameStateFlag = true;
		if(correct) {
			this.gameState.nextState("Good job!");
			this.score.addPoints(300 + this.eggScore());
		} else {
			this.gameState.nextState("Game over!");
			this.score.addPoints(this.endGameNotExactPoints());
		}
		this.totalScore.points += this.score.currentScore();
		this.gameCookie.addPoints(this.score.currentScore());
		this.updatePage();
	}
	checkValue(answerList) {
		let stateChooser = 0;
		for(const answer of answerList) {
			if(answer.value === this.goalValue.value) {
				this.endGame(true);
				return true;
			} else if(Math.abs(answer.value - this.goalValue.value) < 15) {
				stateChooser = "close";
				this.score.addPoints(30);
			} else if(answer.value > 250 && stateChooser !== "close") {
				stateChooser = "large";
				this.score.addPoints(25);
			} else if(stateChooser !== "close" && stateChooser !== "large") {
				stateChooser = "small";
				this.score.addPoints(20);
			}
		}
		this.gameState.nextState(this.operationEnteredStates.getNextState(stateChooser));
	}
	equalsClick() {
		// clear current operation
		const rn = this.currentOperation.takeNumber();
		const ln = this.currentOperation.takeNumber();
		const op = this.currentOperation.takeOperator();
		// unselect numbers
		this.numberContainer.selectNumber(rn.uid);
		this.numberContainer.selectNumber(ln.uid);
		// clear operation buttons
		this.operatorButtons.currentSelection = "";
		// run operator on number container
		let an = [];
		if(op === "+") an = this.numberContainer.operateAdd(ln.uid, rn.uid);
		else if(op === "-") an = this.numberContainer.operateSub(ln.uid, rn.uid);
		else if(op === "*") an = this.numberContainer.operateMul(ln.uid, rn.uid);
		else if(op === "/") an = this.numberContainer.operateDiv(ln.uid, rn.uid);
		if(an === false) {
			this.updatePage();
			return;
		}
		// add an operation history
		this.operationHistory.giveHistory(ln, op, rn, an);
		// check value (if true, end game state was entered)
		if(this.checkValue(an)) return;
		this.updatePage();
	}
	opClick(op) {
		if(!(op !== "+" || op !== "-" || op !== "*" || op !== "/")) return false;
		if(this.operatorButtons.currentSelection !== op) {
			this.operatorButtons.currentSelection = op;
			this.currentOperation.op = op;
		} else {
			this.operatorButtons.currentSelection = "";
			this.currentOperation.op = "";
		}
		this.updatePage();
	}
	crackEgg() {
		this.numberContainer.giveNumber(this.numberMagazine.takeNumber());
		this.score.addPoints(10);
		this.updatePage();
	}
	// 
	innerDisplay() {
		if(this.endGameStateFlag) {
			return `
				${this.totalScore.display()}
				${this.score.display()}
				${this.gameState.display()}
				${this.goalValue.display()}
				${this.numberContainer.display()}
				${this.operationHistory.display()}
				${this.newGameButton.display()}
			`;
		}
		return `
			${this.totalScore.display()}
			${this.score.display()}
			${this.gameState.display()}
			${this.goalValue.display()}
			${this.currentOperation.display()}
			${this.operatorButtons.display()}
			${this.numberContainer.display()}
			${this.numberMagazine.display()}
			${this.operationHistory.display()}
			<br>${this.endGameButton.display()}
		`;
	}
	updatePage() {
		document.getElementById("pageContainer").innerHTML = this.innerDisplay();
	}
}


const pageRunner = new PageRunner();










