# Probabilia - The Game of Probability and Statistics

The game is meant for understanding concept of probability and statistics and applying it to save your districts. You will be given 4 districts initially, the district continuously evolve and can go to any one of the stage [stable, tense, riot and recovery], at random rates event fires that bring chaos in the system, your task is to analyze the system and use your budget to make the districts less chatotic.

The game uses several mathematical components;
1. Markov Engine = It computes the transition probability of each districts based on different stats of the district including, infrastrucutre health, crime index, social tension, and infection rate.
2. Poission Engine = It computes the poisson event rate i.e. the average number of events happening in each district per day. 
3. Event Engine = It fires the event based on the event rate, and the type of event fired is dependent on the stats of the district. If district has high crime index, their is higher chance that a crime would occur. This event shall hamper the stats of the district leading to more chaos.

## TODO
1. Need to create a resource allocation engine, that supports resources allocation to prevent chaos. Right now only chaos occurs and there is no way to resolve the chaos.
2. Alerts system and event history to be displayed to user. Currently this is only stored as a property of district but not implemented in UI.

## Remarks
Imeplementign everything from scratch using Vanilla was difficult plus styling and mathematics so, the game is incomplete. I am planning to compelte this on week 8.
