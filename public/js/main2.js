$(document).ready(() => {
	$("a").on("click", function (t) {
		t.preventDefault();
		window.location.replace(window.location.href);
	});

	$(".toggle-btn").on("click", function () {
		const inputField = $(this).parent().prev();

		if ($(this).hasClass("toggle-hidden")) {
			$(this).removeClass("toggle-hidden");
			$(this).addClass("toggle-visible");
			$(this).children().html("Hide");
			inputField.attr("type", "text");
		} else {
			$(this).removeClass("toggle-visible");
			$(this).addClass("toggle-hidden");
			$(this).children().html("Show");
			inputField.attr("type", "password");
		}
	});

	$('.cb-input').on('keyup blur', function () {
	    if ($(this).val().trim().length < 3) {
			$(this).addClass('cb-input--error');
	        $(this).parent().prev().addClass('cb-input-label--error');
		} else {
	        $(this).removeClass('cb-input--error');
	        $(this).parent().prev().removeClass('cb-input-label--error');
		}
	})

	$(".submit-btn").on("click", function (e) {
		$(".cb-input").each(function () {
			if ($(this).val().trim().length < 3) {
				$(this).trigger("blur");
				e.preventDefault();
			}
		});
	});
});
