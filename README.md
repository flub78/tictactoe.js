# tictactoe.js
A tictatoe project in javascript with CLI and HTML interfaces

## Objectives

Just a small practice project with Jest tests. To keep it modular, it is organized around
a game engine which can be invoked from a CLI or HTML GUI.

## installation

        npm init -y
		npm i --save-dev jest
		npm i --save-dev jest-environment-jsdom
		npm i --save-dev jest-canvas-mock
		npm i --save-dev canvas
		npm i prompt-sync

## Execution

run the cli version

	node tictactoe-cli.js

run the unit tests
	npm t

run the tests and measure coverage
	npm run cov

display the html page

	double click on tictactoe.html