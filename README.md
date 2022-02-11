# Batted Ball Visualization Project

This link to the github page is : https://nolandonley14.github.io/battedBallVisualization/

## About the app
This is a quild build of a web app to visualize and contextualize the data found in /public/battedBallData.tsv
This application has the following features:

 - Plot any 2 data columns against each other for 3 modes:
    1. The Entire Dataset
    2. A custom multiple selection of players
    3. Specific Pitcher/Batter Combinations
 
 - Customizaiton of plotted colors by play outcome
 - Video access of every data point
 
To change the axis, select the radio option and click "Change Axes"
To change the mode, select the radio option under "Modes"
To change any of the colors in the legend, click on the color rectangle, select a color from the picker or input your own hex value
To access the video of any specific point, simply click on the point in the graph
Hovering over a point reveals the players involved and the date.

When selecting players in the multiple select option, you can filter for any player and click their name to add them to the selected player list.
To remove them from the list, click their name in the "Selected Players" list

When selecting players for the "Versus" mode, first start with any player. We'll call this 'Player A' for now. The list will then be modified to only show players that 'Player A' has at least one data point for. Once you have selected a Pitcher and Hitter, click the "See Comp" button to see the results. Deselecting a player is the same as above.  

## Future Work
Some features I wish I wouldve had time to implement are: 
 - Player specific and general spray charts
 - Different styles of graphs/charts rather than strictly scatterplot
 - 3-axis charts/graphs to analyze more than 2 variables at a time
 - Animations  

## Project Technologies

This project was built with [ReactJS](https://reactjs.org/) and [d3](https://d3js.org/). 
Other packages include [react-color](https://casesandberg.github.io/react-color/), [react-icons](https://react-icons.github.io/react-icons/) and [gh-pages](https://pages.github.com/)
