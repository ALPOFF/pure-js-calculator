'use strict'

class Calculator {
	constructor() {
		this.result = null;
		this.express = ''
		this.memory = {
			result: ''
		},
			this.calcStatus = false
		this.operStatus = false
	}

	express() {
		return this.express
	}

	memRes() {
		return this.memory.result
	}

	myEval(arr) {
		let indMulti = arr.indexOf("*")
		let indDel = arr.indexOf("/")
		let indPlus = arr.indexOf("+")
		let indMinus = arr.indexOf("-")
		let newNumber = null

		if (indMulti !== -1 && indDel !== -1) { //div and mult
			if (indMulti < indDel) { //mult
				newNumber = arr[indMulti - 1] * arr[indMulti + 1]
				arr.splice(indMulti - 1, 3) //delete of two numbers and operator between them
				arr.splice(indMulti - 1, 0, `${newNumber}`) //insert of one new number insted of two num and oper
			} else {
				newNumber = arr[indDel - 1] / arr[indDel + 1]
				arr.splice(indDel - 1, 3)
				arr.splice(indDel - 1, 0, `${newNumber}`)
			}
		} else if (indMulti !== -1 && indDel === -1) { //mult
			newNumber = arr[indMulti - 1] * arr[indMulti + 1]
			arr.splice(indMulti - 1, 3)
			arr.splice(indMulti - 1, 0, `${newNumber}`)
		} else if (indMulti === -1 && indDel !== -1) { //div
			newNumber = arr[indDel - 1] / arr[indDel + 1]
			arr.splice(indDel - 1, 3)
			arr.splice(indDel - 1, 0, `${newNumber}`)
		} else if (indMulti == -1 && indDel == -1) { //addit and substr case
			if (indPlus === -1) {
				newNumber = arr[indMinus - 1] - arr[indMinus + 1]
				arr.splice(indMinus - 1, 3)
				arr.splice(indMinus - 1, 0, `${newNumber}`)
			} else {
				newNumber = parseInt(arr[indPlus - 1]) + parseInt(arr[indPlus + 1])
				arr.splice(indPlus - 1, 3)
				arr.splice(indPlus - 1, 0, `${newNumber}`)
			}
		}
		if (arr.length !== 1) {
			this.myEval(arr)
		} else {
			return arr[0]
		}
		return arr[0]
	}

	parseExpress(str) {
		const arr = str.split(" ")
		console.log(arr)
		return this.myEval(arr)
	}

	resetCalc() {
		this.express = ''
		this.result = null;
		this.memory.result = null;
	}

	clearDisplay() {
		this.calcStatus = false
		displayInput.value = "0"
		this.express = ''
		this.result = null
	}

	compute() {
		if (this.express === '') {
			displayInput.value = "0"
		} else {
			this.express = this.parseExpress(this.express)
			this.result = parseInt(this.express)
		}
		this.calcStatus = true
	}

	appendNumber(number) {
		if (!this.calcStatus) {
			this.express += number
			console.log(this.express)
		}
		this.calcStatus = false
	}

	appendOperation(operation) {
		this.calcStatus = false


		let arr = this.express.split(" ")

		if (arr[arr.length - 1] === '') { //check for prev oper, if it exist replace it with new
			console.log('fck')
			arr.pop()
			arr.pop()
			console.log(arr)
			operation === "x"
				? arr.push('* ')
				: arr.push(`${operation} `)
			this.express = arr.join(' ')
			console.log('1', this.express)
		} else {
			operation === "x"
				? this.express += ' * '
				: this.express += ` ${operation} `
		}
		console.log('posle:', this.express.split(" "))
	}

	saveInMemory() {
		this.memory.result = this.express
		memoryIndicator.style.backgroundColor = 'green'
	}

	readFromMmory() {
		if (this.memory.result) {
			this.express += this.memory.result
		}
	}

	clearMemory() {
		this.memory.result = ''
		memoryIndicator.style.backgroundColor = 'red'
	}

	clearAC() {
		this.calcStatus = false
		displayInput.value = "0"
		this.resetCalc()
		memoryIndicator.style.backgroundColor = 'red'
	}

	updateDisplay() {
		if (this.express == 'Infinity') {
			displayInput.value = "ERROR"
			this.resetCalc()
		}
		else {
			displayInput.value = this.express
		}
	}

	checkForFirst() {
		if (this.express === '') {
			displayInput.value = 0
		}
	}
}

const numberButtons = document.querySelectorAll('.data-number')
const operationButtons = document.querySelectorAll('.data-operation')
const equalButton = document.querySelector('.data-equals')
const deleteButton = document.querySelector('.data-delete')
const allClearButton = document.querySelector('.data-all-clear')
const memoryButton = document.querySelector('.data-memory')
const memoryReadButton = document.querySelector('.data-memory-read')
const memoryClearButton = document.querySelector('.data-memory-clear')
const memoryIndicator = document.getElementById('memory-indicator')
const displayInput = document.getElementById('display')
const prevOperand = document.querySelector('.data-previous-operand')
const curOperand = document.querySelector('.data-current-operand')

const myCalc = new Calculator()

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		myCalc.appendNumber(button.value)
		myCalc.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		if (myCalc.express !== '') {
			myCalc.appendOperation(button.value)
			myCalc.updateDisplay()
		}
	})
})

equalButton.addEventListener('click', button => {
	if (myCalc.express !== '') {
		myCalc.compute()
		myCalc.updateDisplay()
	}
})

allClearButton.addEventListener('click', button => {
	if (myCalc.express !== '') {
		myCalc.clearAC()
	}
})

deleteButton.addEventListener('click', button => {
	if (myCalc.express !== '') {
		myCalc.clearDisplay()
	}
})

memoryButton.addEventListener('click', button => {
	if (myCalc.express !== '') {
		myCalc.saveInMemory()
		myCalc.updateDisplay()
	}
})

memoryReadButton.addEventListener('click', button => {
	if (myCalc.memRes() !== '') {
		myCalc.readFromMmory()
		myCalc.updateDisplay()
	}
})

memoryClearButton.addEventListener('click', button => {
	if (myCalc.express !== '') {
		myCalc.clearMemory()
		myCalc.updateDisplay()
	}
})

