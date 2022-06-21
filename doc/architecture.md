# Architecture

Even if this project is very simple there are a few interesting architecture choices.

Supporting two user interfaces is interresting. There is one minimal CLI interface. It is the smallest and simplest command interpretor able to interact with the engine. It also provide an easy ay for manual testing.

The other one is also a minimal HTML/CSS interface. This interface reacts to events and user input, send commands to the engine and display the results.

## Notes

It is relatively logical to consider that the GUI knows (or uses) the interface of the engine. The engine does not care on the way the results are displayed or the input are done (WEB page, CLI, physical device).

In the other hand a GUI has heavy dependences on the game, no way to display a tictactoe on a chess board. So it is quite logical to let the GUI control the engine.

## Questions

