from flask import Flask, request, render_template, jsonify


chat = Flask(__name__)

@chat.route('/')
def home():
    return render_template("index.html")




@chat.route('/chat', methods=['GET', 'POST'])
def bot():
    if request.method == 'POST':
        msg = request.form.get('msg', '').lower()
        response = handleInput(msg)
        print(msg)
        return  response.replace('\n', '<br>')
    return  "Invalid request"





def handleInput(msg):
    if 'track' in msg and 'order' in msg:
        return "Shure! Please provide your order number."
    elif 'faq' in msg or 'question' in msg or 'help' in msg:
        return "Here are some FAQs: \n\n 1.  What is your return policy?\n     - You can return items within 30 days.\n\n 2.  What are your support hours?\n     - Our support is available 9am–6pm, Mon–Fri.\n\n 3. How do I contact support?\n     - Just chat here or email support@example.com"
    elif 'report' in msg and ('issue' in msg or 'problem' in msg):
        return "I'm sorry to hear that. Please describe the issue."
    else:
        return "Sorry, I didn't quite get that. I can help you track orders, answer FAQs, or report an issue."

if __name__ == '__main__':
    chat.run()