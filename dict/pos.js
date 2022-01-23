var move_select_state = 0;	// 0 is move cursor, 1 is select text
var stop_handle = "";		// "" is uninitialized, other values are
				// "PgUp", "PgDn", "Left", "Right", "Up", "Down", "Left2", "Right2"

const lines_in_a_page = 7;

function realize_pos_keyboard(lang)
{
	// realize keyboard for positioning the cursor, selecting text and more
	move_select_state = 0;
	stop_handle = "";

	init_pos_keyboard();

	init_pos_button_list(lang);
	
	generate_table();
//	alert(update_table(0));
	update_table(1);
}



function init_pos_keyboard()
{
	current_interface = "pos";

	var delta1 = 0.7, delta2 = 0.40;		// for aligning

	table_spans = [	7.5,             7.5,             	7.5,              7.5, 	 0,	// 4 keys, sum_spans = 30
			15,				  	15,			 0,
			3,	3,	3,	3,	3,      7.5 + delta1/2,	  7.5 + delta1/2,	 0,
			3,	3,	3,	3,	3,	5 + delta2/3, 5 + delta2/3, 5 + delta2/3,	 0
	  	      ];

		
}

function isKeyId(element, index, array) 
{
	return element.id1 == this;
}



function init_pos_button_list(lang, update = 0)
{
	// if update == 0, initialize buttons to the initial state
	// if update == 1, just do the minor changes, reflecting both the 'move_select_state' and 'stop_handle' variables 

	var left_arrow = "\u2190", up_arrow = "\u2191", right_arrow = "\u2192", down_arrow = "\u2193";
	var left_two_arrows = "\u21c7", right_two_arrows = "\u21c9";

	if (lang != "rus" && lang != "eng")
	{
		alert ('init_pos_button_list: unknown language ' + lang);
		return;
	}

	// variables for captions
	var cap_exit, cap_copy, cap_paste, cap_cut, cap_stop1, cap_stop2, cap_select1, cap_select2;
	var cap_clear, cap_select_word, cap_select_all, cap_start, cap_end;

	if (lang == "eng")
	{
		cap_exit = "Exit";
		cap_copy = "Copy";
		cap_paste = "Paste";
		cap_cut = "Cut";
		cap_stop1 = "Exit from moving cursor mode";
		cap_stop2 = "Exit from text selection mode";
		cap_select1 = "Select text";
		cap_select2 = "Move cursor";
		cap_clear = "Clear selection";
		cap_select_word = "Select word";
		cap_select_all = "Select all";
		cap_start = "Text start";
		cap_end = "Text end";
	}                     
	else
	{
		cap_exit = "\u0412\u044B\u0445\u043E\u0434";
		cap_copy = "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C";
		cap_paste = "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C";
		cap_cut = "\u0412\u044B\u0440\u0435\u0437\u0430\u0442\u044C";
		cap_stop1 = "\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u0440\u0435\u0436\u0438\u043C\u0430 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u0443\u0440\u0441\u043E\u0440\u043E\u043C";
		cap_stop2 = "\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u0440\u0435\u0436\u0438\u043C\u0430 \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u044F \u0442\u0435\u043A\u0441\u0442\u0430";
		cap_select1 = "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442";
		cap_select2 = "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u043A\u0443\u0440\u0441\u043E\u0440\u043E\u043C";
		cap_clear = "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435";
		cap_select_word = "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u0441\u043B\u043E\u0432\u043E";
		cap_select_all = "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u0432\u0441\u0451";
		cap_start = "\u041D\u0430\u0447\u0430\u043B\u043E \u0442\u0435\u043A\u0441\u0442\u0430";
		cap_end = "\u041A\u043E\u043D\u0435\u0446 \u0442\u0435\u043A\u0441\u0442\u0430";
	}

	if (update == 0)
	{
		button_list = [
		    new Kbd_Button("Key_0_0" , null,  tri(' 00      '), null, null,  cap_exit,         cap_exit,         realize_normal_keyboard, realize_normal_keyboard, lang, lang),
		    new Kbd_Button("Key_0_1" , null,  tri(' 010     '), null, null,  cap_copy,         cap_copy,         solitary_move,  solitary_move, [lang, "copy"],        [lang, "copy"]),
		    new Kbd_Button("Key_0_2" , null,  tri(' 011     '), null, null,  cap_paste,        cap_paste,        solitary_move,  solitary_move, [lang, "paste"],       [lang, "paste"]),
		    new Kbd_Button("Key_0_3" , null,  tri(' 012     '), null, null,  cap_cut,          cap_cut,          solitary_move,  solitary_move, [lang, "cut"],         [lang, "cut"]),
		    new Kbd_Button("Key_1_0" , null,  tri('10       '), null, null,  cap_stop1,        cap_stop1,        solitary_move,  solitary_move, [lang, "stop"],        [lang, "stop"]),
		    new Kbd_Button("Key_1_1" , null,  tri(' 20      '), null, null,  cap_select1,      cap_select1,      move_or_select, move_or_select, lang,                  lang),
		    new Kbd_Button("Key_2_0" , null,  tri(' 102     '), null, null,  "Home",           "Home",           solitary_move,  solitary_move, [lang, "home"],        [lang, "home"]),
		    new Kbd_Button("Key_2_1" , null,  tri(' 11010   '), null, null,  "PgUp",           "PgUp",           sticky_move,    sticky_move,   [lang, "PgUp"],        [lang, "PgUp"]),
		    new Kbd_Button("Key_2_2" , null,  tri(' 11000   '), null, null,  up_arrow,         up_arrow,         sticky_move,    sticky_move,   [lang, "Up"],          [lang, "Up"]    ),
		    new Kbd_Button("Key_2_3" , null,  tri(' 11110   '), null, null,  "PgDn",           "PgDn",           sticky_move,    sticky_move,   [lang, "PgDn"],        [lang, "PgDn"]),
		    new Kbd_Button("Key_2_4" , null,  tri(' 122     '), null, null,  "End",            "End",            solitary_move,  solitary_move, [lang, "end"],         [lang, "end"]),
		    new Kbd_Button("Key_2_5" , null,  tri(' 210     '), null, null,  cap_clear,        cap_clear,        solitary_move,  solitary_move, [lang, "clear"],       [lang, "clear"]),
		    new Kbd_Button("Key_2_6" , null,  tri(' 211     '), null, null,  cap_select_word,  cap_select_word,  solitary_move,  solitary_move, [lang, "select_word"], [lang, "select_word"]),
		    new Kbd_Button("Key_3_0" , null,  tri(' 1010    '), null, null,  left_two_arrows,  left_two_arrows,  sticky_move,    sticky_move,   [lang, "Left2"],       [lang, "Left2"]),
		    new Kbd_Button("Key_3_1" , null,  tri(' 1000    '), null, null,  left_arrow,       left_arrow,       sticky_move,    sticky_move,   [lang, "Left"],        [lang, "Left"]),
		    new Kbd_Button("Key_3_2" , null,  tri(' 11100   '), null, null,  down_arrow,       down_arrow,       sticky_move,    sticky_move,   [lang, "Down"],        [lang, "Down"]),
		    new Kbd_Button("Key_3_3" , null,  tri(' 1200    '), null, null,  right_arrow,      right_arrow,      sticky_move,    sticky_move,   [lang, "Right"],       [lang, "Right"]),
		    new Kbd_Button("Key_3_4" , null,  tri(' 1210    '), null, null,  right_two_arrows, right_two_arrows, sticky_move,    sticky_move,   [lang, "Right2"],      [lang, "Right2"]),
		    new Kbd_Button("Key_3_5" , null,  tri(' 220     '), null, null,  cap_select_all,   cap_select_all,   solitary_move,  solitary_move, [lang, "select_all"],  [lang, "select_all"]),
		    new Kbd_Button("Key_3_6" , null,  tri(' 221     '), null, null,  cap_start,        cap_start,        solitary_move,  solitary_move, [lang, "start"],       [lang, "start"]),
		    new Kbd_Button("Key_3_7" , null,  tri(' 222     '), null, null,  cap_end,          cap_end,          solitary_move,  solitary_move, [lang, "finish"],      [lang, "finish"])
		];     
	}
	else
	{
		//var move_select_state = 0;	// 0 is move cursor, 1 is select text
		//var stop_handle = "";		// "" is uninitialized, other values are
		//				// "PgUp", "PgDn", "Left", "Right", "Up", "Down", "Left2", "Right2"

		var ind_sel, ind_stop;
		ind_stop = button_list.findIndex(isKeyId, "Key_1_0");
		ind_sel  = button_list.findIndex(isKeyId, "Key_1_1");

//		alert('ind_stop = ' + ind_stop.toString() + ', ind_sel = ' + ind_sel.toString());

		if (move_select_state == 0)
		{
			button_list[ind_sel].mask1  = cap_select1;
			button_list[ind_sel].mask2  = cap_select1;
			button_list[ind_stop].mask1 = cap_stop1;
			button_list[ind_stop].mask2 = cap_stop1;
		}
		else
		{
			button_list[ind_sel].mask1  = cap_select2;
			button_list[ind_sel].mask2  = cap_select2;
			button_list[ind_stop].mask1 = cap_stop2;
			button_list[ind_stop].mask2 = cap_stop2;
		}

		switch (stop_handle)
		{
			case "PgUp":
					button_list[ind_stop].number = tri(' 11011   ');
					break;
			case "PgDn":
					button_list[ind_stop].number = tri(' 11111   ');
					break;

			case "Up":
					button_list[ind_stop].number = tri(' 11001   ');
					break;
			case "Down":
					button_list[ind_stop].number = tri(' 11101   ');
					break;
			case "Left":
					button_list[ind_stop].number = tri(' 1001    ');
					break;
			case "Left2":
					button_list[ind_stop].number = tri(' 1011    ');
					break;
			case "Right":
					button_list[ind_stop].number = tri(' 1201    ');
					break;
			case "Right2":
					button_list[ind_stop].number = tri(' 1211    ');
					break;

			default:
					button_list[ind_stop].number = tri('10       ')
					break;
		}
	}
}


function move_or_select(lang)
{
	move_select_state = 1 - move_select_state;
	init_pos_button_list(lang, 1);
	update_table(1);
}


function sticky_move(args)
{
	var lang = args[0], direction = args[1];
	store_current_num_and_bit(1);			// restore current_num and current_bit, making the button appear "sticky"

	var sel_not_empty = (selection_start != selection_end);

	// movement part
	// var move_select_state = 0;		// 0 is move cursor, 1 is select text
	// var stop_handle = "";		// "" is uninitialized, other values are

	var mode = 0;

	// mode == 0:	simply moving a cursor
	// mode == 1:   moving a cursor, leaving selection_start intact
	// mode == 2:   moving selection_start, leaving the cursor (selection_end) intact


	if (move_select_state == 0)
	{
		if (sel_not_empty)
		{
			mode = 1;
		}
		else
		{
			mode = 0;
		}
	}
	else
	{
		mode = 2;
	}

	var i, chr, pos;

	switch( direction )
	{
		// sticky...
		case "PgUp":
				for (i = 0; i < lines_in_a_page; i++)
				{
					moveCursor("up", mode);
				}

				break;

		case "Up":
				moveCursor("up", mode);
				break;

		case "PgDn":
				for (i = 0; i < lines_in_a_page; i++)
				{
					moveCursor("down", mode);
				}

				break;

		case "Left2":
				do
				{
					[chr, pos] = moveCursor("left", mode);
				}
				while( is_alphanumeric(chr) && pos != 0 );
				
				break;
		case "Left":
				moveCursor("left", mode);
				break;
		case "Down":
				moveCursor("down", mode);
				break;
		case "Right":
				moveCursor("right", mode);
				break;
		case "Right2":
				do
				{
					[chr, pos] = moveCursor("right", mode);
				}
				while( is_alphanumeric(chr) && pos < typed_text.length );
				break;

		default:
				break;
	}



	// key management part


	if (stop_handle == direction)
	{
		current_bit ++;				// sticky, but no longer sinking
	}
	else
	{
		stop_handle = direction;
		init_pos_button_list(lang, 1);
		update_table(1);
	}
	
}


function convert_to_plain_text(mytxt)
{
	var i;
	var out_text = "", opening_glyph = 0;

	for (i = 0; i < mytxt.length; i++)
	{
		if (mytxt.charAt(i) == '\r')
		{
			// skip
		}
		else if (mytxt.charAt(i) == '\n')
		{
			out_text += "\r\n";
		}
		else if (mytxt.charAt(i) == '$')
		{
			if (opening_glyph == 0)
			{
				glyph_start = i + 1;
				opening_glyph = 1;
			}
			else
			{
				glyph_id = parseInt(mytxt.substring(glyph_start, i));
				// special characters
				// '$0$' is '$'
				if (isNaN(glyph_id) || glyph_id == 0)	// '$' sign
				{
					out_text += '$';
				}
				else if (glyph_id < 0)
				{
					switch (-glyph_id)
					{
						case 1:
							out_text += " ";
							// '$-1$' is '&nbsp;'
							break;
						case 2:
//							out_text += "       ";
							out_text += "\t";
							// '$-2$' is 7 non breaking spaces
							// my version of "Tab"
							break;
						case 3:
							out_text += "<";
							// '$-3$' is '<'
							break;
						case 4:
							out_text += ">";
							// '$-4$' is '>'
							break;
						default:
							out_text += '<unknown ID, '+ glyph_id.toString() +'>';
							break;
					}

				}
				else
				{
					out_text += get_alt_text_from_glyph_id(glyph_id);	// includes "<" and ">" brackets
				}

				opening_glyph = 0;
			}
		}
		else if (opening_glyph == 0)
		{
			out_text += mytxt.charAt(i);
		}
	}

	return out_text;
}


function convert_to_internal_text(in_text)
{
	var i;
	var out_text = "", in_text2 = "", in_text3 = "", opening_glyph = 0, glyph_name = "";

	// first pass -- carriage returns and '$' symbols
	for (i = 0; i < in_text.length; i++)
	{
		if (in_text.charAt(i) == '\r')
		{
			// skip
		}
		else if (in_text.charAt(i) == '$')
		{
			in_text2 += "$0$";
		}
		else
		{
			in_text2 += in_text.charAt(i);
		}
	}

	// second pass -- glyphs
	for (i = 0; i < in_text2.length; i++)
	{
		if (in_text2.charAt(i) == '<' || in_text2.charAt(i) == '>')
		{
			if (opening_glyph == 0 && in_text2.charAt(i) == '<')
			{
				glyph_start = i + 1;
				opening_glyph = 1;
			}
			else if (opening_glyph == 1 && in_text2.charAt(i) == '>')
			{
				glyph_name = in_text2.substring(glyph_start, i);
				// special characters
				// '$0$' is '$'
				var __FOUND = emoji_list.findIndex(
									function(glyph_item, index) 
									{
										if(glyph_item.emoji_name == glyph_name)
										return true;
									}
								  );	
				
				var html_code = "$-3$" + glyph_name + "$-4$";

				if (__FOUND != -1)
				{
					html_code = "$" + emoji_list[__FOUND].uni_id.toString() + "$";
				}

				out_text += html_code;

				opening_glyph = 0;
			}
			else if (opening_glyph == 1 && in_text2.charAt(i) == '<')
			{
				// outputting a part
				out_text += in_text2.substring(glyph_start - 1, i);
				glyph_start = i + 1;
			}
		}
		else if (opening_glyph == 0)
		{
			out_text += in_text2.charAt(i);
		}
	}

	if (opening_glyph == 1)
	{
		out_text += in_text2.substring(glyph_start - 1);
	}

	// third pass -- ">", "<", spaces

	in_text3 = out_text;
	out_text = "";
	var count_spaces = 0;

	for (i = 0; i < in_text3.length; i++)
	{
		switch (in_text3.charAt(i))
		{
			case " ":
					if (count_spaces % 2 == 0)
					{
						out_text += "$-1$";		// "&nbsp;"
					}
					else
					{
						out_text += " ";
					}
					count_spaces ++;
					break;
			case ">":
					out_text += "$-4$";
					count_spaces = 0;
					break;
			case "<":
					out_text += "$-3$";
					count_spaces = 0;
					break;
			case "\t":
					out_text += "$-2$";
					break;
			default:
					out_text += in_text3.charAt(i);
					if ( is_alphanumeric(in_text3.charAt(i)) )
					{
						// breaking space after a word
						count_spaces = 1;
					}
					else
					{
						count_spaces = 0;
					}
					break;
		}
	}
	
	return out_text;
}



function solitary_move(args)
{
	var lang = args[0], direction = args[1];

	var sel_not_empty = (selection_start != selection_end);

	// movement part
	// var move_select_state = 0;		// 0 is move cursor, 1 is select text
	// var stop_handle = "";		// "" is uninitialized, other values are

	var mode = 0;

	// mode == 0:	simply moving a cursor
	// mode == 1:   moving a cursor, leaving selection_start intact
	// mode == 2:   moving selection_start, leaving the cursor (selection_end) intact


	var i, chr, pos, pos2;

	if (move_select_state == 0)
	{
		pos = selection_end;
		if (sel_not_empty)
		{
			mode = 1;
		}
		else
		{
			mode = 0;
		}
	}
	else
	{
		pos = selection_start;
		mode = 2;
	}


	// movement part
	// copy, paste, cut, stop, home, end, clear, select_word, select_all, start, finish

	var postprocessing_required = 0;

	var selection_early, selection_late, text_to_proc = "";

	[selection_early, selection_late] = sort_two_values_ascending(selection_start, selection_end);


	switch( direction )
	{
		// solitary...
		case "copy":
				// await navigator.clipboard.writeText("Howdy, partner!");
				text_to_proc = convert_to_plain_text( typed_text.substring(selection_early, selection_late) );

				navigator.clipboard.writeText( text_to_proc );
				break;

		case "paste":
				try
				{
					navigator.clipboard.readText().then(
							function(data) 
							{
								paste_data(data);
							} );
				}
				catch(e)
				{
					// provide an alternative means to paste the data

					/*
					// but need a nicer solution
					let invitation = "";

					if (lang == "eng")
					{
						invitation = "Paste the text here:";
					}
					else
					{
						invitation = "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0432 \u044D\u0442\u043E \u043F\u043E\u043B\u0435:";
					}

					let data = prompt(invitation, "");

					if (data != null)
					{
						paste_data(data);
					}
					*/

					interface_for_pasting_data(lang);

//					renderTextToInnerHTML();
					return;
				}

				break;

		case "cut":
				// copy to clipboard
				text_to_proc = convert_to_plain_text( typed_text.substring(selection_early, selection_late) );

				navigator.clipboard.writeText( text_to_proc );

				// remove selected text
				typed_text = typed_text.substring(0, selection_early) + typed_text.substring(selection_late);

				selection_start = selection_early;
				selection_end = selection_early;
				
				break;

		case "stop":
				// nothing to do?
				break;

		case "home":
				for (i = pos; i > 0; i--)
				{
					if (typed_text.charAt(i) == "\n")
					{
						break;
					}
				}

				pos = i;

				postprocessing_required = 1;
				break;

		case "end":
				for (i = pos; i <= typed_text.length; i++)
				{
					if (typed_text.charAt(i) == "\n")
					{
						break;
					}
					pos = i;
				}

				postprocessing_required = 1;
				break;

		case "clear":
				selection_start = selection_end;
				break;

		case "select_word":
//				selection_start = selection_end;

				pos = selection_end - 1;
				if (pos < 0)
				{
					pos = 0;
				}

				if (typed_text.charAt(pos) == "$")
				{
					// leave anything like it was,
					// just clear the selection
					selection_start = selection_end;
					break;
				}

				pos2 = pos;
				while(is_alphanumeric(typed_text.charAt(pos)))
				{
					pos2 = pos;
					pos --;
					if (pos < 0)
					{
						pos = 0;
						break;
					}
				}
				selection_start = pos2;		// most early alphanumeric character

				// ...
				pos = selection_end;
				while(is_alphanumeric(typed_text.charAt(pos)))
				{
					pos ++;
					if (pos > typed_text.length)
					{
						pos = typed_text.length;
						break;
					}
				}
				selection_end = pos;

				break;

		case "select_all":
				selection_start = 0;
				selection_end = typed_text.length;
				break;

		case "start":
				pos = 0;
				postprocessing_required = 1;
				break;

		case "finish":
				pos = typed_text.length;
				postprocessing_required = 1;
				break;

		default:
				break;
	}

	if (postprocessing_required != 0)
	{
		// only "pos" has been changed, but not selection_start or selection_end
		switch(mode)
		{
			case 0:
				// mode == 0:	simply moving a cursor
				selection_start = pos;
				selection_end = pos;
				break;
			case 1: 
				// mode == 1:   moving a cursor, leaving selection_start intact
				selection_end = pos;
				break;
			case 2:
				// mode == 2:   moving selection_start, leaving the cursor (selection_end) intact
				selection_start = pos;
				break;

			default:
				// do nothing
				break;
		}


	}


	// update

	renderTextToInnerHTML();

//	alert('selection_start = ' + selection_start.toString() + ', selection_end = ' + selection_end.toString());

	if (stop_handle != "")
	{
		stop_handle = "";
		init_pos_button_list(lang, 1);
		update_table(1);
	}
}


function sort_two_values_ascending(a, b)
{
	if (a <= b)
	{
		return [a, b];
	}
	else
	{
		return [b, a];
	}
}


function paste_data (data)
{
	//	console.log(“Your string: ”, data);
		var selection_early, selection_late, text_to_proc = "";

		[selection_early, selection_late] = sort_two_values_ascending(selection_start, selection_end);

		text_to_proc = convert_to_internal_text( data );

		if (selection_end < selection_start)
		{
			// leave cursor at the beginning of the pasted text
			pos = selection_end;
		}
		else
		{
			// leave cursor at the end of the pasted text
			pos = selection_start + text_to_proc.length;
		}

		typed_text = typed_text.substring(0, selection_early) + text_to_proc +
			     typed_text.substring(selection_late);

		// clear selection
		selection_start = pos;
		selection_end = pos;

		renderTextToInnerHTML();
}


function interface_for_pasting_data(lang)
{
	if (lang != "rus" && lang != "eng")
	{
		alert ('interface_for_pasting_data: unknown language ' + lang);
		return;
	}


	current_interface = "paste";

	// can be called from pos interface...
	table_spans = [	30,  0,	 22,  4, 4, 0];


	generate_table();

	let invitation = "", cap_button_ok = "", cap_button_cancel = "";

	if (lang == "eng")
	{
		invitation = "Paste the text here:";
		cap_button_ok = "OK";
		cap_button_cancel = "Cancel";
	}
	else
	{
		invitation = "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0432 \u044D\u0442\u043E \u043F\u043E\u043B\u0435:";
		cap_button_ok = "\u041E\u041A";
		cap_button_cancel = "\u041E\u0442\u043C\u0435\u043D\u0430";
	}


	// generate alternative interface now
	button_list = [
	    new Kbd_Button("Key_0_0" ,       null,  tri('1        '), null, null,   invitation,      invitation,  null, null),
//	    new Kbd_Button("Key_1_0" ,       null,  tri('1        '), null, null,   null,     null, null, null),
	    new Kbd_Button("Key_1_1" ,       null,  tri(' 0       '), null, null,   cap_button_ok,   cap_button_ok, retrieve_pasted_data, retrieve_pasted_data, [lang, "ok"], [lang, "ok"]),
	    new Kbd_Button("Key_1_2" ,       null,  tri(' 1       '), null, null,   cap_button_cancel,   cap_button_cancel, retrieve_pasted_data, retrieve_pasted_data, [lang, "cancel"], [lang, "cancel"]),
	    ];

	var mycell = document.getElementById("Key_1_0");
	mycell.innerHTML = "<textarea id=\"area_for_pasting_data\" name=\"story\" rows=\"2\" cols=\"70\">";
	mycell.style.backgroundColor = color_keyboard;



	
}

function retrieve_pasted_data(args)
{
	var lang = args[0], mode = args[1];
	var myarea = document.getElementById("area_for_pasting_data");

	if (mode == "ok")
	{
		paste_data(myarea.value);
	}

//	realize_normal_keyboard(lang);
	realize_pos_keyboard(lang);
}

