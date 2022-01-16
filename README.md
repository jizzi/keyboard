# keyboard

The project is an on-screen keyboard, which allows to type any text in a simple text editor window.

The user (A) serves as an intermediary between the other person (B) and the software. The person (B) sees the on-screen keyboard and the typed text, and provides simple "yes" or "no" answers to the user (A). Cued by these "yes" or "no" answers, the user A selects the right group of keys. The right group of keys is indicated by green color, the wrong group of keys is shown by blue color, and the presently inactive keys are shown by light golden color. It takes several iterations to select an individual key, and each time there are two or three options to choose from.

Intended uses are:
* Self-therapy. In this case, the user (A) is any person. While the person (B) is not a physically separate person, but a Jungian archetype. Such as **Anima** for men,  **Animus** for women, **Persona** for either gender, and basically pretty much any other archetype, excluding possibly the **Self** (emojis should work for either the Self or the **Subconscious**, but their amount is quite limited). To facilitate communication, the user (A) should write down his or her own responses to the person (B) in any third-party text editor. Naturally, some familiarity with works of psychologists is desired. Carl Jung's "The Relations Between the Ego and the Unconscious" and "Man and His Symbols", just for starters.
* Care for severely disabled people. In this case, the user (A) is supposed to show the person (B) the on-screen keyboard and the text editor window, using a tablet or a laptop, and follow his or her cues to type the text, making a series of "yes" or "no" choices.

There are two keyboard layouts, English and Russian. The layout can be chosen by selecting the "ENG" or "RUS" key, respectively.

* * *

A more detailed description, for the intended use case of self-therapy. For ease of notation, it's supposed that the user (A) is a man, and the person (B) is his Anima.

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

The link to the software:

https://rawcdn.githack.com/jizzi/keyboard/017448c1adc73267affc9d640e17450756961d9a/keyboard.html
