
var $window = $(window), $terminal;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
	// setup
	$mainContent = $("#mainContent");
	$("#content").css("width", "100%");
	$("#content").css("height", "100%");

	// Coordinate-based Skip Logic (robust against DOM issues)
	$(document).click(function (e) {
		// Check if click is in top-left corner (100px x 100px)
		if (e.clientX < 100 && e.clientY < 100) {
			var $term = $("#terminal");
			var timer = $term.data('typewriterTimer');
			var fullText = $term.data('fullText');
			if (timer && fullText) {
				clearInterval(timer);
				$term.html(fullText);
			}
		}
	});

	// Invisible skip button (clickable area in top-left corner)
	setInterval(function () {
		if ($("#skipIndicator").length === 0) {
			var $indicator = $('<div id="skipIndicator">SKIP</div>');
			$indicator.css({
				"position": "fixed",
				"top": "0",
				"left": "0",
				"width": "100px",
				"height": "50px",
				"z-index": "2147483647",
				"background": "transparent",
				"color": "transparent",
				"pointer-events": "auto",
				"cursor": "pointer"
			});
			$('body').append($indicator);
		}
	}, 500); // Check every 500ms
});

// Removed resize reload logic as it causes issues on mobile
$(window).resize(function () {
	// Optional: Adjust layout if needed, but do not reload
});


(function ($) {
	$.fn.typewriter = function (speed) {
		this.each(function () {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			$ele.data('fullText', str); // Store full text

			var timer = setInterval(function () {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, speed || 30); // Use passed speed or default to 30

			$ele.data('typewriterTimer', timer); // Store timer ID
		});
		return this;
	};
})(jQuery);

function timeElapse(date) {
	var birthDay = date;
	var today = new Date();

	var years = today.getFullYear() - birthDay.getFullYear();
	var months = today.getMonth() - birthDay.getMonth();
	var days = today.getDate() - birthDay.getDate();
	var hours = today.getHours() - birthDay.getHours();
	var minutes = today.getMinutes() - birthDay.getMinutes();
	var seconds = today.getSeconds() - birthDay.getSeconds();

	if (seconds < 0) {
		seconds += 60;
		minutes--;
	}
	if (minutes < 0) {
		minutes += 60;
		hours--;
	}
	if (hours < 0) {
		hours += 24;
		days--;
	}
	if (days < 0) {
		months--;
		var prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
		days += prevMonth.getDate();
	}
	if (months < 0) {
		months += 12;
		years--;
	}

	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;

	var result = "<span class=\"digit years\">" + years + "</span><span class=\"text-years\"> ANNI,</span><br><span class=\"digit months\">" + months + "</span><span class=\"text-months\"> mesi, </span><span class=\"digit days\">" + days + "</span><span class=\"text-days\"> giorni...</span>";
	$("#elapseClock").html(result);
}

