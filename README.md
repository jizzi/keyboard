# keyboard

The project is an on-screen keyboard, which allows to type any text in a simple text editor window. With a constraint, that the user might have access to only a couple of buttons, at most.

Wouldn't it be wonderful, if you could shoot an email using your microwave oven?

This is attained by attaching a tree structure to keys of an on-screen keyboard. Essentially, think of a Morse code merged with an Ouija board.

To type a letter on the keyboard (or to press one of the special keys), the user is supposed to make several consecutive choices, each time selecting a group of keys containing the desired key. After each selection the amount of keys in a group is divided by two or three, so in a short time the choice is narrowed to a single key.

There are two keyboard layouts, English and Russian (the default one). The layout can be chosen by selecting the "ENG" or "RUS" key, respectively.

* * *

In Carl Jung's "Two essays on analytical psychology" you can learn about the existence of Anima/Animus archetype. Anima is a "*semiconscious psychic complex, having partial autonomy of function*" (par. 302). For a modern man, it's "*quite right to treat the anima as an autonomous personality and to address personal questions to her*" (par. 322). To achieve that, "*The psyche not being a unity but a contradictory multiplicity of complexes, the dissociation required for our dialectics with the anima is not so terribly difficult. The art of it consists only in allowing our invisible partner to make herself heard, in putting the mechanism of expression momentarily at her disposal, without being overcome by the distaste one naturally feels at playing such an apparently ludicrous game with oneself, or by doubts as to the genuineness of the voice of one’s interlocutor*" (par. 323).

To engage in a conversation with the Anima, you can write down your questions in any third-party text editor such as Notepad. It might help if you address her explicitly. If you are a man, you should address the Anima, a she. If you are a woman, you should address the Animus, a he. In the sequel, I assume you are a man who attempts to address the Anima.

To write down the response of your Anima—if the Anima wishes to communicate with you—use the on-screen keyboard, using the emotional input from the Anima as cues to select a key. It's an unique perspective—thinking out of the box.

It shouldn't compromise your mental health. But, you can never be completely sure. You are dealing with powerful forces here. In computer science parlance, that can be compared to getting root access to your mind. In Jung's words, "*The secret is that only that which can destroy itself is truly alive.*" ("Psychology and Alchemy", par. 93.)

**Disclaimer**. Any risk of a mental health deterioration, related or unrelated to the use of this software, is yours and yours alone. Under no circumstances will the author of this software bear any responsibility for the condition of your mental health.

* * *

The software is written in Javascript, and the main file is "keyboard.html".

It works better in Google Chrome, but should work in other browsers.

Within the page, there are two parts — the text field, where the typed text appears, and the virtual keyboard beneath. The position of the cursor in the text field is shown by a horisontal ellipsis.

Each moment, there's the right group of keys (highlighted with green background), the wrong group of keys (shown by blue), and the rest of the keyboard (shown by light golden).

To choose the right group of keys on the virtual keyboard, you need to use the arrow keys on your real keyboard. Do not hurry. The Anima only sees what you are looking at. She won't be able to make a choice, if you do not have a look at each key in the selected group. Like if you were contemplating the choice yourself, except that you are not. Be patient. So, essentially, keep switching the right group of keys, until you are confident which is the right one. Do not doubt too much, too. There's some sweet spot between self-doubt and haste, which will allow you to move on with reasonable speed, making the right choices.

If you know the right group of keys, press "Enter" or "Space" on your real keyboard. That will narrow the search for the right key, somewhat. Proceed, until you've finally chosen the right key.

If you have made a mistake, there are two options. First, there's a "backspace" key on the virtual keyboard, which can be used to erase a wrongly typed letter. Second, there's a backspace key on your real keyboard, which undoes one single choice at a time.

You can also use mouse clicks on the keys. A single click switches a key group, and a double click applies your choice of the key group. A double click on an inactive key undoes one choice. Touches on mobile devices also work! A single touch would select a key group, and two consecutive touches on the same key would apply the choice (or undo it, if you tap an inactive key twice).

There are two ways to show that the communication is complete. First, there's an "ESC" key on the virtual keyboard. It types a capital Greek letter "Delta" (looks like a triangle), which the Anima might use to make it clear that her response is complete. Second, if the Anima shows that there's no right decision at the top level of the virtual keyboard, that might mean either that she wants you to consider or guess the meaning of what she said; or that she is no longer interested. Try talking to her another time!

You can also see it as a giant sandbox, and explore it like if you were a kid playing with someone else.

Lastly, I should add, that in case you have successfully managed to communicate with the Anima, you might be tempted to share your success with others. Do not. The Anima is your last line of defense. You can discuss anyone with her. You cannot discuss her with other people, unless you have been explicitly granted a permission. I will clarify. It's not that you would hurt the Anima; rather, you would hurt yourself, and it's the opposite of what you are trying to achieve.

* * *

A brief description of the features.

"**SAVE**" is currently not implemented. Does nothing. The idea is to provide an option to save/load any parts of the text.

"**Heart**" emoji key allows to choose an emoji and type it.

"**word**" key ("слово" in Russian layout) allows to choose a dictionary word and type it. Since the amount of words exceeds 30 thousands, the dictionary feature consists of several pages, each of which allows you to select a range.

It's useful, but sometimes it's hard to choose a word, leaving you wandering among various dictionary pages, hardly settling on anything. So, a cued dictionary option has been implemented.

What if you do not need every word in a dictionary, but, say, just words starting from "b", ending with "c", and having 9 letters? In that case, just type "b", "9", "c", then press "SHIFT" key, and now instead of the "word" key you have "w4d" key. Press it. Now the dictionary consists only of words matching your cue — which would be "*ballistic*", "*biometric*", "*bishopric*" and "*bombastic*".

What options are allowed? You can skip the number. If you skip it altogether, you'll see a list of words starting with your cue. For example, pressing the keys "z", "y", "SHIFT", "w4d", will get you the only word starting with "zy" — which is "*zygote*".

If you type "0" instead of a positive number, the number of letters is ignored. For example, "t", "0", "c", "t", "SHIFT", "w4d", will get you words starting with "t" and ending with "ct", which are "*tact*", "*tract*", "*transact*" and "*Trade Descriptions Act*".

"**pos**" allows you to edit the text. In principle, you can already move the cursor using the arrow keys ("left" and "right" keys on the main keyboard, which become "up" and "down" keys if you press "SHIFT"), as well as remove text using "BKSP" key (which becomes "DEL" when you press shift). What does the "pos" feature allow you to do? If you choose it, you can see it consists roughly of three parts.

First, "copy", "paste" and "cut". "Copy" allows you to copy the selected text into the clipboard. "Paste" allows you to paste the text from the clipboard (replacing the selected text, if any). "Cut" allows to cut the selected text, moving it to the clipboard.

Second, the ten keys in the bottom-left allow to either move the cursor, or move the selection. The possible movements include, "Home" and "End" — beginning and end of the current string. "PgUp" and "PgDn" — move 7 strings above or below. Arrow keys — move up, down, left or right. And double arrows — move one word left or one word right. With the exception of "Home" and "End" keys, all other keys in this group allow to be pressed continually. Say, if you need to move 10 characters to the left, or 5 words to the right, or 7 pages up, you can just press the selected key repeatedly. To exit this mode, press the key "Exit from moving cursor mode".

Third, the 6 keys in the bottom-right allow you to work with selections. The key "Select text" allows you to select the text. To return to moving the cursor, press the key again — now it will read "Move cursor". Note, that while any text is selected, moving the cursor will also keep and move the selection (that is, any text between the cursor and the start of the selection). Other keys in the group are "Clear selection" and "Select all" — to either clear the selection or make everything selected. The key "Select word" allows to select the word at the position of the cursor. Finally, the keys "Text start" and "Text end" move to either the start or the end of the text. Depending on the mode, these keys will move either the cursor or the selection edge. In text editors such as Notepad, that would be Ctrl+Home and Ctrl+End.

* * *

The link to the software (default Russian layout):

https://rawcdn.githack.com/jizzi/keyboard/5fd026b3d57227e830322d26ea0579b53eb4187f/keyboard.html

Same, with default English layout:

https://rawcdn.githack.com/jizzi/keyboard/5fd026b3d57227e830322d26ea0579b53eb4187f/keyboard_eng.html
