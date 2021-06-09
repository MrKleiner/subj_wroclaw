window.current_tick = 0;
window.last_loop_check = 0;

// ded2


$(document).ready(function(){
	super_ti()
	// supergen()
	hover_hax()
	window.marker_inner_structure = $('.super_marker_preset').html();
	window.info_card_preset_structure = $('.bottom_page_info_card_preset').html();
	window.info_popup_preset = $('.info_popup_append_helper').html();
	// console.log(marker_inner_structure);
	// $('.marker').append(marker_inner_structure);
	// rating_bar()
	
	// construct_info_cards()
	build_citadel()
});




var ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    const cr = entry.contentRect;
    // console.log('Element:', entry.target);
    // console.log(`Element size: ${cr.width}px x ${cr.height}px`);
    // console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
	  if ( current_tick > (last_loop_check + 0.005) )
		  {
			  supergen()
		  }
	
  }
});

// Observe one or multiple elements
ro.observe(document.getElementById('shit'));


function supergen()
{
	window.last_loop_check = current_tick;
	
    $('.marker').each(function(){
        let box = document.getElementById('shit');
			
	
		// marker: x144 y113
		// convert input to uv
		// convert uv back to pixels
		// set pixels

		// u is x

		var total_img_width = 2588;
		var total_img_height = 1700;


		// get mod_w and h
		var total_result_u = (box.clientWidth) / total_img_width;
		var total_result_v = (box.clientHeight) / total_img_height;

		console.log(total_result_u);
		console.log(total_result_v);

		var w_factor = 1 / total_result_u;
		var h_factor = 1 / total_result_v;

		// dev dot product
		// not dev anymore
		var dev_dot_w = $(this).attr('marker_x'); // y
		var dev_dot_h = $(this).attr('marker_y'); // x

		var this_width = this.clientWidth / 2;
		var this_height = this.clientHeight;
		// console.log(wtf_this.clientWidth);
		// dot result
		var dot_w_result = dev_dot_w / w_factor;
		var dot_h_result = dev_dot_h / h_factor;
		
		$(this).css({top: dot_h_result - this_height, left: dot_w_result - this_width});
		$(this).attr('real_x', dot_w_result);
		$(this).attr('real_y', dot_h_result);
		$('.super_marker_preset').remove();
    });
	
	// $('.marker').css({top: dot_h_result, left: dot_w_result});
	
}

function super_ti()
{
	setTimeout(start, 100);

	window.init_tick = 1;
	window.tick_increment = 0.001;

	function start() {
	  setInterval(increase, 10);
	}

	function increase() {

		window.init_tick = init_tick + tick_increment;
		window.current_tick = init_tick + tick_increment;

	}
}

function hover_hax()
{
	document.addEventListener('mouseover', event => {
		
		const map_pointer_hitbox = event.target.closest('.svg_hitbox');
		if (map_pointer_hitbox)
			{
				console.log("hovered");
				console.log($(map_pointer_hitbox).closest('.marker').attr('real_y'))
				$('.building_template').removeClass('element_hidden');
				
				var template_measure = document.getElementById('super_hover_template');
				
				var this_marker_height = $(map_pointer_hitbox).closest('.marker').height();
				
				var pootis_height = $('.building_template').outerHeight();
				var pootis_width = template_measure.offsetWidth / 2;
				var calc_this_offset_x = parseFloat($(map_pointer_hitbox).closest('.marker').attr('real_x')) - pootis_width; 
				var calc_this_offset_y = parseFloat($(map_pointer_hitbox).closest('.marker').attr('real_y')) - parseFloat(pootis_height) - parseFloat(this_marker_height);
				console.log(pootis_height);
				
				$('.building_template').css({top: calc_this_offset_y - 5 + 'px', left: calc_this_offset_x.toString() + 'px'});
				$(".building_template").css('background-image', 'url(' + $(map_pointer_hitbox).closest(".marker").attr("marker_imgurl") + ')');
				trigger_info_popup_window($('.bottom_page_info_card[link_id="' + $(map_pointer_hitbox).closest(".marker").attr("link_id") + '"]'));
				$('.bottom_page_info_card[link_id="' + $(map_pointer_hitbox).closest(".marker").attr("link_id") + '"]').addClass('bottom_page_info_card_js_hover');
				$('.building_template').addClass('image_card_showup_class');
				
			}
		
			const popup_overhover = event.target.closest('.bottom_page_info_card');
			if (popup_overhover)
			{
				console.log('are you fucking kidding me mate');
				$(popup_overhover).prepend(info_popup_preset);
				var current_card_width = $(popup_overhover).width();
				var current_card_height = $(popup_overhover).height();
				var popup_card_width = $('.info_card_popup').width();
				var static_margin = parseFloat($(popup_overhover).css('margin-left').replace('px', ''));
				console.log('margin is ' + static_margin);
				$('.info_card_popup').removeClass('element_hidden');
				$('.info_card_popup').css({left: current_card_width + 20 + static_margin + 'px'});
				$('.info_card_popup').text($(popup_overhover).attr('info_card_popup_content'));
				trigger_linked_mark($('.marker[link_id="' + $(popup_overhover).closest(".bottom_page_info_card").attr("link_id") + '"]'));
				$('.marker[link_id="' + $(popup_overhover).closest(".bottom_page_info_card").attr("link_id") + '"]').find('svg').addClass('fill_fixup');
				$('.info_card_popup').addClass('info_card_popup_anim');
			}
			
	});
	// info_card_popup_anim
	
	document.addEventListener('mouseout', event => {
		
		const pointer_map_leave = event.target.closest('.svg_hitbox');
		if (pointer_map_leave)
			{
				console.log("unhovered");
				$('.building_template').addClass('element_hidden');
				$('.info_card_popup').remove();
				$('svg').removeClass('fill_fixup');
				$('.bottom_page_info_card').removeClass('bottom_page_info_card_js_hover');
			}
		const popup_overhover_leave = event.target.closest('.bottom_page_info_card');
		if (popup_overhover_leave)
			{
				console.log('unhovered bottom gear')
				$('.info_card_popup').remove();
				$('.building_template').addClass('element_hidden');
				$('svg').removeClass('fill_fixup');
			}
	});
	
}

// https://lh3.googleusercontent.com/p/AF1QipOhIna7AD2Ub-Xww5_vPna1AlCJCkkpJHPw4uB0=s0


function rating_bar()
{
	$('.info_card_rating_bar').each(function(){

		var oldmax = 5;
		var oldmin = 0;

		var newmax = 1;
		var newmin = 0;

		var this_number = $(this).find('.info_card_rating_bar_number_text').text().split('/')[0].replace(',', '.');

		var super_math = ((( this_number - oldmin ) * newmax ) / oldmax ) + newmin;

		console.log(this_number);
		
		$(this).find('.info_card_rating_bar_meter').css('transform', 'scaleX(' + super_math + ')');
		
		$('.bottom_page_info_card_preset').remove();
		
	});
}


// Redundant since pair autoconstructor is a thing
function construct_info_cards()
{
	$('.bp_ic_construct').each(function(){
		$(this).addClass('bottom_page_info_card');
		$(this).append(info_card_preset_structure);
		
		$(this).find('.info_card_name_side').text($(this).attr('info_card_label'));
		$(this).find('.info_card_rating_bar_one .info_card_rating_bar_number_text').text($(this).attr('info_card_rating').split('-')[0] + '/5');
		$(this).find('.info_card_rating_bar_two .info_card_rating_bar_number_text').text($(this).attr('info_card_rating').split('-')[1] + '/5');
		$(this).find('.info_card_rating_bar_three .info_card_rating_bar_number_text').text($(this).attr('info_card_rating').split('-')[2] + '/5');
		$(this).removeClass('bp_ic_construct');
	});
	rating_bar()
}

function trigger_info_popup_window(target_card)
{
	$(target_card).prepend(info_popup_preset);
	$('.info_card_popup').removeClass('element_hidden');

	var current_card_width = $(target_card).outerWidth( true );
	var current_card_height = $(target_card).height();
	var popup_card_width = $('.info_card_popup').outerWidth( true );

	$('.info_card_popup').css({left: current_card_width + 20 + 'px'});
	$('.info_card_popup').text($(target_card).attr('info_card_popup_content'));
	$('.info_card_popup').addClass('info_card_popup_anim');
}


function trigger_linked_mark(target_mark)
{
	console.log("called hovered");
	console.log($(target_mark).closest('.marker').attr('real_y'));
	$('.building_template').removeClass('element_hidden');
	var template_measure = document.getElementById('super_hover_template');

	var this_marker_height = $(target_mark).closest('.marker').height();

	var pootis_height = $('.building_template').outerHeight();
	var pootis_width = template_measure.offsetWidth / 2;
	var calc_this_offset_x = parseFloat($(target_mark).closest('.marker').attr('real_x')) - pootis_width; 
	var calc_this_offset_y = parseFloat($(target_mark).closest('.marker').attr('real_y')) - parseFloat(pootis_height) - parseFloat(this_marker_height);
	console.log(pootis_height);

	$('.building_template').css({top: calc_this_offset_y + 'px', left: calc_this_offset_x.toString() + 'px'});
	$(".building_template").css('background-image', 'url(' + $(target_mark).closest(".marker").attr("marker_imgurl") + ')');
	$('.building_template').addClass('image_card_showup_class');
}


function build_citadel()
{
	$('.places_gen aplace').each(function(){
		
		// build markers. Put them in place later
		var rndwave = Math.random().toString();
		var temp_marker_id = rndwave.split('.')[1] + Math.random().toString(36).substring(7);
		var temp_card_id = rndwave.split('.')[1] + Math.random().toString(36).substring(7);
		var link_id = rndwave.split('.')[1] + Math.random().toString(36).substring(7);
		$('.map_canvas').append(marker_inner_structure.replace('null_007', temp_marker_id).replace('marker_null', 'marker'));
		$('div[temp_link_id="' + temp_marker_id + '"]')
			.attr('marker_x', $(this).attr('marker_x'))
			.attr('marker_y', $(this).attr('marker_y'))
			.attr('marker_imgurl', $(this).attr('marker_imgurl'))
			.attr('link_id', link_id);
		
		// build info cards
		// de
		
		
		$('.bottom_page_cards').append(info_card_preset_structure.replace('null_1337', temp_card_id));
		var grab_linked_card = $('div[temp_card_id="' + temp_card_id + '"]');
		// console.log($(this).attr('info_card_rating').split('-')[0]);

		$(grab_linked_card).find('.info_card_name_side').text($(this).attr('info_card_label'));
		$(grab_linked_card).find('.info_card_rating_bar_one .info_card_rating_bar_number_text').text($(this).attr('info_card_rating').split('-')[0] + '/5');
		$(grab_linked_card).find('.info_card_rating_bar_two .info_card_rating_bar_number_text').text($(this).attr('info_card_rating').split('-')[1] + '/5');
		$(grab_linked_card).find('.info_card_rating_bar_three .info_card_rating_bar_number_text').text($(this).attr('info_card_rating').split('-')[2] + '/5');
		$(grab_linked_card).attr('info_card_popup_content', $(this).attr('info_card_popup_content'));
		$(grab_linked_card).attr('link_id', link_id);
		$(grab_linked_card)
			.attr('overlay_img_1', $(this).attr('overlay_img_1'))
			.attr('overlay_img_2', $(this).attr('overlay_img_2'))
			.attr('overlay_img_3', $(this).attr('overlay_img_3'))
			.attr('overlay_img_4', $(this).attr('overlay_img_4'));
	});
	supergen()
	rating_bar()
	$('div').removeAttr('temp_card_id').removeAttr('temp_link_id');
	$('.places_gen').remove();
	
	// fin
}

function info_overlay(src_card)
{
	$('.info_overlay').removeClass('element_hidden');
	$('.info_page').addClass('bg_blur');
	// ded
	// console.log($(src_card).attr('overlay_img_1'))
	$('.info_overlay_img_1 img').attr('src', $(src_card).attr('overlay_img_1'));
	$('.info_overlay_img_2 img').attr('src', $(src_card).attr('overlay_img_2'));
	$('.info_overlay_img_3 img').attr('src', $(src_card).attr('overlay_img_3'));
	$('.info_overlay_img_4 img').attr('src', $(src_card).attr('overlay_img_4'));
	// info_card_name_side
	$('.info_overlay_desc').text($(src_card).attr('info_card_popup_content'));
	$('.info_overlay_header').text($(src_card).find('.info_card_name_side').text());
	
	$('.info_overlay_text').addClass('rside_card_slidein');
	
	
	$('.info_overlay_img_1 img').addClass('overlay_img_anim1');
	$('.info_overlay_img_2 img').addClass('overlay_img_anim2');
	$('.info_overlay_img_3 img').addClass('overlay_img_anim3');
	$('.info_overlay_img_4 img').addClass('overlay_img_anim4');
}

document.addEventListener('click', event => {
	console.log('clk')
	const msg_btn_selective_edit = event.target.closest('.bottom_page_info_card');
	if (msg_btn_selective_edit)
	{
		info_overlay(msg_btn_selective_edit)
	}
	
	const marker_shitfuck = event.target.closest('.marker');
	if (marker_shitfuck)
	{
		info_overlay($('.bottom_page_info_card[link_id="' + $(marker_shitfuck).attr('link_id') + '"]'));
		// console.log($(marker_shitfuck).attr('link_id'))
		// $('.bottom_page_info_card[link_id="' + $(marker_shitfuck).attr('link_id') + '"]').remove();
		// passtime($('.bottom_page_info_card[link_id="' + $(marker_shitfuck).attr('link_id') + '"]'))
	}

	const get_back_bitch = event.target.closest('.info_overlay_left_part');
	if (get_back_bitch)
	{
		$('.info_overlay').addClass('element_hidden');

		$('.info_overlay_img_1 img').removeClass('overlay_img_anim1');
		$('.info_overlay_img_2 img').removeClass('overlay_img_anim2');
		$('.info_overlay_img_3 img').removeClass('overlay_img_anim3');
		$('.info_overlay_img_4 img').removeClass('overlay_img_anim4');

		$('.info_page').removeClass('bg_blur')
	}
});


function snort(cat)
{
	$('.bottom_page_cards').each(function(){
	  $(this).html(
		$(this).find('.bottom_page_info_card').sort(function(a, b) {
		  let dsa = parseFloat($(a).eq(0).find('.info_card_rating_bar_' + cat + ' .info_card_rating_bar_number_text').text().split('/')[0]),
			  dsb = parseFloat($(b).eq(0).find('.info_card_rating_bar_' + cat + ' .info_card_rating_bar_number_text').text().split('/')[0]);
		  return (dsa > dsb ? -1 : (dsa > dsb) ? 1 : 0);
		})
	  );  
	});
}

function passtime(ded)
{
	console.log($(ded).attr('link_id'));
}