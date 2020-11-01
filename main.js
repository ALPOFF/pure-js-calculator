'use strict'

class Calculator {
	constructor() {
		this.result = null;
		this.express = ''
		this.memory = {
			result: null
		}
	}

	resetCalc() {
		console.log("in reset")
		this.express = ''
		this.result = null;
		this.memory.result = null;
	}

	clearDisplay() {
		displayInput.value = "0"
		this.express = ''
		this.result = null
	}

	compute() {
		if (this.express === '') {
			displayInput.value = "0"
		} else {
			this.express = eval(this.express)
			this.result = parseInt(this.express)
		}
	}

	appendNumber(number) {
		this.express += number
	}

	appendOperation(operation) {
		operation === "x"
			? this.express += '*'
			: this.express += operation
	}

	saveInMemory() {
		this.memory.result = this.result
		memoryIndicator.style.backgroundColor = 'green'
	}

	readFromMmory() {
		this.express += this.memory.result
	}

	clearMemory() {
		this.memory.result = null
		memoryIndicator.style.backgroundColor = 'red'
	}

	clearAC() {
		displayInput.value = "0"
		this.resetCalc()
		memoryIndicator.style.backgroundColor = 'red'
	}

	updateDisplay() {
		if (this.express == 'Infinity') {
			displayInput.value="ERROR"
			this.resetCalc()
		} else {
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

const calculator = new Calculator()

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.value)
		calculator.updateDisplay()
	})
})


if (calculator.express !== '') {
	operationButtons.forEach(button => {
		button.addEventListener('click', () => {
			calculator.appendOperation(button.value)
			calculator.updateDisplay()
		})
	})
	
	equalButton.addEventListener('click', button => {
		calculator.compute()
		calculator.updateDisplay()
	})
	
	allClearButton.addEventListener('click', button => {
		calculator.clearAC()
	})
	
	deleteButton.addEventListener('click', button => {
		calculator.clearDisplay()
	})
	
	memoryButton.addEventListener('click', button => {
		calculator.saveInMemory()
		calculator.updateDisplay()
	})
	
	memoryReadButton.addEventListener('click', button => {
		calculator.readFromMmory()
		calculator.updateDisplay()
	})
	
	memoryClearButton.addEventListener('click', button => {
		calculator.clearMemory()
		calculator.updateDisplay()
	})
}

