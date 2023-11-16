# <div align="center">記憶 Memory</div>
### <div align="center">Match the Chinese characters to their meaning in this classic game of Memory!<div>

![Game Play](/images/game-play.png)

## <div align="center">A Game with a Purpose</div>
As someone who has spent years devoted to the study of foreign languages, I have always been fascinated by the psychology behind learning — and methods for *how* to learn effectively. 

Whether it's a foreign language, a musical instrument, a technical skill or just information you need to know for a test, almost everyone has something they want to learn. And for some, the best way to learn is through play. As long as you're having fun playing the game, the learning will come naturally - you might not even notice it happening!

I designed **[記憶 Memory](link)** to be a template for a learning tool. My game uses traditional Chinese characters, but this template could be adapted to any subject matter.

## <div align="center">Getting Started</div>

Let's play **[記憶 Memory](link)**!

The game begins with a starter deck of miscellaneous beginner cards featuring easy Chinese characters. 

To preview the cards that are in this deck, turn on **Study Mode** by clicking the toggle at the top. You can use this feature on any deck at any time to review the cards — even during game play.

![Study Mode](/images/study-mode.png)

#### *Game Play*

1. Play the game by flipping over two cards at a time until you find a match!

    >Remember, each match is a Chinese character and its meaning — *not two identical cards!*

2. Matches are removed from the board and will display on the **Matches** board to the right.

Once you've gotten a feel for how the game works, check out the other beginner decks or try an intermediate or advanced deck for an added challenge!

## <div align="center">Special Features</div>

### <div align="center">My Study List</div>

![My Study List](/images/my-study-list.png)

Click on any Chinese character on the *Matches* board to add that word to your own custom study list. 

You can add as many words as you like from any of the decks.

View your study list at any time by clicking the **My Study List** button.

***

### <div align="center">Create Deck</div>

![Create Deck](/images/create-deck.png)

If you want to study your own words that aren't included in the premade decks, you can create your own custom deck with 10 words of your choice!

Once you have entered 10 words, you'll also have the option to choose a color for your deck.

Click **Play!** to get started!

## Tech

 **記憶 Memory** is created with HTML, CSS and JavaScript.

## Next Steps

The biggest limitation of this game is that it's not scalable with the current code foundation. The code relies on a while loop to assign card objects to random places on the board, but adding cards beyond the 10 already loaded into each deck creates an infinite loop that crashes the browser. 

Additionally, there are some limitations with the current code structure, which uses 20 card objects to make up a deck. I have run into numerous issues coding out game features with this structure, but will spare the details for this document.

Despite these challenges I would like to add the following features to the existing game:

1. Improve My Study List feature
* Allow the player to remove words or clear their list
* Allow for more words to be added in multiple columns
* Offer a way for the player to download their list of words

2. Expand Create Deck feature
* Allow the player to create and save multiple decks
* Allow for words to be deleted from the Create Deck form

3. Improve animations and design elements for a more enjoyable feel during game play, possibly including pronunciation audio that could be toggled on/off for cards.

4. Integrate pinyin for Chinese characters.