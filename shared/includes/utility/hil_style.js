// *************************************
//	 STYLE
// *************************************
//
//	some global settings for template v5.1
//

(function(){

	$(document).ready( function(){
		
		// split the bootstrap tab tag evenly
		$('ul.nav-tabs.even').each(function( i ){
			var li = $(this).find('li');
			var w = Math.floor( 100 / li.length );
			var wl = 100 - w * (li.length-1);
			li.css({width: w + '%'});
			li.last().css({width: wl + '%'});
		});
		
		// set the default time interval of carousel
		$('.carousel').each(function(){
			$(this).carousel({
				interval: 60000		
			});
		});
		
		// carousel.block
		$('.carousel.block a.carousel-control.left').html('<i class="fa fa-angle-left"></i>');
		$('.carousel.block a.carousel-control.right').html('<i class="fa fa-angle-right"></i>');
		
		// tooltip
		$('[data-toggle="tooltip"]').tooltip();
		
		// set the close button in bootstrap modal
		$('div.modal-body [data-dismiss=modal]').removeClass().addClass('btn btn-default').html('返回');
		$('div.modal-dialog .modal-header button.close').html('<span class="glyphicon glyphicon-remove"></span>');
		
		// adjust the caption size when Mathjax finish rendering
		MathJax.Hub.Register.StartupHook( "End", function (){
			$('.multimedia + .caption').not('.full-width').each(function(){
				hil.fn.resizeCaption( $(this) );
			});
		}); 
		
		// add "view source" to creative commons hyperlink
		$('a.multimedia[title][href]').click(function(event){
			var a = $(this);
			if(!a.hasClass('active')){
				event.preventDefault();
				a.addClass('active');
				setTimeout(function(){
					a.removeClass('active');
				}, 3000);
			}
		});
		
	});
	
	
	// set the height equal in carousel, after all the content are loaded
	window.addEventListener("load", function(){		
		setTimeout(function(){
			$('.carousel.block').each(function(){
				
				// put it to somewhere visible
				var carousel = $(this);
				var mark = $('<div></div>');
				carousel.after(mark);			
				$( "body" ).append( carousel );
				
				// resize
				carousel.find('.item.active').addClass('active-mark');
				carousel.find('.item').addClass('active');
				carousel.find('div.div-responsive').each(function(){
					hil.fn.resizeDiv( $(this) );
				});
				carousel.find('.multimedia + .caption').not('.full-width').each(function(){
					hil.fn.resizeCaption( $(this) );
				});
				
				var h = carousel.find('.item').map(function(){
					return $(this).outerHeight(true);
				}).get();
				carousel.find('.carousel-inner').height( Math.max.apply(null, h) );
				carousel.find('.item').removeClass('active');
				carousel.find('.item.active-mark').addClass('active').removeClass('active-mark');
				
				// put it back
				mark.after(carousel);
				mark.remove();
				
			});	
		}, 100);
	});

})()