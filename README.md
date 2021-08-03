# Game 4 In A Row

## Table of Contents

## Preface
The goal of this project is to make a game, based on HTML, CSS and Javascript. It is made in a 3D environment, with a settings page for creating names and number of players. 

## The Making
When I was thinking about the 2nd Milestone my eye fell on a Youtube to make cubes and balls in a 3D environment, https://www.youtube.com/watch?v=NdftnCDwKaU.
The youtube showed up on May 11th 2021, that timing was great for me, because before that there is nothing really good to be found on Youtube about CSS 3D. 
I did some experiments myself to create cubes and balls based on that 3D idea. In that Youtube, there was only a shadow effect on the ball, but after some expriments I added a light reflection effect in the balls. 

First I thougt to make the game "Mastermind". But it turned out that when you make rows in 3D, you get a problem. The first rows are easy to see but when you get to row 8 for example, there is a horizon effect so these rows are difficult to distinguish from each other. That should not have been a nice game experience. The solution should be to make Mastermind in 2D, but my goal is to make something in 3D, just because I like it.

After that my idea evolved to make a "Four in a Row" game. Before that it was very important for me to prove it was do-able in the amount of time given for the 2nd Milestone. Therefore I made an experimental "4 in a Row"-ish 3D structure. Because it was just based on that 3D environment of the youtube I had to figure out by myself the coordinates and size of cubes just by experimenting. That experiment can be found here: https://3d-14.dikkeschei.repl.co/. 
That was a lot of copy-pasting of cubes classes en ball classes with a slightly different coordinate because it's a CSS only structure.
It turned out to be a succesfully created structure, now I finally decided to make a 3D game "4 in a Row" based on Javascript.

That experiment on Repl wasn't a game at all, it was just making a structure. Now with Javascript it should be possible to create balls with the right color and place it in the columns of cubes by choice. When I started this project I thought to make every "cube div" and every "ball div" entirely with Javascript. But somehow the coordinates didn't work. I didn't manage to create that 3D world with Javascript only. Maybe I made a mistake, maybe it is a bug, I don't know. Then I got a better idea and that turned out to be working very well: The basic idea now for this project is to make 1 cube, 1 blue ball and 1 red ball in CSS, then multiplying it by cloning with Javascript. So it should first exist in CSS, after that a clone can be made. After this the first major problem was solved.

When the basics of the game started to work it was time to get the layout improved. It could be interesting to place the balls higher when doing a move and then let them fall on their right spot with an animation. After a somewhat more complicate animation with two bounces it got the right look in my opinion, also with a falling sound added.

When I tested it on a phone I got the idea to make it really app like, therefore it's nescecary to make it full screen, so that no URL is visible. After game's end the page must be brought back to a visible URL. With google I found a solution. Now in the setting page it's possible to choose for a full page game experience.

Because of the 3D characteristics there could be done more with the game. For example I didn't use the rotation animation from the experimental repl yet and I still needed a way to get a good end for the gameplay. Then I got the idea to introduce more cubes with a different size. Also could cubes function as buttons where the user could click on. It would be great if I could give a blinking animation to those cubes. That somewhat creative thinking resulted in an "Exit Cube" (A cube with the text "Exit") where could be clicked on to stop the game earlier. The left and right "Score Cubes", where normally the points of the red and blue opponents are displayed on, begin to blink and the words "Yes" and "No" appear on it. "Message Cubes" in front and behind appear with the question if the user want to finish the game. An infinite rotation of the scenery starts.
After clicking on the "Yes Cube, the "Message Cubes" tell who has won.

The final major change was to add a diagonal counting of balls, because the user can also earn points with four in a row diagonally. The moment of scoring a point could be more emphasized. So finally blinking of balls where added for a few seconds when they are placed in a row of four and get a point for the player.

There were some timing ussues to solve. The color of the cursor changed too quick when the opponent has to do it's move, also the sound of the falling ball was not in sync. The initial solution was to make a delay with Javascript, but immidiatly a next problem started because the website is event driven. A function to change color was put on hold but then the next thing happened in a wrong way because of mouseclicks. Therefore I introduced the boolean "busy". All click events are ignored when boolean "busy" is true.

The last fase of this project was to get the setting page right. The first approach was to make it with Bootstrap. But it turned out that Bootstrap interpheres with the 3D world.  I just added the declaration of it in a link, I didn't even wrote a single bootstrap code yet, now the game was not playable anymore. So now I decided to do it with wrap. 
I saw some great radiobuttons on the internet to use. The next point was to get the page right on smaller devices. The ordering will the be beneath each other. Than I saw that the intro lines to explain the game rules used too much space, it covered allready almost half of the phone screen. Therefore I created for smaller devices an "Explanation Column" that only appear when it is asked for. The same applies to the column of the computer's playlevel. It should only appear when óne player is selected. So the thing was to create small text bloks in column. Some appear smoothly with an animation when they are asked for when using a phone device and should disappear when not needed. Getting the different screenheight of phones played keyrole to get the animation of the next window high enough for closing the gap that arises when a column, for example "Explanation Column", is not needed.
But flipping of orientation of a device when Setting Page is running appeared bad for the layout of the page because of the change of screen height. Therefore I made the deciscion to only use Portrait View for small tablets and phone devices and only Landscape View for large tablets (and laptops/desktops). When a smaller device is flipped, the view stays on Portrait, but pointer activities are disabled so nothing can be done, till the user turns back to the real Portrait View.


## User stories

* As a user : As a new visitor to the game I want the page to be easily navigated.
* As a user: As a new visitor I want clear instructions on how to play the game.
* As a user: I want a game that responds quickly to my interaction.
* As a User: I want a game that is fun and exciting to play

The ideal user:
Age 10+ (There is a setting page which have to be filled in, therefore not too young)
Children and adults



## Skeleton
The game starts with a setting page:
![Setting Page Desktop:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/setting%20page.png)

After that the game environment appear:
![Game Scenery Desktop:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/game%20scenery.png)

When pressed on exit the game starts to rotate with blinking "Yes" and "No" cubes to end the game or not
![Leaving Game Desktop:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/leaving%20game.png)

On a smaller device the setting page appear on a sligthly different way:
![Setting Page Phone:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/setting%20page%20phone.png)

The user will probably hold the phone in portrait view. Therefore a message appear to turn the phone to landscpae view for a better game experience, when
the user get back to portrait view, the message appear again, for a maximum of 2 times. After 2 times the user should understand the principle of this.

![Game Scenery Phone:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/game%20scenery%20phone.png)

Also on a phone starts a rotation with the opportunity to leave the game when pressed on the exit cube.

![Leaving Game Phone:](https://github.com/Kriz-hub/4-in-a-row/blob/master/wireframes/leaving%20game%20phone.png)

## Technologies

1 HTML
2 CSS
3 Javascript 
4 (Jquery)

## Features
## Testing

## Features Left to Implement
* On this moment the difficulty level of the computer player is zero, it just do random moves. The next step of AI could be that it does all availlable moves virtually, so that it can map all moves where points can be earned and all moves that it can prevent the opponent of getting points. A level higher could also be to create patterns. For example it makes 2 rows of 3 above one other (horizontally, vertically or diagonally). if the opponent prevent the first row to make a point the computer can make 4 in the row above. It would be great to develop this a smarter game but time ends now.
* a next step is to develop it as a phone app. Right now it can be played full screen on a phone, but because it is on a browser it can't be locked to stay full screen. 

## Deployment

This project was developed using GitHub.

I followed the next steps to deploy my game on the GitHub pages:

* Log into GitHub.
* Select kriz-hub/4-in-a-row in the repository list.
* Go to Settings
* Scroll down to the GitHub Pages section.
* Select the Master Branch
* On selecting Master Branch the page is automatically refreshed, the game is deployed.
* The link can be retrieved to the deployed website.


## Credits

## Acknowledgements

I got inspiration from:


