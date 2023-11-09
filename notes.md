## GAME DESCRIPTION
Based on the classic game "Memory", this is a memory matching game to review Chinese characters and their meanings. 

**- Starter Cards -**
1. Love 愛
2. Book 書
3. Country 國
4. Family 家
5. Learn 學
6. Eat 吃
7. Drink 喝
8. Cat 貓
9. Dog 狗
10. Dream 夢 

**- Game Play -**
START: To begin the game, the player will see 10 cards "face down" on the screen. 

PLAY: When the player clicks a card, it will "flip", displaying either an English word or a Chinese character. The player will then have a chance to click one more card to reveal another word or character. Flipping 2 cards constitutes one turn. If the word and character match, the cards will be removed from the board and displayed on the side. If the word and character do not match, the cards will "flip" back to their original state and the player will have a chance to try again. 

END: The game ends when the board has been cleared of all cards.

**- Scoring -**
The best possible score for the game is the minimum number of turns needed to clear the board (number of cards / 2). The player's score will be calculated based on how many turns they took to clear the board in comparison to the best possible score. The player will be shown some kind of message upon clearing the board reflecting this score.

**- Additional Features -**
1. Allow player to enter their own 10 cards to play with.
2. Allow player to choose from a board of 10 or 20 cards.
3. Allow player to change the color of the cards.
4. Post player's score to a "leaderboard" so they can track their improvement.

## PSUEDOCODE

1. Create an object to hold all of the cards.
    1.1. Each card will be its own object with two properties, 'character' and 'meaning'
    1.2. Consider using a Class to do this?

2. Declare but don't initialize all state variables (data that needs to be tracked/remembered during gameplay).
    2.1. game board ==> a 2D array to represent the 5 x 4 grid of cards
    2.2. turn count ==> some way of determining when a turn is complete
    2.3. clear board status ==> like 'winner', some indicator that the game board has been cleared
    2.4. matches board ==> a 2D array to represent all the matched cards to display on the side
    2.4. matches ==> number of matches made
    2.5. matches remaining ==> number of matches left on the board

3. Cache DOM elements that will need to be accessed many times during gameplay.
    3.1. game board elements (aka cards)
    3.2. reset game button
    3.3. matches remaining text
    3.4. matches board elements
    3.5. some kind of 'winning' message?

4. Write the initialize function.
    4.1. Initialize the empty 2D board array. Populate the board randomly with either the 'meaning' or 'character' from each card.
    4.2. Initialize the turn count (look into how to do this)
    4.3. Initialize the clear board status to null (the clear board status should only contain a value once all of the cards have been matched)
    4.4. Call render()

5. Write the render function.
    5.1. renderBoards
    5.2. renderMessages

6. Write the renderBoards function. 
    Every time the player clicks the game board, what needs to happen to the board?

    6.1. Update the gameBoard to reflect the state:
        6.1.1. Display the information on the card.
        6.1.2. If this was the 2nd click and the cards are a match, remove the cards from the grid (change the style to look like an empty space).
        6.1.3. If this was the 2nd click and the cards are not a match, return the state to show the cards as facedown.

    6.2. Update the matchesBoard to reflect the state:
        6.2.1. If this was the 2nd click and the cards are a match, display the cards on the matches board in the next available grid space.

7. Write the renderMessages function. 
    Every time the player clicks the game board, what messages need to be displayed on the page?
    
    7.1. If a match has been made, update Matches Remaining to display the number of matches remaining.

    7.2. If the board has been cleared, display a message congratulating the player ('Board cleared!')

8. Write a checkForMatch function.
    This function will be called on the 2nd click of each turn. 
    8.1. If the clicked card and the previously clicked card show properties of the same card object, they are a match.

9. Write the clear board status logic.
    ???

10. Add event listeners.
    10.1. Add an event listener to the Reset Board button that resets the game.
    10.2. Add an event listener to the game board:
        10.2.1. Make sure the thing being clicked is a card and not in between cards.
        10.2.2. Make sure the clicked card is not the card that was just clicked.
        10.2.3. If the card being clicked is not the one that was just clicked (the 2nd click of a turn), run the checkForMatch function to see if they are a match.
        10.2.4. Check whether that match resulted in the board being cleared.
        10.2.5. Run the render function to affect any necessary changes.

QUESTION: Which things go under the event listener vs. the render function?