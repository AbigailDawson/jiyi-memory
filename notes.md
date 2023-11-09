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

**- Additional Features -**
1. Allow player to enter their own 10 cards to play with.
2. Scoring: The best possible score for the game is the minimum number of turns needed to clear the board (number of cards / 2). The player's score will be calculated based on how many turns they took to clear the board in comparison to the best possible score. The player will be shown some kind of message upon clearing the board reflecting this score.
3. Allow player to choose from a board of 10 or 20 cards.
4. Allow player to change the color of the cards.
5. Post player's score to a "leaderboard" so they can track their improvement.

## PSEUDOCODE

1. Create an object to hold all of the cards.
    - Each card will be its own object with two properties, 'character' and 'meaning'
    - Consider using a Class to do this?

2. Declare but don't initialize all state variables (data that needs to be tracked/remembered during gameplay).
    - game board ==> a 2D array to represent the 5 x 4 grid of cards
    - turn count ==> some way of determining when a turn is complete
    - clear board status ==> like 'winner', some indicator that the game board has been cleared
    - matches board ==> a 2D array to represent all the matched cards to display on the side
    - matches ==> number of matches made
    - matches remaining ==> number of matches left on the board

3. Cache DOM elements that will need to be accessed many times during gameplay.
    - game board elements (aka cards)
    - reset game button
    - matches remaining text
    - matches board elements
    - some kind of 'winning' message?

4. Write the initialize function.
    - Initialize the empty 2D board array. Populate the board randomly with either the 'meaning' or 'character' from each card.
    - Initialize the turn count (look into how to do this)
    - Initialize the clear board status to null (the clear board status should only contain a value once all of the cards have been matched)
    - Call render()

5. Write the render function.
    - renderBoards
    - renderMessages

6. Write the renderBoards function. 
    Every time the player clicks the game board, what needs to happen to the board?

    1. Update the gameBoard to reflect the state:
        - Display the information on the card.
        - If this was the 2nd click and the cards are a match, remove the cards from the grid (change the style to look like an empty space).
        - If this was the 2nd click and the cards are not a match, return the state to show the cards as facedown.

    2. Update the matchesBoard to reflect the state:
        - If this was the 2nd click and the cards are a match, display the cards on the matches board in the next available grid space.

7. Write the renderMessages function. 
    Every time the player clicks the game board, what messages need to be displayed on the page?
    
    - If a match has been made, update Matches Remaining to display the number of matches remaining.

    - If the board has been cleared, display a message congratulating the player ('Board cleared!')

8. Write a checkForMatch function.
    This function will be called on the 2nd click of each turn. 

    - If the clicked card and the previously clicked card show properties of the same card object, they are a match.

9. Write the clear board status logic.
    ???

10. Add event listeners.
    1. Add an event listener to the Reset Board button that resets the game.
    2. Add an event listener to the game board:
        - Make sure the thing being clicked is a card and not in between cards.
        - Make sure the clicked card is not the card that was just clicked.
        - If the card being clicked is not the one that was just clicked (the 2nd click of a turn), run the checkForMatch function to see if they are a match.
        - Check whether that match resulted in the board being cleared.
        - Run the render function to affect any necessary changes.

QUESTION: Which things go under the event listener vs. the render function?