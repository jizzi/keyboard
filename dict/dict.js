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

var current_dictionary_level = 0;

//const up_one_level = "\ufe5d\u21e7\ufe5e";
const up_one_level = "\u3014 &nbsp; <b>\u21e7</b> &nbsp; \u3015";

function start_rus_dict()
{
	// simple wrapper
	current_dictionary_level = 0;
	realize_dict(0, "rus");
}


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

	for (i=1; i<al.length; i++)
	{
		if (al.substring(0, i) != bl.substring(0, i))
		{
			break;
		}
	}

	return i;
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

	var div_k_cols = get_value_from_factors_2_3(k_cols_factors);
	var div_k_rows = get_value_from_factors_2_3(k_rows_factors);

	var div_a_cols = k_col_num, div_a_rows = k_row_num;
	var rem_a_cols = 0,         rem_a_rows = 0;

	var n_bit = num_bits;
	var new_trit = 0, new_trit_value = 0;
	var tree_value = 0;

//	alert(div_k_cols);
//	alert(div_k_rows);

//	alert(k_cols_factors);
//	alert(k_rows_factors);
//	alert('k_cols_factors = [' + k_cols_factors[0].toString() + ', ' + k_cols_factors[1].toString() + ']; ' + 
//	      'k_rows_factors = [' + k_rows_factors[0].toString() + ', ' + k_rows_factors[1].toString() + ']');

	while(div_k_cols > 1 || div_k_rows > 1)
	{
		new_trit = 0;
		if (direction == "cols")
		{
			if (k_cols_factors[factor - 2] != 0)
			{
//				alert('here1');
				k_cols_factors[factor - 2] --;
				div_k_cols /= factor;
				rem_a_cols =  div_a_cols % div_k_cols;
				div_a_cols = (div_a_cols - rem_a_cols) / div_k_cols;
				new_trit = 1;
				new_trit_value = div_a_cols;
				div_a_cols = rem_a_cols;
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
				div_a_rows = (div_a_rows - rem_a_rows) / div_k_rows;
				new_trit = 1;
				new_trit_value = div_a_rows;
				div_a_rows = rem_a_rows;
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

	typeInTextarea(current_word, document.getElementById("my_text_field"));

	if (current_word.substring(current_word.length - 1) != "-")
	{
		typeInTextarea(" ", document.getElementById("my_text_field"));
	}

	// return to normal keyboard

	realize_normal_keyboard(lang);

}


function realize_dict_wrapper(args)
{
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
		if (lang == "rus")
		{
			// defined in "dict_rus.js"
			init_rus_dict();
		}
		else
		{
			// to do!
			alert ('eng dict -- to do!');
			return;
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

	for (i = 0; i < dtoc.length; i++)
	{
		last_toc_entry += toc_choice[i] * toc_shift[i];
	}
	for (i = dtoc.length; i < max_toc_levels; i++)
	{
		word_index_offset += toc_choice[i] * toc_shift[i];
	}

	// find the last TOC entry
	var first_word, last_word, prev_word;
	if (last_toc_entry == 0)
	{
		first_word = 0;
	}
	else
	{
		first_word = dtoc[dtoc.length - 1][last_toc_entry - 1];
	}

	last_word = dtoc[dtoc.length - 1][last_toc_entry];

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

	// amount of keys
	var key_num = max_entries_per_level[current_dictionary_level - 1];
	var key_num_alt;
	if (current_dictionary_level > dtoc.length)
	{
		// key_num may be less than the maximum value...
		key_num_alt = Math.ceil( (last_word - word_index) / toc_shift[current_dictionary_level - 1] );

		if (key_num_alt < key_num)
		{
			key_num = key_num_alt;
//			alert('last_word = ' + last_word.toString() + ', word_index = ' + word_index.toString());
		}
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

			if (word2_ind - word1_ind > 1)
			{
				caption = word1.substring(0, chars_to_show1) + ' \u2013 <br/> \u2013 ' + word2_prev.substring(0, chars_to_show2);
				caption = caption.toLowerCase();
			}
			else
			{
				caption = word1;
			}

//			caption = tree_pos.toString(3);

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


