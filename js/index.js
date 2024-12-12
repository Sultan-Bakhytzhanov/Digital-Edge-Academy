window.addEventListener('scroll', function () {
	let nav = document.querySelector('nav');
	nav.classList.toggle('sticky', window.scrollY > 0);
});

// Посмотреть сайт академии Шаг
