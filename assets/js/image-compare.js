(function () {
	document.querySelectorAll('.img-compare-slider').forEach(function (slider) {
		var wrap = slider.closest('.img-compare');
		var update = function () {
			wrap.style.setProperty('--pos', slider.value + '%');
		};
		slider.addEventListener('input', update);
		update();
	});
})();
