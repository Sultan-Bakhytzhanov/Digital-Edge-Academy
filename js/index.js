window.addEventListener('scroll', function () {
	let nav = document.querySelector('nav');
	nav.classList.toggle('sticky', window.scrollY > 0);
});

const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

function animateNumbers(element) {
	const target = +element.dataset.target;
	const increment = target / 100;
	let current = 0;

	const updateNumber = () => {
		current += increment;
		if (current >= target) {
			element.textContent = target;
		} else {
			element.textContent = Math.floor(current);
			requestAnimationFrame(updateNumber);
		}
	};
	updateNumber();
}

const statsSection = document.getElementById('about');
const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				statsSection.classList.add('visible');
				document.querySelectorAll('.stat-value').forEach(animateNumbers);
				observer.disconnect();
			}
		});
	},
	{ threshold: 0.5 }
);

observer.observe(statsSection);

document
	.getElementById('contactForm')
	.addEventListener('submit', async function (event) {
		event.preventDefault(); // Остановить стандартное поведение формы

		// Получить данные из формы
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		const message = document.getElementById('message').value;

		try {
			// Отправка данных на сервер
			const response = await fetch('http://127.0.0.1:5000/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, message }),
			});

			// Обработка ответа
			const result = await response.json();
			document.getElementById('responseMessage').innerText = result.message;
		} catch (error) {
			console.error('Error:', error);
			document.getElementById('responseMessage').innerText =
				'An error occurred while sending your message.';
		}
	});

const burgerMenu = document.getElementById('burger-menu');
const navList = document.querySelector('nav ul');

burgerMenu.addEventListener('click', () => {
	navList.classList.toggle('active');
});
