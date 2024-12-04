const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),

  // ! new added
  allQsDom: document.querySelectorAll(".qs"),


  set() {
    let index = 0;
    this.allItems = {

      // !Template images
      arrowRound: this.allImgsDom[index++],
      blinkArrow: this.allImgsDom[index++],
      laerrow: this.allImgsDom[index++],
      laerrow2: this.allImgsDom[index++],
      logo: this.allImgsDom[index++],
      man: this.allImgsDom[index++],
      measurearrow: this.allImgsDom[index++],
      measurearrow2: this.allImgsDom[index++],
      redsize: this.allImgsDom[index++],                                         
      speech_off_btn: this.allImgsDom[index++],
      speech_on_btn: this.allImgsDom[index++],
      talk_cloud: this.allImgsDom[index++],
      iit_delhi_logo: this.allImgsDom[index++],
      // !Template images end

      // ! Procedure formula Nomenclature images 
      formulas_component_stress:this.allImgsDom[index++],
      formulas_efficiency:this.allImgsDom[index++],
      formulas_ideal:this.allImgsDom[index++],
      formulas_nomenclautre:this.allImgsDom[index++],
      formulas_non_ideal:this.allImgsDom[index++],
      formulas_procedure:this.allImgsDom[index++],
      formulas_universal:this.allImgsDom[index++],
      // ! Procedure formula Nomenclature images end

      //! EE18 images added here
      arrow:this.allImgsDom[index++],
      box_img:this.allImgsDom[index++],
      btn_delete:this.allImgsDom[index++],
      btn_record:this.allImgsDom[index++],
      btn_reset:this.allImgsDom[index++],
      component_t1:this.allImgsDom[index++],
      component_t2:this.allImgsDom[index++],
      component_t3:this.allImgsDom[index++],
      component_t4:this.allImgsDom[index++],
      graph_border:this.allImgsDom[index++],
      load_1:this.allImgsDom[index++],
      load_2:this.allImgsDom[index++],
      option_1:this.allImgsDom[index++],
      option_1_a:this.allImgsDom[index++],
      option_1_graph_1:this.allImgsDom[index++],
      option_1_graph_2:this.allImgsDom[index++],
      option_1_graph_3:this.allImgsDom[index++],
      option_1_graph_4:this.allImgsDom[index++],
      option_1_graph_circuit:this.allImgsDom[index++],
      option_1_graph_full:this.allImgsDom[index++],
      option_1_left_graph:this.allImgsDom[index++],
      option_1_left_graph_text:this.allImgsDom[index++],
      option_1_right_graph:this.allImgsDom[index++],
      option_1_right_graph_text:this.allImgsDom[index++],
      option_1_tab_1:this.allImgsDom[index++],
      option_1_tab_2:this.allImgsDom[index++],
      option_1_tab_3:this.allImgsDom[index++],
      option_1_tab_4:this.allImgsDom[index++],
      option_1_tab_5:this.allImgsDom[index++],
      option_1_tab_6:this.allImgsDom[index++],
      option_1_text_2_graph:this.allImgsDom[index++],
      option_1_text_graph:this.allImgsDom[index++],
      option_1_v_1:this.allImgsDom[index++],
      option_1_v_2:this.allImgsDom[index++],
      option_1_v_3:this.allImgsDom[index++],
      option_2:this.allImgsDom[index++],
      option_2_a:this.allImgsDom[index++],
      option_2_graph_1:this.allImgsDom[index++],
      option_2_graph_2:this.allImgsDom[index++],
      option_2_graph_3:this.allImgsDom[index++],
      option_2_graph_4:this.allImgsDom[index++],
      option_2_graph_circuit:this.allImgsDom[index++],
      option_2_graph_full:this.allImgsDom[index++],
      option_2_tab_1:this.allImgsDom[index++],
      option_2_tab_2:this.allImgsDom[index++],
      option_2_tab_3:this.allImgsDom[index++],
      option_2_tab_4:this.allImgsDom[index++],
      option_2_tab_5:this.allImgsDom[index++],
      option_2_tab_6:this.allImgsDom[index++],
      option_2_tab_7:this.allImgsDom[index++],
      option_2_tab_8:this.allImgsDom[index++],
      option_2_text_2_graph:this.allImgsDom[index++],
      option_2_text_graph:this.allImgsDom[index++],
      option_2_v_1:this.allImgsDom[index++],
      option_2_v_2:this.allImgsDom[index++],
      option_2_v_3:this.allImgsDom[index++],
      part_1_circuit:this.allImgsDom[index++],
      part_1_circuit_without_box:this.allImgsDom[index++],
      part_2_select_option_full:this.allImgsDom[index++],
      right_tick_1:this.allImgsDom[index++],
      tab_alpha:this.allImgsDom[index++],
      tab_set_1:this.allImgsDom[index++],
      tab_set_2:this.allImgsDom[index++],
      tab_thyristor:this.allImgsDom[index++],
      text_choose:this.allImgsDom[index++],
      text_connect:this.allImgsDom[index++],
      text_correct:this.allImgsDom[index++],
      value_box_alpha:this.allImgsDom[index++],
      box_qs1:this.allImgsDom[index++],
      box_qs2:this.allImgsDom[index++],
      box_qs3:this.allImgsDom[index++],
      box_qs4:this.allImgsDom[index++],
      part_1_helper:this.allImgsDom[index++],
      arrow_click_here:this.allImgsDom[index++],
      btn_check:this.allImgsDom[index++],
      symbol_d1:this.allImgsDom[index++],
      symbol_d2:this.allImgsDom[index++],
      symbol_d3:this.allImgsDom[index++],
      symbol_d4:this.allImgsDom[index++],
      tab_thyristor_1:this.allImgsDom[index++],
      part_1_2_circuit:this.allImgsDom[index++],
      right_tick_2:this.allImgsDom[index++],
      table_part_1_r_100: this.allImgsDom[index++],
      table_part_2_r_10: this.allImgsDom[index++],
      btn_hint:this.allImgsDom[index++],
      hint_box:this.allImgsDom[index++],

      hw_result_1_1:this.allImgsDom[index++],
hw_result_1_2:this.allImgsDom[index++],
hw_result_1_3:this.allImgsDom[index++],
hw_result_1_4:this.allImgsDom[index++],
hw_result_2_1:this.allImgsDom[index++],
hw_result_2_2:this.allImgsDom[index++],
hw_result_2_3:this.allImgsDom[index++],
hw_result_2_4:this.allImgsDom[index++],
hw_result_menu_1_1:this.allImgsDom[index++],
hw_result_menu_1_2:this.allImgsDom[index++],
hw_result_menu_1_3:this.allImgsDom[index++],
hw_result_menu_1_4:this.allImgsDom[index++],
hw_result_menu_2_1:this.allImgsDom[index++],
hw_result_menu_2_2:this.allImgsDom[index++],
hw_result_menu_2_3:this.allImgsDom[index++],
hw_result_menu_2_4:this.allImgsDom[index++],
hw_result_menu_2_5:this.allImgsDom[index++],
mask:this.allImgsDom[index++],
     
      //! EE18 images end here



      // * Question Mark
      domQs1: this.allQsDom[0],
      domQs2: this.allQsDom[1],
      domQs3: this.allQsDom[2],
      domQs4: this.allQsDom[3],
      domQs5: this.allQsDom[4],
      domQs6: this.allQsDom[5],
      
      
      // * Videos
      // yoke_front_to_back: this.allVideosDom[0],
      // yoke_front_to_side: this.allVideosDom[1],
      // panel1: this.allVideosDom[2],
      // panel2: this.allVideosDom[3],

      bfs_video: this.allVideosDom[0],
    };
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
