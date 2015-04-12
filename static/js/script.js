$(document).ready(function() {

  	/* login and registration layers */
  	$('#password').password().on('show.bs.password',function (e) {
        $('#show_pass').prop('checked', true);
    }).on('hide.bs.password', function (e) {
                $('#show_pass').prop('checked', false);
            $('#show_pass').click(function () {
    	var txt = $('#password').password('val');
    	var cur = $('#password').val();
        $('#password').password('toggle');
        if (cur != '') {
        	$('#password').password('val', txt);
    	}
    });   });

   $('#password1').password().on('show.bs.password',function (e) {
        $('#show_pass1').prop('checked', true);
    }).on('hide.bs.password', function (e) {
                $('#show_pass1').prop('checked', false);
            });
    $('#show_pass1').click(function () {
    	var txt = $('#password1').password('val');
    	var cur = $('#password1').val();
        $('#password1').password('toggle');
        if (cur != '') {
        	$('#password1').password('val', txt);
    	};
    });

	//= includes/select2.js
	//= includes/fancybox.js
	//= includes/bxslider.js
	//= includes/alerts.js
	//= includes/tips.js
	//= includes/scrollTo.js
	//= includes/toggle.js
	//= includes/autocomplete.js
	//= includes/forms.js
	//= includes/tabs.js
	//= includes/maps.js
	//= includes/filters.js
	//= includes/popups.js
	//= includes/card.js
});
