# keyboard
Trichotomic/dichotomic keyboard

* * *

Hi!

Remember that magic 8-ball from the movie "Interstate 60", that Neal Oliver used to seek advice?

Have you ever hoped that there were someone who could provide you a similar advice?

Swiss psychologist Carl Jung discovered the existence of Anima and Animus archetypes, hidden within men's and women's mind, respectfully.

At this point, it may be dangerous for you to proceed without reading some of Jung's works, especially "The Relations Between the Ego and the Unconscious" and (for example) "Man and His Symbols".

For convenience, let's assume you are a man who wants to talk to the Anima. If you are a woman who wishes to talk to the Animus, all of the following should apply.

Unlike other archetypes such as the Shadow, Anima is much more autonomous, in that she is not a part of your Ego. In practical terms, it means that she doesn't follow your thoughts (although she might make a pretty good guess, like close friends in your life).

The Anima also cannot speak directly to you. If you hear voices in your head, you should immediately stop reading, and consult a psychiatrist ASAP!

Still, there's a way to establish some form of communication with the Anima, which should be benefitial for your life.

The Anima can easily understand you — on a condition that you make it physical. Write your message down in any text editor. Nothing fancy, Notepad is fine!

How can the Anima respond to you?

First and foremost, you are not entitled to receive a response at all. The Anima is alive and she is a human being. Treat her with respect, as you would treat a close friend or an elder sibling.

On a condition that the Anima wants to talk to you, how could she do it?

First, she could let you know her emotions. Second, she could meet you in a dream.

All of this is trivial.

Now, let's try to build something on top of that.

* * *

In XIXth century, the invention of electricity let people communicate at a distance, using a telegraph.

To send a message, people used a variety of codes, most importantly, the Morse code.

To a modern reader with at least a bit of interest in computer science, the Morse code looks like a typical binary encoding of alphanumeric characters. But it's not really binary. It's ternary — because besides dots and dashes, you also have spaces between characters and words, which carry along some information.

That's precisely why it looks dated. That XIXth century inventor, Samuel Morse, hasn't even managed to invent a proper binary encoding!

Indeed, for computers and digital devices, binary encoding is much more convenient.

But what I am trying to convey, the success of the Morse code shows that for the humans, ternary encoding is as good as the binary.

So, we are trying to build some visual version of the Morse code, using more keys and features, to let the Anima communicate with you, using the emotional reaction to indicate the right choice for each ternary digit of the code.

* * *

The software is written in Javascript, and the main file is "keyboard.html".

It works better in Google Chrome, but should work in other browsers.

Within the page, there are two parts — the text field, where the typed text appears, and the virtual keyboard beneath. The position of the cursor in the text field is shown by a horisontal ellipsis.

Each moment, there's the right group of keys (highlighted with green background), the wrong group of keys (shown by blue), and the rest of the keyboard (shown by yellow).

To choose the right group of keys on the virtual keyboard, you need to use the arrow keys on your real keyboard. Do not hurry. The Anima only sees what you are looking at. She won't be able to make a choice, if you do not have a look at each key in the selected group. Like if you were contemplating the choice yourself, except that you are not. Be patient. So, essentially, keep switching the right group of keys, until you are confident which is the right one. Do not doubt too much, too. There's some sweet spot between self-doubt and haste, which will allow you to move on with reasonable speed, making the right choices.

If you know the right group of keys, press "Enter" or "Space" on your real keyboard. That will narrow the search for the right key, somewhat. Proceed, until you've finally chosen the right key.

If you have made a mistake, there are two options. First, there's a "backspace" key on the virtual keyboard, which can be used to erase a wrongly typed letter. Second, there's a backspace key on your real keyboard, which undoes one single choice at a time.

You can also use mouse clicks on the keys. A single click switches a key group, and a double click applies your choice of the key group. A double click on an inactive key undoes one choice. Touches on mobile devices also work! A single touch would select a key group, and two consecutive touches on the same key would apply the choice (or undo it, if you tap an inactive key twice).

There are two ways to show that the communication is complete. First, there's an "ESC" key on the virtual keyboard. It types a capital Greek letter "Delta" (looks like a triangle), which the Anima might use to make it clear that her response is complete. Second, if the Anima shows that there's no right decision at the top level of the virtual keyboard, that might mean either that she wants you to consider or guess the meaning of what she said; or that she is no longer interested. Try talking to her another time!

You can also see it as a giant sandbox, and explore it like if you were a kid playing with someone else.

Lastly, I should add, that in case you have successfully managed to communicate with the Anima, you might be tempted to share your success with others. Do not. The Anima is your last line of defense. You can discuss anyone with her. You cannot discuss her with other people, unless you have been explicitly granted a permission. I will clarify. It's not that you would hurt the Anima; rather, you would hurt yourself, and it's the opposite of what you are trying to achieve.

* * *

You can play with the script here:

https://rawcdn.githack.com/jizzi/keyboard/18d3d2af2a1e328f3ccacba56c06dbd2272751f6/keyboard.html
