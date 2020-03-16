// *************************************
//	 MULTIMEDIA and CAPTION
// *************************************
//	prepare the multimedia:
//	- make multimedia align centering and responsive	
//	- add icon for the captions
//	- make the caption align with the multimedia it follows
//	- auto numbering the caption and its reference
//

$(document).ready( function(){

	// wrap the multimedia
	$('.multimedia').each(function(){
		var media = $(this);
		var caption = media.next('.caption');
		var wrapper = media.parent('.multimedia-wrapper');
		if(wrapper.length == 0){
			wrapper = $('<div></div>');
			wrapper.addClass('multimedia-wrapper');
			media.after(wrapper);
			wrapper.append(media);
			wrapper.append(caption);
			
			// chrome somehow stops autoplay after append the video
			media.filter('video[autoplay]').each(function(){
				this.play();
			});
		}
	});
	
	// wrap the iframe
	$('iframe.multimedia.responsive').each(function(){
		var iframe = $(this);
		var div = iframe.parent('.div-responsive');
		if(div.length == 0){
			div = $(document.createElement('div'));
			iframe.removeClass('multimedia responsive').addClass('div-responsive-target');
			div.addClass('multimedia div-responsive');
			if( iframe.hasClass('with-border') ){
				iframe.removeClass('with-border');
				div.addClass('with-border');
			}
			
			div.attr( 'data-width', iframe.width() );
			div.attr( 'data-height', iframe.height() );
			div.attr( 'data-min-width', iframe.attr('data-min-width') );
			
			iframe.after(div);
			div.append(iframe);
			hil.fn.resizeDiv(div);
		}
	});
	
	
	// CAPTION
	// some caption won't be numbered
	$('div.modal-dialog .modal-body .multimedia + .caption').addClass('no-number');
	$('div.carousel.block .multimedia + .caption').addClass('no-number full-width');
	// $('.collapse .caption').addClass('no-number');
	// $('div.tab-content .multimedia + .caption').addClass('no-number');
	
	// numbered the captions in one page
	$('.multimedia + .caption').each(function(i){
		$(this).html( $(this).html().trim() );
	});
	$('.multimedia + .caption.photo').not('.no-number').each(function(i){
		$(this).prepend('<span class="number">圖&nbsp;' + (i+1) + ' </span><span>:&nbsp;</span>');
	});
	$('.multimedia + .caption.video').not('.no-number').each(function(i){
		$(this).prepend('<span class="number">影片&nbsp;' + (i+1) + ' </span><span>:&nbsp;</span>');
	});
	$('.multimedia + .caption.table').not('.no-number').each(function(i){
		$(this).prepend('<span class="number">表&nbsp;' + (i+1) + ' </span><span>:&nbsp;</span>');
	});
	$('.multimedia + .caption.animate').not('.no-number').each(function(i){
		$(this).prepend('<span class="number">動畫&nbsp;' + (i+1) + ' </span><span>:&nbsp;</span>');
	});
	$('.multimedia + .caption.interact').not('.no-number').each(function(i){
		$(this).prepend('<span class="number">互動&nbsp;' + (i+1) + ' </span><span>:&nbsp;</span>');
	});
	
	$('span[ref]').each(function(){
		var s = $(this);
		var ref = s.attr('ref');
		var caption = $('.multimedia + .caption[label=' + ref + ']:first').not('.no-number');
		s.empty();
		if(caption.length){
			s.html( caption.find('span.number').html() );
		}
	});
	
});