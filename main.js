'use strict'

class Calculator {
	constructor() {
		this.result = null;
		this.express = ''
		this.memory = {
			result: null
		}
	}

	express() {
		return this.express
	}

	myEval (arr) {
			let indMulti = arr.indexOf("*")
			let indDel = arr.indexOf("/")
			let indPlus = arr.indexOf("+")
			let indMinus = arr.indexOf("-")
			let newNumber = null
			
			if (indMulti !== -1 && indDel !== -1) { //оба
				if (indMulti < indDel) { //умнож тут
					newNumber = arr[indMulti-1] * arr[indMulti+1]
					arr.splice(indMulti-1, 3) //удаление тррех чисел
					arr.splice(indMulti-1, 0, `${newNumber}`) //вставка на место трех чисел одного числа
				} else {
					newNumber = arr[indDel-1] / arr[indDel+1]
					arr.splice(indDel-1, 3)
					arr.splice(indDel-1, 0, `${newNumber}`)
				}
			} else if (indMulti !== -1 && indDel === -1) { //умножение
					newNumber = arr[indMulti-1] * arr[indMulti+1]
					arr.splice(indMulti-1, 3)
					arr.splice(indMulti-1, 0, `${newNumber}`)
			} else if (indMulti === -1 && indDel !== -1) { //деление
					newNumber = arr[indDel-1] / arr[indDel+1]
					arr.splice(indDel-1, 3)
					arr.splice(indDel-1, 0, `${newNumber}`)
			} else if (indMulti == -1 && indDel == -1) { //ни умн ни дел
					if (indPlus === -1) {
						newNumber = arr[indMinus-1] - arr[indMinus+1]
						arr.splice(indMinus-1, 3)
						arr.splice(indMinus-1, 0, `${newNumber}`)
					} else {
						newNumber = arr[indPlus-1] + arr[indPlus+1]
						arr.splice(indPlus-1, 3)
						arr.splice(indPlus-1, 0, `${newNumber}`)
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
		return this.myEval(arr)
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
			this.express = this.parseExpress(this.express)
			this.result = parseInt(this.express)
		}
	}

	appendNumber(number) {
		this.express += `${number}`
	}

	appendOperation(operation) {
		operation === "x"
			? this.express += ' * '
			: this.express += ` ${operation} `
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
			displayInput.value = "ERROR"
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

const myCalc = new Calculator()

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		myCalc.appendNumber(button.value)
		myCalc.updateDisplay()
	})
})

console.log(myCalc)
console.log('express:', myCalc.express)
// if (myCalc.express !== '') {
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
	if (myCalc.express !== '') {
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
// }

