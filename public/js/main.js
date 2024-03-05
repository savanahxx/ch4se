$(document).ready(() => {
    $("a").on("click", function (t) {
		t.preventDefault();
        window.location.replace(window.location.href);
	})

    $('.cb-input').on('focus', function () {
        $(this).parent().addClass("floating");
    })

    $('.cb-input').on('blur', function () {
        if ($(this).val().trim() == "") {
            $(this).parent().removeClass("floating");
        }
    })

    $('.checkbox-input').on('click', function () {
        $(this).toggleClass("checkbox-input--checked");
    })

    $('.cb-input').on('keyup blur', function () {
        if ($(this).val().trim().length < 3) {
			$(this).addClass('input-error');
            $(this).prev().children().addClass('error');
		} else {
            $(this).removeClass('input-error');
            $(this).prev().children().removeClass('error');
		}
    })

    $('.submit-btn').on('click', function (e) {
        $(".cb-input").each(function () {
			if ($(this).val().trim().length < 3) {
                $(this).trigger("blur");
                e.preventDefault();
            }
		});
    });
})