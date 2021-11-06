var emoji_toc = [];
var emoji_toc_columns = 4;

var emo_choice = new Array();


var   current_emoji_level = 0;
const max_emoji_toc_levels = 3;

var emo_group_titles = [];
var allowed_table_sizes = [];


function emoji_item(uni_id, cat_name, group_name, emoji_name, is_specific, code, uni_url)
{
	this.uni_id 		= uni_id;
	this.cat_name 		= cat_name;
	this.group_name 	= group_name;
	this.emoji_name		= emoji_name;
	this.is_specific	= is_specific;
	this.code		= code;
	this.uni_url		= uni_url;
}


function get_HTML_from_glyph_id(glyph_id, emoji_height)
{
	//

	//"<img alt=\"qq\" height = \"32\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABgUExURUdwTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/JOv///wsHAPbCN+CwMnRaFItsG/b29josBqaCIsabK+66NR4YDVhEDSceC+Hh4ZeXl1FRUYSEhIqNDVcAAAAMdFJOUwDKcVsQsN3wigMhO1J3aLkAAAKXSURBVFjD7ZjJYoMgEIajiaIGCkjcbfv+b1nBNDosginH/occiPnCrAxeLv/6k6prkSUIYYxQkhXX6j3Kvcixpry4n6XcUoPyZKW3M5gCYadQEYoq0xemqduOM0IY79q6eaHSMgRTJc/nx3ZB7MXa8flVEuD367odKnpiUS/ouqmrbz/F+peCEYeYWJ8oDs0rs9U1nByIr87KSi9HEI9aD2nl0I541dFDkvLPwEmA+KT85IiX4vQkSL0iWWNXybhTTgLFpXXIkk+lysOOBKtTmWm6KVVZSE5IxS416lQa1pBTkvmEbraI8XMgbomc2pAgJyXMLSkPsbMgRg0v5dqGWE1pbYCNVbmlHPRnae0+FWu5UNtMAau9XLhrrh73P1m7jg5Sq3S/Mmrulpa1+wewFWSuttC2SrcsGMTkQgXKtSHvgFRSXoGL6vdANXBSprso2NnKSdkLlBh1Hxj+tQckIGj8OPVcq7Le0AuE9KCdqBIAkraz90AqAPFB0UyDzsYBcjgbhv8UCIYfJqR88GOR+3MHggkJS4T6QdRRIrBoJz9ochQtbCOjHzQ62ghsbMIPEo7GBlutjOhjkftzyxW91cLm3/iC3zibPzyOWh+odR5H2gE54W+3j763mFkOSHhkL+k6u0DzrggsR7Y2RNR4mO2geYBRMcY/ONawBk+zDTRPuGGHY43y0mbcMiIONtCAp/540FpbwDYa9/LvHhAkM6jpfaOfPoyypRyHz8cGenwue9xav3MYNcfjTlbvl9yXzOYvWatb0+oH53hsGdhbkOPN7gzlw8HAbrtCcDFOiw10GgUPv0JEu9RcyljXrHgXv3hXUZlPkS7HslqiXNcjvkCI+Eoj4kuW3WufHFGK8j+89vnXr34A0u2o0w8ZGFIAAAAASUVORK5CYII=\">";
	var __FOUND = emoji_list.findIndex(
						function(group_item, index) 
						{
							if(group_item.uni_id == glyph_id)
							return true;
						}
					  );	

	if (__FOUND == -1)
	{
		alert('Error in \'get_HTML_from_glyph_id\', cannot find glyph from id, id = ' + glyph_id.toString() + ', height = ' + emoji_height.toString());
	}

	var html_code;

	html_code = "<img alt=\"&lt;" + emoji_list[__FOUND].emoji_name + "&gt;\" height=\"" + emoji_height.toString() +
		    "\" src=\"" + emoji_list[__FOUND].uni_url + "\">";

	return html_code;
}


/*
function second_level_emoji_group_item(group_name, columns, rus_title, eng_title)
{
	this.group_name		= group_name;
	this.rus_title		= rus_title;
	this.eng_title		= eng_title;
	this.columns		= columns;
}
*/

/*
function first_level_emoji_group_item(columns, rus_title, eng_title)
{
	this.rus_title		= rus_title;
	this.eng_title		= eng_title;
	this.columns		= columns;
	this.collection         = [];
}
*/

function type_chosen_emoji(emo_index, lang)
{
//	alert('emoji number ' + emo_index.toString());

	typeInTextarea("$" + emo_index.toString() + "$", document.getElementById("my_text_field"));

	// return to normal keyboard

	realize_normal_keyboard(lang);
	
}

function possible_table_size(number, columns_wide, columns_narrow)
{
	this.number		= number;
	this.columns_wide	= columns_wide;			// for wide content
	this.columns_narrow	= columns_narrow;		// for narrow content
}

function load_possible_table_sizes()
{
	allowed_table_sizes = [
				      new possible_table_size(1, 	1,	1 ),		// 0
				      new possible_table_size(2, 	2,	2 ),		// 1
				      new possible_table_size(3, 	3,	3 ),		// 2
				      new possible_table_size(4, 	2,	4 ),		// 3
				      new possible_table_size(6, 	3,	6 ),		// 4
				      new possible_table_size(8, 	4,	8 ),		// 5
				      new possible_table_size(9, 	3,	9 ),		// 6
				      new possible_table_size(12, 	4,	12),
				      new possible_table_size(16, 	4,	8 ),
				      new possible_table_size(18, 	3,	9 ),
				      new possible_table_size(24, 	4,	12),
				      new possible_table_size(27, 	3,	9 ),
				      new possible_table_size(32, 	4,	8 ),
				      new possible_table_size(36, 	4,	9 ),
				      new possible_table_size(48, 	4,	12),
				      new possible_table_size(54, 	3,	9 ),
				      new possible_table_size(64, 	4,	8 ),
				      new possible_table_size(72, 	4,	9 ),
				      new possible_table_size(81, 	3,	9 ),
				      new possible_table_size(96, 	4,	12),
				      new possible_table_size(108, 	4,	12),
				      new possible_table_size(128, 	4,	8 ),
				      new possible_table_size(144, 	4,	12)
			      ];
}


function find_best_table_size(key_num, cur_emo_level)
{
	var i;
	var ret_value = [];

	for (i = 0; i< allowed_table_sizes.length; i++)
	{
		if (allowed_table_sizes[i].number >= key_num)
		{
			break;
		}
	}

	if (i >= allowed_table_sizes.length)
	{
		alert('find_best_table_size error, key_num is too large: ' + key_num.toString());
	}

	if (cur_emo_level < 3)	// wide contents
	{
		ret_value[0] = allowed_table_sizes[i].columns_wide;
	}
	else			// or narrow content
	{
		ret_value[0] = allowed_table_sizes[i].columns_narrow;
	}

//	alert('i == ' + i);
	ret_value[1] = allowed_table_sizes[i].number / ret_value[0];
	return ret_value;
}


function translation_item(name, eng_title, rus_title)
{
	this.rus_title		= rus_title;
	this.eng_title		= eng_title;
	this.name               = name;
}

function translate_an_item(name, lang)
{
	// this function renders an entity name into a string to be displayed

	var __FOUND = emo_group_titles.findIndex(
							function(group_item, index) 
							{
								if(group_item.name == name)
								return true;
							}
						);	

	if (__FOUND == -1)
	{
		alert("Error in 'traslate_an_item', cannot find '" + name + "'");
		return "";
	}
	else
	{
		if (lang == "eng")
		{
			return emo_group_titles[__FOUND].eng_title;
		}
		else if (lang == "rus")
		{
			return emo_group_titles[__FOUND].rus_title;
		}
		else
		{
			alert("Unknown language in 'translate_an_item': '" + lang + "'");
			return "";
		}
	}
}


function load_emo_group_titles()
{
	emo_group_titles = [
			      new translation_item("Smileys and Emotion",     "Smileys and Emotion",     "\u0421\u043C\u0430\u0439\u043B\u0438\u043A\u0438 \u0438 \u044D\u043C\u043E\u0446\u0438\u0438"),
			      new translation_item("face-smiling",            "face-smiling",            "\u0423\u043B\u044B\u0431\u0430\u044E\u0449\u0438\u0435\u0441\u044F"),
			      new translation_item("face-affection",          "face-affection",          "\u0421\u0438\u043C\u043F\u0430\u0442\u0438\u0437\u0438\u0440\u0443\u044E\u0449\u0438\u0435"),
			      new translation_item("face-tongue",             "face-tongue",             "\u0421 \u044F\u0437\u044B\u043A\u043E\u043C"),
			      new translation_item("face-hand",               "face-hand",               "\u0421 \u0440\u0443\u043A\u043E\u0439"),
			      new translation_item("face-neutral-skeptical",  "face-neutral-skeptical",  "\u041D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0435 \u0438 \u0441\u043A\u0435\u043F\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435"),
			      new translation_item("face-sleepy",             "face-sleepy",             "\u0421\u043E\u043D\u043D\u044B\u0435"),
			      new translation_item("face-unwell",             "face-unwell",             "\u041F\u043B\u043E\u0445\u043E\u0435 \u0441\u0430\u043C\u043E\u0447\u0443\u0432\u0441\u0442\u0432\u0438\u0435"),
			      new translation_item("face-hat",                "face-hat",                "\u0421 \u0448\u043B\u044F\u043F\u043E\u0439"),
			      new translation_item("face-glasses",            "face-glasses",            "\u0412 \u043E\u0447\u043A\u0430\u0445"),
			      new translation_item("face-concerned",          "face-concerned",          "\u041E\u0431\u0435\u0441\u043F\u043E\u043A\u043E\u0435\u043D\u043D\u044B\u0435"),
			      new translation_item("face-negative",           "face-negative",           "\u041E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435"),
			      new translation_item("face-costume",            "face-costume",            "\u041C\u0430\u0441\u043A\u0438"),
			      new translation_item("cat-face",                "cat-face",                "\u041A\u043E\u0448\u043A\u0438"),
			      new translation_item("monkey-face",             "monkey-face",             "\u041E\u0431\u0435\u0437\u044C\u044F\u043D\u044B"),
			      new translation_item("emotion",                 "emotion",                 "\u042D\u043C\u043E\u0446\u0438\u0438"),

			      new translation_item("People and Body",         "People and Body",         "\u0427\u0435\u043B\u043E\u0432\u0435\u043A \u0438 \u0442\u0435\u043B\u043E"),
			      new translation_item("body-parts",              "body-parts",              "\u0427\u0430\u0441\u0442\u0438 \u0442\u0435\u043B\u0430"),
			      new translation_item("person",                  "person",                  "\u0427\u0435\u043B\u043E\u0432\u0435\u043A"),
			      new translation_item("person-gesture",          "person-gesture",          "\u0416\u0435\u0441\u0442\u044B"),
			      new translation_item("person-role",             "person-role",             "\u0420\u043E\u043B\u0438"),

			      new translation_item("Animals and Nature",      "Animals and Nature",      "\u0416\u0438\u0432\u043E\u0442\u043D\u044B\u0435 \u0438 \u043F\u0440\u0438\u0440\u043E\u0434\u0430"),
			      new translation_item("animal-mammal",           "animal-mammal",           "\u041C\u043B\u0435\u043A\u043E\u043F\u0438\u0442\u0430\u044E\u0449\u0438\u0435"),
			      new translation_item("animal-bird",             "animal-bird",             "\u041F\u0442\u0438\u0446\u044B"),
			      new translation_item("animal-amphibian",        "animal-amphibian",        "\u0410\u043C\u0444\u0438\u0431\u0438\u0438"),
			      new translation_item("animal-reptile",          "animal-reptile",          "\u0420\u0435\u043F\u0442\u0438\u043B\u0438\u0438"),
			      new translation_item("animal-marine",           "animal-marine",           "\u041C\u043E\u0440\u0441\u043A\u0438\u0435 \u0436\u0438\u0432\u043E\u0442\u043D\u044B\u0435"),
			      new translation_item("animal-bug",              "animal-bug",              "\u0411\u0443\u043A\u0430\u0448\u043A\u0438"),
			      new translation_item("plant-flower",            "plant-flower",            "\u0426\u0432\u0435\u0442\u044B"),
			      new translation_item("plant-other",             "plant-other",             "\u0414\u0440\u0443\u0433\u0438\u0435 \u0440\u0430\u0441\u0442\u0435\u043D\u0438\u044F"),

			      new translation_item("Food and Drink",          "Food and Drink",          "\u0415\u0434\u0430 \u0438 \u043D\u0430\u043F\u0438\u0442\u043A\u0438"),
			      new translation_item("food-fruit",              "food-fruit",              "\u0424\u0440\u0443\u043A\u0442\u044B"),
			      new translation_item("food-vegetable",          "food-vegetable",          "\u041E\u0432\u043E\u0449\u0438"),
			      new translation_item("food-prepared",           "food-prepared",           "\u0413\u043E\u0442\u043E\u0432\u0430\u044F \u0435\u0434\u0430"),
			      new translation_item("food-asian",              "food-asian",              "\u0410\u0437\u0438\u0430\u0442\u0441\u043A\u0430\u044F \u0435\u0434\u0430"),
			      new translation_item("food-marine",             "food-marine",             "\u041C\u043E\u0440\u0435\u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B"),
			      new translation_item("food-sweet",              "food-sweet",              "\u0421\u043B\u0430\u0434\u043E\u0441\u0442\u0438"),
			      new translation_item("drink",                   "drink",                   "\u041D\u0430\u043F\u0438\u0442\u043A\u0438"),
			      new translation_item("dishware",                "dishware",                "\u0421\u0442\u043E\u043B\u043E\u0432\u044B\u0435 \u043F\u0440\u0438\u0431\u043E\u0440\u044B"),

			      new translation_item("Travel and Places",       "Travel and Places",       "\u041F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044F \u0438 \u043C\u0435\u0441\u0442\u0430"),
			      new translation_item("place-map",               "place-map",               "\u041C\u0435\u0441\u0442\u0430 \u043D\u0430 \u043A\u0430\u0440\u0442\u0435"),
			      new translation_item("place-geographic",        "place-geographic",        "\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"),
			      new translation_item("place-building",          "place-building",          "\u0417\u0434\u0430\u043D\u0438\u044F"),
			      new translation_item("place-religious",         "place-religious",         "\u0425\u0440\u0430\u043C\u044B"),
			      new translation_item("transport-ground",        "transport-ground",        "\u041D\u0430\u0437\u0435\u043C\u043D\u044B\u0439 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442"),
			      new translation_item("transport-water",         "transport-water",         "\u0412\u043E\u0434\u043D\u044B\u0439 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442"),
			      new translation_item("transport-air",           "transport-air",           "\u0412\u043E\u0437\u0434\u0443\u0448\u043D\u044B\u0439 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442"),
			      new translation_item("hotel",                   "hotel",                   "\u041E\u0442\u0435\u043B\u044C"),
			      new translation_item("time",                    "time",                    "\u0412\u0440\u0435\u043C\u044F"),
			      new translation_item("sky and weather",         "sky and weather",         "\u041D\u0435\u0431\u043E \u0438 \u043F\u043E\u0433\u043E\u0434\u0430"),

			      new translation_item("Activities",              "Activities",              "\u0417\u0430\u043D\u044F\u0442\u0438\u044F"),
			      new translation_item("event",                   "event",                   "\u041C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F"),
			      new translation_item("award-medal",             "award-medal",             "\u041D\u0430\u0433\u0440\u0430\u0434\u044B"),
			      new translation_item("sport",                   "sport",                   "\u0421\u043F\u043E\u0440\u0442"),
			      new translation_item("game",                    "game",                    "\u0418\u0433\u0440\u044B"),
			      new translation_item("arts and crafts",         "arts and crafts",         "\u0418\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u043E \u0438 \u0440\u0435\u043C\u0435\u0441\u043B\u0430"),

			      new translation_item("Objects",                 "Objects",                 "\u041E\u0431\u044A\u0435\u043A\u0442\u044B"),
			      new translation_item("clothing",                "clothing",                "\u041E\u0434\u0435\u0436\u0434\u0430"),
			      new translation_item("light and video",         "light and video",         "\u041E\u0441\u0432\u0435\u0449\u0435\u043D\u0438\u0435 \u0438 \u0432\u0438\u0434\u0435\u043E"),
			      new translation_item("book-paper",              "book-paper",              "\u041F\u0435\u0447\u0430\u0442\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044F"),
			      new translation_item("medical",                 "medical",                 "\u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0430"),

			      new translation_item("Symbols",                 "Symbols",                 "\u0421\u0438\u043C\u0432\u043E\u043B\u044B"),
			      new translation_item("transport-sign",          "transport-sign",          "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0437\u043D\u0430\u043A\u0438"),
			      new translation_item("warning",                 "warning",                 "\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0430\u044E\u0449\u0438\u0435 \u0437\u043D\u0430\u043A\u0438"),
			      new translation_item("arrow",                   "arrow",                   "\u0421\u0442\u0440\u0435\u043B\u043E\u0447\u043A\u0438"),
			      new translation_item("religion",                "religion",                "\u0420\u0435\u043B\u0438\u0433\u0438\u043E\u0437\u043D\u044B\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u044B"),
			      new translation_item("zodiac",                  "zodiac",                  "\u0417\u043D\u0430\u043A\u0438 \u0437\u043E\u0434\u0438\u0430\u043A\u0430"),
			      new translation_item("av-symbol",               "av-symbol",               "\u0417\u043D\u0430\u043A\u0438 \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F"),
			      new translation_item("gender",                  "gender",                  "\u041F\u043E\u043B"),
			      new translation_item("math",                    "math",                    "\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430"),
			      new translation_item("punctuation",             "punctuation",             "\u041F\u0443\u043D\u043A\u0442\u0443\u0430\u0446\u0438\u044F"),
			      new translation_item("currency",                "currency",                "\u0412\u0430\u043B\u044E\u0442\u0430"),
			      new translation_item("other-symbol",            "other-symbol",            "\u0418\u043D\u044B\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u044B"),
			      new translation_item("keycap",                  "keycap",                  "\u0417\u043D\u0430\u043A\u0438 \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0430\u0445"),
			      new translation_item("alphanum",                "alphanum",                "\u0417\u043D\u0430\u043A\u0438 \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C"),
			      new translation_item("geometric",               "geometric",               "\u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u043D\u0430\u043A\u0438")
			   ];

}


function populate_emoji_toc()
{
	load_emo_group_titles();
	load_possible_table_sizes();
}


function start_rus_emoji()
{
	// simple wrapper
	current_emoji_level = 0;
	realize_emoji_table(0, "rus");
}


function start_eng_emoji()
{
	// simple wrapper
	current_emoji_level = 0;
	realize_emoji_table(0, "eng");
}


const return_button_name = "_return_";


function realize_emoji_table_wrapper(args)
{
	realize_emoji_table(args[0], args[1]);
}


function realize_emoji_table(previous_choice, lang)
{  
	// previous_choice -> first button is 'return_button_name'
	//
	// at levels 1 and 2: 	previous_choice is a string
	// at level 3: 		previous_choice is a string containing may be a number

	if (lang != "rus" && lang != "eng")
	{
		alert ('realize_emoji_table: unknown language ' + lang);
		return;
	}



	if (current_emoji_level == 0)
	{
		emo_choice[0] = "";
	}
	else
	{
		emo_choice[current_emoji_level - 1] = previous_choice;
	}

	// init table

	if (previous_choice == return_button_name)
	{
		if (current_emoji_level == 1)
		{
			// return to normal keyboard
			realize_normal_keyboard(lang);
			return;
		}
		else
		{
			current_emoji_level--;
			emo_choice[current_emoji_level - 1] = "";
		}
	}
	else
	{
		current_emoji_level += 1;
	}

	// possible levels at this point: 1, 2, 3 and 4

	var i, j, k;

	if (current_emoji_level > max_emoji_toc_levels)
	{
		type_chosen_emoji( parseInt(previous_choice), lang );

		return;
	}

	var list_of_items = [], what_to_display = [], what_to_pass = [], list_len = 0;

	var __FOUND;
	var entity_name;

	if (current_emoji_level == 1 || current_emoji_level == 2)
	{
		// list_of_items contains category names
		for (i = 0; i < emoji_list.length; i++)
		{
			if (current_emoji_level == 2)
			{
				// if I'm looking for a group, ignore all groups not within the chosen category
				if (emo_choice[0] != emoji_list[i].cat_name)
				{
					continue;
				}
				entity_name = emoji_list[i].group_name;
			}
			else
			{
				entity_name = emoji_list[i].cat_name;
			}

			// now I need to add the entity_name to the list, if it's not already there

			__FOUND = list_of_items.findIndex(
								function(emo_item, index) 
								{
									if(emo_item == entity_name)
									return true;
								}
							 );

			if (__FOUND == -1)
			{
				list_of_items.push(entity_name);
				what_to_display.push(translate_an_item(entity_name, lang));
				list_len ++;
			}
		}

//		alert(list_of_items);
//		alert(what_to_display);

	}
	else if (current_emoji_level == 3)
	{
		// list_of_items contains individual emojis

		for (i = 0; i < emoji_list.length; i++)
		{
			// ignore all emojis not within the chosen group
			if (emo_choice[1] != emoji_list[i].group_name)
			{
				continue;
			}

			let emo_id = emoji_list[i].uni_id;
			list_of_items.push(emo_id.toString());
			what_to_display.push( get_HTML_from_glyph_id(emo_id, emoji_keyboard_height) );
			list_len ++;
		}
	}


	// amount of keys (return key is not counted yet)
	var key_num = list_len;
	var table_size = find_best_table_size(key_num + 1, current_emoji_level);
	var k_cols = table_size[0];
	var k_rows = table_size[1];

	// set key table up

//	alert('k_cols = ' + k_cols.toString() + ', k_rows = ' + k_rows.toString());

	init_custom_simple_keyboard(k_rows, k_cols, k_rows*k_cols);			// key_rows, key_columns, max_keys

	if (key_num + 1 > k_cols*k_rows)	
	{
		let kn_out = key_num + 1;
		alert('realize_emoji_table: key_num + 1 is too large, and equals ' + kn_out.toString());
	}


	// set key functions

	button_list = [];
	var bll = 0, tree_pos, caption, key_cap, args;
	var ccol, crow;
	caption = "";

	for (i = 0; i < key_num + 1; i++)
	{
		tree_pos = get_tree_position(i + 1, k_cols, k_rows, key_num + 1);		// + "up one level" key
		ccol =  i % k_cols;
		crow = (i - ccol  ) / k_cols;
		key_cap = "Key_" + crow.toString() + "_" + ccol.toString();

		if (i == 0)
		{
			args = new Array(return_button_name, lang);
			if (k_cols <= max_cols_for_full_caption)
			{
				caption = up_one_level;
			}
			else
			{
				caption = up_one_level_narrow;
			}
		}
		else
		{
			caption = what_to_display[i - 1];
			args = new Array(list_of_items[i - 1], lang);
		}

		//    new Kbd_Button("Key_0_0" ,       null,  tri('121     '), '\u0394', '\u0394',   "ESC",      "ESC", null, null),		// "Delta" sign

		
		button_list[bll] = new Kbd_Button(key_cap, null, tree_pos, null, null, caption, caption, realize_emoji_table_wrapper, realize_emoji_table_wrapper, args, args);

		bll ++;

	}

//	alert(bll);

	generate_table();
//		alert(update_table(0));
//	update_table(1);
	

	return;



}

