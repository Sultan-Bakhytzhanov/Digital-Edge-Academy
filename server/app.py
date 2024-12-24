from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

# Конфигурация SMTP
# Замените на SMTP-сервер вашего почтового провайдера
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587  # Порт для TLS
EMAIL_ADDRESS = "bahytzanovsultan@gmail.com"  # Замените на вашу почту
EMAIL_PASSWORD = "nfbc gnct kdws rtef"  # Пароль или App Password


@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        # Получение данных формы
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Создание письма
        subject = f"New Message from {name}"
        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

        # Настройка MIME-объекта
        msg = MIMEMultipart()
        msg['From'] = email  # Отправитель (введённый пользователем)
        msg['To'] = EMAIL_ADDRESS  # Ваша почта
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Подключение к SMTP-серверу
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Шифрование соединения
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)  # Аутентификация
            server.sendmail(email, EMAIL_ADDRESS,
                            msg.as_string())  # Отправка письма

        return jsonify({"status": "success", "message": "Email sent successfully!"})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": "Failed to send email."}), 500


if __name__ == '__main__':
    app.run(debug=True)
