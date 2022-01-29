var dtoc = new Array();

var max_entries_per_level = new Array();

var dictionary = new Array();

var dict_columns = new Array();

var max_toc_levels = 0;

var toc_entry_index = new Array();

var last_toc_entry_index = 0;

var toc_choice = new Array();

var toc_shift = new Array();

// --------------
//
var   is_cued_dictionary = 0;

//                                                        [ 1,  2,  3,  4,  5,  6,  7,  8,  9];
const max_displayed_word_size_per_number_of_columns_eng = [60, 37, 33, 20, 15, 11,  9,  6,  5];
const max_displayed_word_size_per_number_of_columns_rus = [60, 33, 25, 19, 13, 11,  9,  7,  6];
//const max_displayed_word_size_per_number_of_columns   = [62, 30, 19, 14, 10,  8,  7,  6,  5];

var current_dictionary_level = 0;

//const up_one_level = "\ufe5d\u21e7\ufe5e";
const up_one_level 	  = "\u3014 &nbsp; <b>\u21e7</b> &nbsp; \u3015";
const up_one_level_narrow = "\u3014<b>\u21e7</b>\u3015";
// if more cols than this const, use 'narrow' version of up_one_level
const max_cols_for_full_caption = 6;		


//var max_chars_to_show = 8;	// don't display long dash if caption length exceeds this value, for 1st level of TOC

function start_any_dict(lang)
{
	// start normal dictionary, or propose to choose between normal and cued dictionaries

	if (lang != "rus" && lang != "eng")
	{
		alert ('start_any_dict: unknown language ' + lang);
		return;
	}
	
	var last_word;

	last_word = get_last_word(0);		// don't change selection

	if (last_word == "")
	{
		// start normal dictionary
		current_dictionary_level = 0;
		realize_dict(0, lang);
	}
	else
	{

		current_interface = "dict_any";

		// can be called from pos interface...
		table_spans = [	30,  0,	 30, 0, 30, 0, 30, 0];

		generate_table();

		let invitation = "", cap_button_exit = "", cap_button_norm = "", cap_button_cued = "";

		if (lang == "eng")
		{
			invitation = "Choose between a normal and a cued dictionary:";
			cap_button_exit = "Exit";
			cap_button_norm = "Normal";
			cap_button_cued = "Cued";
		}
		else
		{
			invitation = "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u044B\u0447\u043D\u044B\u0439 \u0438\u043B\u0438 \u0434\u043E\u043F\u043E\u043B\u043D\u044F\u044E\u0449\u0438\u0439 \u0441\u043B\u043E\u0432\u0430\u0440\u044C:";
			cap_button_exit = "\u0412\u044B\u0445\u043E\u0434";
			cap_button_norm = "\u041E\u0431\u044B\u0447\u043D\u044B\u0439";
			cap_button_cued = "\u0414\u043E\u043F\u043E\u043B\u043D\u044F\u044E\u0449\u0438\u0439";
		}


		// generate alternative interface now
		button_list = [
		    new Kbd_Button("Key_0_0", null, tri('1        '), null, null, invitation,      invitation,      null, null),
		    new Kbd_Button("Key_1_0", null, tri(' 0       '), null, null, cap_button_exit, cap_button_exit, realize_normal_keyboard, realize_normal_keyboard, lang, lang),
		    new Kbd_Button("Key_2_0", null, tri(' 1       '), null, null, cap_button_norm, cap_button_norm, start_normal_dict,       start_normal_dict,       lang, lang),
		    new Kbd_Button("Key_3_0", null, tri(' 2       '), null, null, cap_button_cued, cap_button_cued, realize_cued_dict,       realize_cued_dict,       lang, lang)
		    ];

	}
}


function start_normal_dict(lang)
{
	// wrapper
	if (lang != "rus" && lang != "eng")
	{
		alert ('start_normal_dict: unknown language ' + lang);
		return;
	}

	current_dictionary_level = 0;

	realize_dict(0, lang);
}

/*
function start_cued_rus_dict()
{
	// simple wrapper
	realize_cued_dict("rus");
}

function start_cued_eng_dict()
{
	// another simple wrapper
	realize_cued_dict("eng");
}
*/



function factor_2_3(k)
{
	// factorizes the input into powers of 2 and 3

	var factor, rem_k, div_k, k_2_factors = 0, k_3_factors = 0;

	factor = 2;
	div_k = k;
	do
	{
		rem_k = div_k % factor;
		if (rem_k == 0)
		{
			div_k = div_k / factor;
			if (factor == 2)
			{
				k_2_factors ++;
			}
			else
			{
				k_3_factors ++;
			}
		}
		else
		{
			factor ++;
		}

	}
	while (rem_k == 0 || factor <= 3);

	if (div_k != 1)
	{
		alert('factor_2_3, wrong input: ' + k.toString());
	}

	return new Array(k_2_factors, k_3_factors);

}

function adjust_factors_2_3(ratio, factors)
{
	// if there are fewer keys than the maximum allowed amount, perhaps I need to skip some steps
	var cur_rat = ratio;
	var cur_factors = factors.slice();
	var i;

	while (cur_rat <= 0.5 && cur_factors[0] > 0)
	{
		cur_rat *= 2;
		cur_factors[0] --;
	};

	while (cur_rat < 0.3333334 && cur_factors[1] > 0)
	{
		// strictly speaking, that could be above 1, but really this just accounts for the (cur_rat == 1/3) case
		cur_rat *= 3;
		cur_factors[1] --;
	};

	return cur_factors;
	
}

function get_value_from_factors_2_3(factors)
{
	var value = 1;
	// create a copy of array
	var cur_fact = factors.slice();

	while(cur_fact[0] > 0)
	{
		value *= 2;
		cur_fact[0] --;
	};

	while(cur_fact[1] > 0)
	{
		value *= 3;
		cur_fact[1] --;
	};

	return value;
}

function number_of_characters_to_show(a, b)
{
	var al = a.toLowerCase();
	var bl = b.toLowerCase();

	var i;

	for (i=1; i < al.length; i++)
	{
//		if (al.substring(0, i) != bl.substring(0, i))
//		if ( (al.substring(0, i) != bl.substring(0, i)) && ( al.substring(i-1, i) != ' ') )
		if ( (al.substring(0, i) != bl.substring(0, i)) && ( al.substring(i-1, i) != ' ') && ( bl.substring(i-1, i) != ' '))
		{
			break;
		}
	}

	return i;
}

function is_rectangle_empty(k_cols, k_rows, k_num, row_start, col_start) 
{
	// function returns, whether or not the rectangle starting from row_start and col_start
	// would be empty, on a grid of size (k_cols x k_rows) filled with (k_num) entities
	//
	// row_start and col_start are indexed from 0
	// k_num starts from 1
	//
	// it goes:
	//      1          2          3          ...          k_cols
	// (k_cols+1)  (k_cols+2)  (k_cols+3)    ...	      k_cols*2
	// ...
	// ...	k_num ...
	// ...

	var lowest_position = 1 + col_start + row_start*k_cols;
	return (lowest_position > k_num);
	
}


function get_tree_position(key_index, k_cols, k_rows, k_num)
{
	// k_cols and k_rows must have only "2" or "3" prime factors

	var k_col_num, k_row_num;

	k_col_num =  (key_index - 1) % k_cols;
	k_row_num = ((key_index - 1) - k_col_num) / k_cols;

	var i, j;

	var k_cols_factors = factor_2_3(k_cols);
	var k_rows_factors = factor_2_3(k_rows);

	// ---------------

	var k_num_cols, k_num_rows;
	k_num_rows = Math.ceil(k_num / k_cols);
	if (k_num_rows > 1)
	{
		k_num_cols = k_cols;
	}
	else
	{
		k_num_cols = k_num;
	}

	var k_num_col_ratio = k_num_cols / k_cols;
	var k_num_row_ratio = k_num_rows / k_rows;
//	alert('k_num_col_ratio = ' + k_num_col_ratio.toString() + ', k_num_row_ratio = ' + k_num_row_ratio.toString());

	k_cols_factors = adjust_factors_2_3(k_num_col_ratio, k_cols_factors);
	k_rows_factors = adjust_factors_2_3(k_num_row_ratio, k_rows_factors);

	// -------------------

	var factor, direction;

	factor = 2;
	direction = "cols";

//	alert(k_cols_factors);
//	alert(k_rows_factors);

//	alert (number_of_characters_to_show("\u0431\u043B\u0435\u0430\u0442\u044C", "\u0411\u041B\u042F\u0414\u042C!"));

	var new_k_cols = get_value_from_factors_2_3(k_cols_factors);
	var new_k_rows = get_value_from_factors_2_3(k_rows_factors);

	var div_k_cols = new_k_cols;
	var div_k_rows = new_k_rows;


	// my grid is now of size (new_k_cols x new_k_rows)

	var div_a_cols = k_col_num, div_a_rows = k_row_num;
	var rem_a_cols = 0,         rem_a_rows = 0;

	var n_bit = num_bits;
	var new_trit = 0, new_trit_value = 0;
	var tree_value = 0;

	var col_start = 0, row_start = 0;
	var col_shift, row_shift;
//	alert(div_k_cols);
//	alert(div_k_rows);

//	alert(k_cols_factors);
//	alert(k_rows_factors);
//	alert('k_cols_factors = [' + k_cols_factors[0].toString() + ', ' + k_cols_factors[1].toString() + ']; ' + 
//	      'k_rows_factors = [' + k_rows_factors[0].toString() + ', ' + k_rows_factors[1].toString() + ']');


	// key_index starts with 1

	while(div_k_cols > 1 || div_k_rows > 1)
	{
		new_trit = 0;
		if (direction == "cols")
		{
			// factor - 2 is indexing; factor could be 2 or 3, so I get index of 0 or 1
			if (k_cols_factors[factor - 2] != 0)
			{
//				alert('here1');
				k_cols_factors[factor - 2] --;
				div_k_cols /= factor;

				rem_a_cols =  div_a_cols % div_k_cols;
				col_shift =  (div_a_cols - rem_a_cols);

				div_a_cols = (div_a_cols - rem_a_cols) / div_k_cols;
				new_trit = 1;
				new_trit_value = div_a_cols;
				div_a_cols = rem_a_cols;

				// may be I need to skip one step here
				// <x>  <x>  <x>  < >  < >  < >  < >  < >  < >

				if (is_rectangle_empty(new_k_cols, new_k_rows, k_num, row_start, col_start + div_k_cols))
				{
					// cancel branching at this point
					new_trit = 0;
				}

				col_start += col_shift;			// col position of the current rectangle upper left corner

			}
			direction = "rows";
		}
		else //if (direction == "rows")
		{
			if (k_rows_factors[factor - 2] != 0)
			{
//				alert('here2');
				k_rows_factors[factor - 2] --;
				div_k_rows /= factor;

				rem_a_rows =  div_a_rows % div_k_rows;
				row_shift =  (div_a_rows - rem_a_rows);

				div_a_rows = (div_a_rows - rem_a_rows) / div_k_rows;
				new_trit = 1;
				new_trit_value = div_a_rows;
				div_a_rows = rem_a_rows;

				// may be I need to skip one step here
				// <x>  <x>
				// < >  < >
				// < >  < >

				if (is_rectangle_empty(new_k_cols, new_k_rows, k_num, row_start + div_k_rows, col_start))
				{
					// cancel branching at this point
					new_trit = 0;
				}

				row_start += row_shift;			// row position of the current rectangle upper left corner
			}

			factor = 5 - factor;
			direction = "cols";

		}

//		alert('div_k_cols = ' + div_k_cols.toString() + ', div_k_rows = ' + div_k_rows.toString());

		if (new_trit != 0)
		{
			tree_value += tri_digits[n_bit - 1] * new_trit_value;
			n_bit --;

			if (n_bit < 0)
			{
				alert('get_tree_position, insufficient bits');
				return 0;
			}
//			alert(new_trit_value);
		}
	}

	return tree_value;	
}

function type_chosen_word(current_word, lang)
{
	if (lang != "rus" && lang != "eng")
	{
		alert ('type_chosen_word: unknown language ' + lang);
		return;
	}

	typeInTextarea(current_word);

	if (current_word.substring(current_word.length - 1) != "-")
	{
		typeInTextarea(" ");
	}

	// return to normal keyboard

	realize_normal_keyboard(lang);

}



function realize_dict_wrapper(args)
{
	// helper function, used by realize_dict to make recursive calls,
	// and also called from dictionary selection mode
	realize_dict(args[0], args[1]);
}



function realize_dict(key_index, lang)
{  

//  key index enumeration:
//
//  0 is reserved
//
//  --------------------------------
//  |  1  |  2  |  3  | ...  |  n  |
//  |-------------------------------
//  | n+1 | n+2 | n+3 | ...  | 2*n |
//  |-------------------------------
//  ...
//

	if (lang != "rus" && lang != "eng")
	{
		alert ('realize_dict: unknown language ' + lang);
		return;
	}


//	current_dictionary_level = 0;

	if (current_dictionary_level == 0)
	{
		is_cued_dictionary = 0;
		current_interface = "dict_normal";

		if (lang == "rus")
		{
			// defined in "dict_rus.js"
			init_rus_dict();
		}
		else
		{
			// defined in "dict_eng.js"
			init_eng_dict();
		}
		
	}
	else
	{
		if (key_index <= 1)
		{
			toc_choice[current_dictionary_level - 1] = 0;
		}
		else
		{
			toc_choice[current_dictionary_level - 1] = key_index - 2;
		}
	}

	// init table

	if (key_index == 1)
	{
		if (current_dictionary_level == 1)
		{
			// return to normal keyboard
			realize_normal_keyboard(lang);
			return;
		}
		else
		{
			current_dictionary_level--;
			toc_choice[current_dictionary_level - 1] = 0;
		}
	}
	else
	{
		current_dictionary_level += 1;
	}

	var i, j, k;

	var last_toc_entry = 0, word_index_offset = 0, word_index;

//	alert('dtoc.length = ' + dtoc.length.toString());

	for (i = 0; i < dtoc.length; i++)
	{
		last_toc_entry += toc_choice[i] * toc_shift[i];
	}

//	alert('toc_choice[0] = ' + toc_choice[0].toString() + ', toc_shift[0] = ' + toc_shift[0].toString());

	for (i = dtoc.length; i < max_toc_levels; i++)
	{
		word_index_offset += toc_choice[i] * toc_shift[i];
	}

	// find the last TOC entry
	var first_word = 0, last_word = dictionary.length, prev_word;
	if (dtoc.length > 0)
	{
		if (last_toc_entry == 0)
		{
			first_word = 0;
		}
		else
		{
			first_word = dtoc[dtoc.length - 1][last_toc_entry - 1];
		}

		last_word = dtoc[dtoc.length - 1][last_toc_entry];
	}

	//  [ first_word; last_word)

	word_index = first_word + word_index_offset;
	if (word_index > 0)
	{
		prev_word = word_index - 1;
	}
	else
	{
		prev_word = 0;
	}


	if (current_dictionary_level > max_toc_levels)
	{
		// print chosen word
//		alert('here');

		type_chosen_word(dictionary[word_index], lang);

		return;
	}

//	alert('current_dictionary_level = ' + current_dictionary_level.toString());
//	alert('last_word = ' + last_word.toString() + ', word_index = ' + word_index.toString());

	// amount of keys
	var key_num, key_num_alt;

	key_num = max_entries_per_level[current_dictionary_level - 1];
	key_num_alt = key_num;
	if (current_dictionary_level > dtoc.length)
	{
		// key_num may be less than the maximum value...
		key_num_alt = Math.ceil( (last_word - word_index) / toc_shift[current_dictionary_level - 1] );

//		alert('key_num_alt = ' + key_num_alt.toString());
	}
	else if (current_dictionary_level == dtoc.length && dtoc.length >= 2)
	{
//		last_toc_entry += toc_choice[i] * toc_shift[i];
		// single use case
		for (i = last_toc_entry + toc_shift[dtoc.length-2] - 1; i > last_toc_entry; i--)
		{
			if (dtoc[dtoc.length-1][i] == dtoc[dtoc.length-1][i-1])
			{
				key_num_alt --;
			}
			else
			{
				break;
			}
		}
/*		if (key_num_alt < key_num)
		{
			alert('key_num_alt == ' + key_num_alt.toString());
		}
*/
	}

	if (key_num_alt < key_num)
	{
			key_num = key_num_alt;
//			alert('last_word = ' + last_word.toString() + ', word_index = ' + word_index.toString());
	}

//	alert('key_num == ' + key_num.toString());

	// end of search condition
	if (key_num == 1 && current_dictionary_level > max_toc_levels)
	{
		type_chosen_word(dictionary[word_index], lang);

		return;
	}


	// set key table up

	var k_cols = dict_columns[current_dictionary_level-1];
	var k_rows = (max_entries_per_level[current_dictionary_level-1] + 1) / k_cols;
	init_custom_simple_keyboard(k_rows, k_cols, k_rows*k_cols);			// key_rows, key_columns, max_keys

	if (key_num + 1 > k_cols*k_rows)	
	{
		let kn_out = key_num + 1;
		alert('realize_dict: key_num + 1 is too large, and equals ' + kn_out.toString());
	}


	// set key functions

	button_list = [];
	var bll = 0, tree_pos, caption, word1, word2, word2_prev, word1_ind, word2_ind, chars_to_show1, chars_to_show2, key_cap, args;
	var ccol, crow;
	caption = "";



	chars_to_show2 = number_of_characters_to_show(dictionary[word_index], dictionary[first_word]);
	word2 = dictionary[word_index];
	word2_ind = word_index;
	for (i = 0; i < key_num + 1; i++)
	{
		tree_pos = get_tree_position(i + 1, k_cols, k_rows, key_num + 1);		// + "up one level" key
		ccol =  i % k_cols;
		crow = (i - ccol  ) / k_cols;
		key_cap = "Key_" + crow.toString() + "_" + ccol.toString();
		args = new Array(i + 1, lang);

		//    new Kbd_Button("Key_0_0" ,       null,  tri('121     '), '\u0394', '\u0394',   "ESC",      "ESC", null, null),		// "Delta" sign

		
		if (i == 0)
		{
			button_list[bll] = new Kbd_Button(key_cap, null, tree_pos, null, null, up_one_level, up_one_level, realize_dict_wrapper, realize_dict_wrapper, args, args);
		}
		else
		{
			chars_to_show1 = chars_to_show2;
			word1 = word2;
			word1_ind = word2_ind;
			if (current_dictionary_level <= dtoc.length)
			{
				word2_ind = dtoc[current_dictionary_level - 1][last_toc_entry + i - 1];
			}
			else
			{
				word2_ind = word_index + toc_shift[current_dictionary_level - 1] * i;
				if (word2_ind > last_word)
				{
					word2_ind = last_word;
				}
			}

			if (word2_ind < dictionary.length)
			{
				word2 = dictionary[word2_ind];
			}
			else
			{
				word2 = dictionary[word2_ind - 1];
			}
			word2_prev = dictionary[word2_ind - 1];
			
			chars_to_show2 = number_of_characters_to_show(word2, word2_prev);

			// var   is_cued_dictionary = 0;
			// const max_displayed_word_size_per_number_of_columns = [];


			if (is_cued_dictionary != 0)
			{
				// excessive shortening may be confusing in this mode
				if (lang == "rus")
				{
					chars_to_show1 = Math.max(chars_to_show1, max_displayed_word_size_per_number_of_columns_rus[k_cols - 1]);
					chars_to_show2 = Math.max(chars_to_show2, max_displayed_word_size_per_number_of_columns_rus[k_cols - 1]);
				}
				else
				{
					chars_to_show1 = Math.max(chars_to_show1, max_displayed_word_size_per_number_of_columns_eng[k_cols - 1]);
					chars_to_show2 = Math.max(chars_to_show2, max_displayed_word_size_per_number_of_columns_eng[k_cols - 1]);
				}
			}


			if (word2_ind - word1_ind > 1)
			{
				caption = word1.substring(0, chars_to_show1);
				caption += ' \u2013<br/>\u2013 ';
				caption += word2_prev.substring(0, chars_to_show2);

				caption = caption.toLowerCase();
			}
			else
			{
				caption = word1;
			}

//			caption = tree_pos.toString(3);
//			caption = "0".repeat(num_bits - caption.length) + caption;

			button_list[bll] = new Kbd_Button(key_cap, null, tree_pos, null, null, caption, caption, realize_dict_wrapper, realize_dict_wrapper, args, args);
		}
		bll ++;

	}

//	alert(bll);

	generate_table();
//		alert(update_table(0));
//	update_table(1);
	

	return;
}


function parse_last_word(last_word)
{
	// try to parse the last_word
	// <start_of_the_word><number_of_letters_in_the_word><end_of_the_word>
	// if no numbers are specified, start_of_the_word is the entire 'last_word'

	var i;
	var start_of_the_word = "", number_of_letters = 0, end_of_the_word = "";
	var first_digit = -1, last_digit = -1;

	for (i = 0; i < last_word.length; i++)
	{
		if (is_numeric(last_word.charAt(i)))
		{
			if (first_digit < 0)
			{
				first_digit = i;
			}
			last_digit = i;
		}
	}

	start_of_the_word = last_word;

	if (first_digit >= 0)
	{
		start_of_the_word = last_word.substring(0, first_digit);
		end_of_the_word = last_word.substring(last_digit + 1);
		number_of_letters = parseInt(last_word.substring(first_digit, last_digit + 1));
	}

	if (isNaN(number_of_letters))
	{
		alert('parse_last_word error: invalid number');
		return;
	}

//	alert('start_of_the_word = \"' + start_of_the_word + '\", number = ' + number_of_letters.toString() + ' , end_of_the_word = \"' + end_of_the_word + '\"');

	return [start_of_the_word, number_of_letters, end_of_the_word];
}



function realize_cued_dict(lang)
{  

	if (lang != "rus" && lang != "eng")
	{
		alert ('realize_cued_dict: unknown language ' + lang);
		return;
	}

	var last_word = get_last_word();
//	alert('last word is: \"' + last_word + '\"');
//	alert('selection_start = ' + selection_start.toString() + ', selection_end = ' + selection_end.toString());

	if (last_word == "")
	{
		//nothing is typed
		current_dictionary_level = 0;
		realize_dict(0, lang);
	}

	// continue, assuming that the last_word is not empty

	// try to parse the last_word
	// <start_of_the_word><number_of_letters_in_the_word><end_of_the_word>
	// if no numbers are specified, start_of_the_word is the entire 'last_word'

	var i, j, k;

	const [start_of_the_word, number_of_letters, end_of_the_word] = parse_last_word(last_word);

	if (start_of_the_word == "" && end_of_the_word == "")
	{
		// return to normal keyboard
		realize_normal_keyboard(lang);
		return;
	}

//	alert('start_of_the_word = \"' + start_of_the_word + '\", number = ' + number_of_letters.toString() + ' , end_of_the_word = \"' + end_of_the_word + '\"');

	
	// process the dictionary

	if (lang == "rus")
	{
		// defined in "dict_rus.js"
		init_rus_dict();
	}
	else
	{
		// defined in "dict_eng.js"
		init_eng_dict();
	}
		
	var entire_dict = dictionary;

/*
	max_toc_levels = 4;

	max_entries_per_level = new Array(26, 23, 11, 5);

	dict_columns = new Array(9, 8, 4, 2);

	toc_entry_index = new Array(0, 0, 0, 0);

	toc_choice = new Array(0, 0, 0, 0);

	toc_shift = new Array(23, 1, 5, 1);
*/

	// find the number of matches

	dictionary = new Array();
	var cond1, cond2, cond3;
	var start_compar = start_of_the_word.toLowerCase(), end_compar = end_of_the_word.toLowerCase();
	var max_letters_in_a_word = 0;
	var longest_word = "";
	var max_columns_for_last_page = 0;
	
	for (i = 0; i < entire_dict.length; i++)
	{
		// word has specified number of characters
		cond1 = (entire_dict[i].length == number_of_letters || number_of_letters <= 0);

		cond2 = entire_dict[i].substring(0, start_compar.length).toLowerCase() == start_compar;

		cond3 = entire_dict[i].substring(entire_dict[i].length - end_compar.length).toLowerCase() == end_compar;

		if ( cond1 && cond2 && cond3 )
		{
			dictionary[dictionary.length] = entire_dict[i];

			if (entire_dict[i].length > max_letters_in_a_word)
			{
				max_letters_in_a_word = entire_dict[i].length;
				longest_word = entire_dict[i];
			}
		}
	}

//	alert('Number of matches: ' + dictionary.length.toString());

	if (dictionary.length == 0)
	{
		// return to normal keyboard
		realize_normal_keyboard(lang);
		return;
	}


	// possible options for organizing a dictionary entry
	var options_cols    = new Array(6, 4, 3, 2, 1);
	var options_entries = [], rows = 4;

	// determining possible number of columns for the last page
	var letters_per_column_number = [], allowed_last_page_cols_option = 0;
	if (lang == "rus")
	{
		letters_per_column_number = max_displayed_word_size_per_number_of_columns_rus.slice();
	}
	else
	{
		letters_per_column_number = max_displayed_word_size_per_number_of_columns_eng.slice();
	}

	for (i = 0; i < options_cols.length; i++)
	{
		if (max_letters_in_a_word <= letters_per_column_number[options_cols[i] - 1])
		{
			allowed_last_page_cols_option = i;
			break;
		}
	}
		

	for (i = 0; i < options_cols.length; i++)
	{
		options_entries[i] = options_cols[i] * rows - 1;
	}

	dtoc = [];

	var max_pages = 4;	// ... maximum number of dictionary pages
	max_entries_per_level = [];
	dict_columns = [];
	toc_choice = [];
	toc_shift = [];

	var best_match, best_match_array = [];
	var current_take, current_number_of_entries, current_match;

	// define dictionary pages
	max_toc_levels = 1;
	var i_rem, i_dig;

	var list_of_options = Array(max_pages), search_space = 1, list_of_shifts = Array(max_pages);

	const big_value = 1000000;
	for (k = 0; k < max_pages; k++)
	{
		best_match = big_value;
		current_take = new Array(k + 1);

		// workaround to allow only "allowed_last_page_cols_option" or a greater extent of a diminishing amount of columns for the lass page
		search_space = 1;
		for (i = 0; i < k + 1; i++)
		{
			if (i == 0)
			{
				list_of_options[i] = options_cols.length - allowed_last_page_cols_option;
			}
			else
			{
				list_of_options[i] = options_cols.length;
			}
			search_space *= list_of_options[i];
			list_of_shifts[i] = options_cols.length - list_of_options[i];
		}


		for (i = 0; i < search_space; i++)
		{
			i_rem = i;
			current_number_of_entries = 1;
			current_match = 0;
			for (j = 0; j <= k; j++)
			{
				i_dig = i_rem % list_of_options[j];
				i_rem = (i_rem - i_dig) / list_of_options[j];
				current_take[k - j] = i_dig;
				current_number_of_entries *= options_entries[list_of_shifts[j] + i_dig];
			}
			current_match = current_number_of_entries - dictionary.length;

			if (current_match >= 0 && current_match < best_match)
			{
				best_match = current_match;
				best_match_array = current_take.slice();	// copy of the array
			}
		}

		if (best_match < big_value)
		{	
			max_toc_levels = k + 1;
			break;
		}

	}

	// convert to options_cols indices
	for (i = 0; i< max_toc_levels; i++)
	{
		best_match_array[i] += list_of_shifts[max_toc_levels - 1 - i];
	}


//	alert('allowed_last_page_cols_option = ' + allowed_last_page_cols_option.toString() + ', max_letters_in_a_word = ' + max_letters_in_a_word.toString() + 
//	      '\n, longest_word = \"' + longest_word + '\"');
//	alert('best_match = ' + best_match.toString() + ', array = ' + best_match_array);


	dict_columns = [];
	toc_choice = [];
	toc_shift = [];
	for( i = 0; i < max_toc_levels; i++)
	{
		dict_columns[i] = options_cols[best_match_array[i]];
		max_entries_per_level[i] = options_entries[best_match_array[i]];
		toc_choice[i] = 0;
		toc_shift[i] = 1;
		for (j = i + 1; j < max_toc_levels; j++)
		{
			toc_shift[i] *= options_entries[best_match_array[j]];
		}
	}


//	alert('max_toc_levels = ' + max_toc_levels.toString() + ', dict_columns = ' + dict_columns.slice(0, max_toc_levels) + ', ' + 
//	      'toc_shift = ' + toc_shift.slice(0, max_toc_levels) + ', dict_length = ' + dictionary.length.toString());

	// do not shorten displayed words in ranges
	is_cued_dictionary = 1;
	current_interface = "dict_cued";

	current_dictionary_level = 2;

//	alert('toc_shift[0] = ' + toc_shift[0].toString());

	realize_dict(1, lang);
}


