/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},

		};

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '961px',   '1280px' ],
			narrow:    [ '841px',   '960px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			speed: 350,
			noOpenerFade: true,
			alignment: 'center'
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Nav.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Carousels.
		$('.carousel').each(function() {

			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');

			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;

			// Items.
				if (settings.carousels.fadeIn) {

					$items.addClass('loading');

					$t.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						enter: function() {

							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								xf.removeClass('loading');

							}, settings.carousels.fadeDelay);

						}
					});

				}

			// Main.
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};

				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

			// Forward.
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= settings.carousels.speed;

							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Backward.
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += settings.carousels.speed;

							if (pos >= leftLimit) {

								window.clearInterval(timerId);
								pos = leftLimit;

							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Init.
				$window.on('load', function() {

					reelWidth = $reel[0].scrollWidth;

					if (browser.mobile) {

						$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
						$forward.hide();
						$backward.hide();

					}
					else {

						$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
						$forward.show();
						$backward.show();

					}

					$t._update();

					$window.on('resize', function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

				});

		});

	// Hide nav on scroll down, show on scroll up
	(function() {
		var lastScrollTop = 0;
		var navContainer = document.querySelector('nav').parentElement; // The div containing nav
		navContainer.style.position = 'fixed';
		navContainer.style.width = '100%';
		navContainer.style.top = '0';
		navContainer.style.left = '0';
		navContainer.style.zIndex = '1000';
		navContainer.style.transition = 'top 0.3s';

		window.addEventListener('scroll', function() {
			var st = window.pageYOffset || document.documentElement.scrollTop;
			if (st > lastScrollTop) {
				// Scrolling down
				navContainer.style.top = '-100px'; // Hide (adjust as needed)
			} else {
				// Scrolling up
				navContainer.style.top = '0';
			}
			lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
		}, false);
	})();

	// Scroll-triggered animations - elements appear from bottom up
	(function() {
		// Add scroll-animate class to elements that should animate
		var animateElements = document.querySelectorAll('header, .image-wrapper, .col-4, #Porducts-logos, #TheUrbis-logo, #header h1');
		
		// Add initial classes to elements
		animateElements.forEach(function(element) {
			element.classList.add('scroll-animate');
			element.classList.add('scroll-animate-hidden');
		});

		// Special animation for header text on page load
		var headerText = document.querySelector('#header h1');
		if (headerText) {
			// Trigger animation after a short delay on page load
			setTimeout(function() {
				headerText.classList.remove('scroll-animate-hidden');
				headerText.classList.add('scroll-animate-visible');
			}, 500); // 500ms delay after page load
		}

		// Intersection Observer for scroll animations
		var observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		};

		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.remove('scroll-animate-hidden');
					entry.target.classList.add('scroll-animate-visible');
				}
			});
		}, observerOptions);

		// Observe all elements with scroll-animate class (except header text which is handled separately)
		animateElements.forEach(function(element) {
			if (element !== headerText) {
				observer.observe(element);
			}
		});

		// For carousel items, stagger the animation
		var carouselItems = document.querySelectorAll('.carousel article');
		carouselItems.forEach(function(item, index) {
			item.style.transitionDelay = (index * 0.1) + 's';
		});

	})();

})(jQuery);