// *************************************
//	 RESPONSIVE PLUGIN
// *************************************
//
//	resize the .div-responsive and .caption when window is resized or the div is shown
//


var hil = hil || {};
hil.fn = hil.fn || {};

hil.fn.resizeDiv = function(div){
	
	var width =	div.attr('data-width')
	,	height = div.attr('data-height')
	,	min_width = div.attr('data-min-width') || 300
	,	target_width = Math.min( Math.max( div.parent().width(), min_width), width)
	,	ratio = Math.round(target_width / width * 100) / 100
	,	wrapper = div.children('.div-responsive-target');
	;

	if( ratio === div.data('ratio') ){ return; }

	div.width( Math.round(ratio*width) );
	div.height( Math.round(ratio*height) );
	div.data('ratio', ratio);
	wrapper.css(
		{	'transform' : 'scale(' + ratio + ')'
		,	'transform-origin' : 'left top'
		,	'-webkit-transform' : 'scale(' + ratio + ')'
		,	'-webkit-transform-origin' : 'left top'
		}
	);
};

hil.fn.resizeCaption = function(caption){
	var multimedia = caption.prev()
	,	now_width = Math.round( caption.width() )
	,	width = Math.round( multimedia.outerWidth() )
	;
	if( !width ){ caption.width('auto'); }
	else if( now_width !== width ){ caption.width(width); }
}


$(document).ready( function(){
	
	// initiate the .div-responsive
	$('div.div-responsive').each(function(){
		var div = $(this);
		div.css({overflow:'hidden'});
		
		var wrapper = div.children('.div-responsive-target');
		if(wrapper.length === 0){
			wrapper = $(document.createElement('div'));
			wrapper.addClass('div-responsive-target');
			wrapper.append(div.children());
			div.append(wrapper);
		}

		hil.fn.resizeDiv( $(this) );
	});
	
	// initiate the .caption
	$('.multimedia + .caption').not('.full-width').each(function(){
		hil.fn.resizeCaption( $(this) );
	});
	
	// resize when window is resized
	$(window).resize(function(){

		$('div.div-responsive').each(function(){
			hil.fn.resizeDiv( $(this) );
		});
		
		$('.multimedia + .caption').not('.full-width').each(function(){
			hil.fn.resizeCaption( $(this) );
		});

	});
	
	// resize when div is shown
	var divs = $('div.div-responsive');
	divs.each(function(){
		this.if_show = this.offsetHeight;
	});
	
	var captions = $('.multimedia + .caption').not('.full-width');
	captions.each(function(){
		this.if_show = this.offsetHeight;
	});
	
	var check_per_frames = 3;
	var count = 0;
	function checkVisible(){
		count++;
		if(count % check_per_frames == 0){
			var it, itd, h, div;
			for(it = 0, itd = divs.length; it < itd; it++){
				div = divs[it];
				h = div.offsetHeight;
				if( !div.if_show && h){
					hil.fn.resizeDiv( $(div) );
					console.log('HIL: an iframe is shown');
				}
				div.if_show = h;
			}
			for(it = 0, itd = captions.length; it < itd; it++){
				div = captions[it];
				h = div.offsetHeight;
				if( !div.if_show && h){
					hil.fn.resizeCaption( $(div) );
				}
				div.if_show = h;
			}
		}

		requestAnimationFrame(checkVisible);
	}
	requestAnimationFrame(checkVisible);
	
});
