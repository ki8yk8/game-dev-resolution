# Probabilia - The Game of Probability and Statistics

The game is meant for understanding concept of probability and statistics and applying it to save your districts. You will be given 4 districts initially, the district continuously evolve and can go to any one of the stage [stable, tense, riot and recovery], at random rates event fires that bring chaos in the system, your task is to analyze the system and use your budget to make the districts less chatotic.

The game uses several mathematical components;

1. Markov Engine = It computes the transition probability of each districts based on different stats of the district including, infrastrucutre health, crime index, social tension, and infection rate.
2. Poission Engine = It computes the poisson event rate i.e. the average number of events happening in each district per day.
3. Event Engine = It fires the event based on the event rate, and the type of event fired is dependent on the stats of the district. If district has high crime index, their is higher chance that a crime would occur. This event shall hamper the stats of the district leading to more chaos.
4. Intervention Engine = It provides user with the intervention measure like stabilization opportunities, and responders assignment to intervene and control the chaosness of the system.

## Game Play

The game is district of chaos. The chaos in each district is caused by a specific driver, oneof `infrastructure failure`, `crime`, or `infection`. This driver determines the stats of district (including, `crime index`, `infrastructure health`, `infection rate`, `social tension`).

The game has a clock, and each tick is referred to as a day. Your goal is to survive and remove the chosness of city before all days are exhausted. You die when you are bankrupt i.e. no tokens left.

At each day, the district stats is refreshed by markov engine that transits the district from one state to another, maybe today you have high crime index in your district so, your city can move from stable to tense. The poission engine, computes when next event would occur for each district. Here, event rate is again derived from the district stats i.e. the more chaotic the city the frequent the event occurs.

There are three events, `diseases outbreak`, `crime`, and `infrastructure failure` that degrades the stats of district. When each event occurs, you can use the responders to respond and mitigate the event but, there are only 3 responders but 4 chaotic district, so resource allocation should be proper.

If any, events remains unhandled you will be penalized by spending more tokens. If events are handled, you get more credibility.

You can also stabilize the district using some tokens, and that will reduce the chaotic state of system but, eventual riot is ineveitable if you donot act wisely.

To gurantee win the game, you can identify driving factor of each district. A correct identification will boost your credibility, economy, and efficiency of responders.

Use the bayes panel, to udpate your belief based on the clues and then perform the arreest. The more confident you want to become the more tokens you have to spend.

## Panels

1. Markov Panel = To see the transition probaility of district and future state.
2. Intervention Panel = Allows you to intervene by either stabilizing district or assinging responders.
3. Poission Panel = Helps you to see the event rate of individual district and help you decide assignment of responder effectively.
4. Bayes Panel = Provide you clue to cpature the chaotic dirver of city.
