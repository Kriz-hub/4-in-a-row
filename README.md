# Game 4 In A Row

## Table of Contents

## Preface
The goal of this project is to make a game, based on HTML, CSS and Javascript. It is made in a 3D environment, with a settings page for creating names and number of players. 

## The making
When I was thinking about the 2nd Milestone my eye fell on a Youtube to make cubes and balls in a 3D environment, https://www.youtube.com/watch?v=NdftnCDwKaU.
The youtube showed up on May 11th 2021, that timing was great for me, because before that there is nothing really good to be found on Youtube about CSS 3D. 
I did some experiments myself to create cubes and balls based on that 3D idea. In that Youtube, there was only a shadow effect on the ball, but after some expriments I added a light reflection effect in the balls. 

First I thougt to make the game "Mastermind". But it turned out that when you make rows in 3D, you get a problem. The first rows are easy to see but when you get to row 8 for example, there is a horizon effect so these rows are difficult to distinguish from each other. That should not have been a nice game experience. The solution should be to make Mastermind in 2D, but my goal is to make something in 3D, just because I like it.

After that my idea evolved to make a "Four in a Row" game. Before that it was very important for me to prove it was do-able in the amount of time given voor the 2nd Milestone. Therefore I made an experimental "4 in a Row"-ish 3D structure. Because it was just based on that 3D environment of the youtube I had to figure out by myself the coordinates and size of cubes just by experimenting. That expirement can be found here: https://3d-14.dikkeschei.repl.co/. 
That was a lot of copy-pasting of cubes classes en ball classes with a slightly different coordinate because it's a CSS only structure.
It turned out to be a succesfully created structure, now I finally decided to make a 3D game "4 in a Row" based on Javascript.

That experiment on Repl wasn't a game at all, it was just making a structure. Now with Javascript it should be possible to create balls with the right color and place it in the columns of cubes by choice. When I started this project I thought to make every "Cube DIV" and every "Ball DIV" entirely with Javascript. But somehow the coordinates didn't work. I didn't manage to create that 3D world with Javascript only. Maybe I made a mistake, maybe it is a bug, I don't know. Then I got a better idea and that turned out to be working very well: The basic idea now for this project is to make 1 cube, 1 blue ball and 1 red ball in CSS, then multiplying it by cloning with Javascript. So it should first exist in CSS, after that a clone can be made. After this the first major problem was solved.

Another major problem was to solve timing ussues. The color of the cursor changed too quick from red to blue and the other way back when the opponent has to do it's move. The initial solution was to make a delay with Javascript, but immidiatly a next problem started becausev the website is event driven. A function to change color was put on hold but the next thing happened on a wronng way because of mouseclicks. Therefore I introduced the boolean "busy". All click events are ignored when boolean "busy" is true.

## Wireframes:
![Setting Page Desktop:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/setting%20page.png)
![Game Scenery Desktop:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/game%20scenery.png)
![Leaving Game Desktop:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/leaving%20game.png)
![Setting Page Phone:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/setting%20page%20phone.png)
![Game Scenery Phone:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/game%20scenery%20phone.png)
![Leaving Game Phone:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/leaving%20game%20phone.png)



Things to do:
* vertical counting doesn't work yet, only vertical and horizontical counting
* the readme needs a lot more finishing
* the game need some light effect when a count of 4 balls ca be made





