(function () {
	if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	var el = document.querySelector('.cursor-dither');
	if (!el) return;

	window.addEventListener('mousemove', function (e) {
		el.style.setProperty('--dither-x', e.clientX + 'px');
		el.style.setProperty('--dither-y', e.clientY + 'px');
	}, { passive: true });
})();
