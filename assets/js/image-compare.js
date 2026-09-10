(function () {
	var handleIcon =
		'<span class="img-compare-handle-icon">' +
			'<svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
				'<polyline points="8 6 2 12 8 18"></polyline>' +
				'<polyline points="16 6 22 12 16 18"></polyline>' +
			'</svg>' +
		'</span>';

	document.querySelectorAll('.img-compare[data-before][data-after]').forEach(function (el) {
		var before = el.dataset.before;
		var after = el.dataset.after;
		var beforeAlt = el.dataset.beforeAlt || 'Before';
		var afterAlt = el.dataset.afterAlt || 'After';

		el.innerHTML =
			'<div class="img-compare-frame">' +
				'<img class="img-compare-after" src="' + after + '" alt="' + afterAlt + '" />' +
				'<img class="img-compare-before" src="' + before + '" alt="' + beforeAlt + '" />' +
				'<div class="img-compare-handle">' + handleIcon + '</div>' +
			'</div>' +
			'<input type="range" class="img-compare-slider" min="0" max="100" value="50" aria-label="Drag to compare images" />';

		var frame = el.querySelector('.img-compare-frame');
		var slider = el.querySelector('.img-compare-slider');

		var setPos = function (pct) {
			pct = Math.max(0, Math.min(100, pct));
			slider.value = pct;
			el.style.setProperty('--pos', pct + '%');
		};

		var setFromClientX = function (clientX) {
			var rect = frame.getBoundingClientRect();
			setPos(((clientX - rect.left) / rect.width) * 100);
		};

		// Drive the drag ourselves from raw pointer position rather than relying
		// on the browser's native range-slider touch handling, which behaves
		// inconsistently across iOS/Android/desktop once heavily restyled.
		var dragging = false;

		slider.addEventListener('pointerdown', function (e) {
			dragging = true;
			slider.setPointerCapture(e.pointerId);
			setFromClientX(e.clientX);
		});
		slider.addEventListener('pointermove', function (e) {
			if (!dragging) return;
			setFromClientX(e.clientX);
		});
		slider.addEventListener('pointerup', function () { dragging = false; });
		slider.addEventListener('pointercancel', function () { dragging = false; });

		// Keep keyboard arrow-key interaction working too.
		slider.addEventListener('input', function () {
			el.style.setProperty('--pos', slider.value + '%');
		});

		setPos(50);
	});
})();
