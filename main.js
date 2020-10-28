'use strict'

class Calculator {
	constructor() {
		this.memory = {
			express: '',
			result: null
		}
	}

	delete() {
		this.memory.express = ''
	}

	compute() {
		this.memory.express = eval(this.memory.express)
	}

	appendNumber(number) {
		this.memory.express += number
	}

	appendOperation(operation) {
		operation === "x"
			? this.memory.express += '*'
			: this.memory.express += operation
	}

	saveInMemory() {

	}

	readFromMmory() {
		this.memory.result
	}

	clearMemory() {
		this.memory.result = null
	}

	updateDisplay() {
		displayInput.value = this.memory.express
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
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
	calculator.delete()
	calculator.updateDisplay()
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

