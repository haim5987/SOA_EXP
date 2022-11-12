  // Globals
  const back_space2 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
  const press_key = "<br><br><br><br><br><br><br><br><br><br><br><br><b>Press space bar to continue</b>"
  
  const jsPsych = initJsPsych({
    on_finish: function () {
      console.log(JSON.parse(jsPsych.data.get().json()))
      jsPsych.data.displayData('json')
    }
  });
  var timeline = [];

  var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment." + press_key,
    choices: [" "]
  };
  timeline.push(welcome);

  // Instructions page explaning about the experiment the subjects are going to take.
  var instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Instructions Page explaning about the experiment the subjects are going to take." + press_key,
    choices: [" "]
  };
  timeline.push(instructions);

  var trial_instruction = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<b>On a scale of 1 to 10, choose the number represent how much do you like this image </b> <br> (1 - Strongly Dislike, 10 - Strongly Like)." + press_key,
    choices: [" "]
  };
  timeline.push(trial_instruction);

  const images_num = 23
  const range = [...Array(images_num).keys()];
  const shuffle_list = jsPsych.randomization.repeat(range, 1);
  for (let i = 0; i < images_num; ++i) {
    timeline.push({
      type: jsPsychImageButtonResponse,
      stimulus: 'images/' + String(shuffle_list[i]) + '.jpg',
      choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      prompt: "<br> Strongly Dislike" + back_space2 + "Strongly Like"
    });
  }

  var after_rate0 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "You Have finshied the first task. On the next task you will ask to choose and prefer between two arbitrary images" + press_key,
    choices: [" "],
  }
  timeline.push(after_rate0)

  const choice_num = 10
  const choice_shuffle_list = jsPsych.randomization.repeat([...Array(choice_num).keys()], 1);
  for (let i = 0; i < choice_num; ++i) {
    timeline.push( {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function(){
        let r = choice_shuffle_list[i]
        choice_lst = get_prefrence_choice_object_lst(get_pairs_lst(get_equal_pairs(3)))
        return choice_lst[r]
        },
      choices: ['ArrowLeft','ArrowRight']
    })
    timeline.push({
      type: jsPsychHtmlKeyboardResponse,
      stimulus: "",
      choices: "NO_KEYS",
      trial_duration: 100
    })
  };

  var after_prefrence = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "You Have finshied the second task. On the next task you will ask again to choose the number represent how much do you like this image on scale of 1-10" + press_key,
    choices: [" "],
  }
  timeline.push(after_prefrence)

  for (let i = 0; i < images_num; ++i) {
    timeline.push({
      type: jsPsychImageButtonResponse,
      stimulus: 'images/' + String(shuffle_list[i]) + '.jpg',
      choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      prompt: "<br> Strongly Dislike" + back_space2 + "Strongly Like"
    });
  }

  var after_rate1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "You Have finshied the third task. On the next task you will ask again to choose and prefer between two arbitrary images" + press_key,
    choices: [" "],
  }
  timeline.push(after_rate1)


  for (let i = 0; i < choice_num; ++i) {
    timeline.push( {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function(){
        let r = choice_shuffle_list[i]
        choice_lst = get_prefrence_choice_object_lst(get_pairs_lst(get_equal_pairs(48)))
        return choice_lst[r]
        },
      choices: ['ArrowLeft','ArrowRight']
    })
    timeline.push({
      type: jsPsychHtmlKeyboardResponse,
      stimulus: "",
      choices: "NO_KEYS",
      trial_duration: 100
    })
  };

  var after_rate1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "You Have finshied the experiment. Well done!" + press_key,
    choices: [" "],
  }
  timeline.push(after_rate1)


  // Helper Functions

  function get_equal_pairs(data_num) {
    var response_answear_json = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
    var data = JSON.parse(jsPsych.data.get().json())
    for (let i = data_num; i < data_num + images_num; ++i)
      response_answear_json[data[i]['response']].push(data[i]['stimulus'])
    return response_answear_json;
  }


  function get_pairs_lst(equal_pairs_json) {
    equal_pairs = []
    for (const ans in equal_pairs_json) {
      ans_length = equal_pairs_json[ans].length
      if (ans_length > 1)
        for (let i = 0; i < ans_length - 1; i++)
          for (let j = i; j < ans_length - 1; j++)
            equal_pairs.push([equal_pairs_json[ans][i], equal_pairs_json[ans][j + 1]])
    }
    return equal_pairs
  }


  function get_prefrence_choice_object_lst(equal_pairs_lst) {
    pairs_lst = []
    for (pair in equal_pairs_lst) {
      pairs_lst.push('<img src="' + equal_pairs_lst[pair][0] + '" width="500" height="400"/> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <img src="' + equal_pairs_lst[pair][1] + '" width="500" height="400" /> <br><br> Which of the following do you prefer most? <br><br> <b> Press the left arrow key for the left image and the right arrow key for the right image')
    }
    return pairs_lst
  }


  jsPsych.run(timeline);
