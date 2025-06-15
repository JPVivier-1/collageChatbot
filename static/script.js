
document.addEventListener("DOMContentLoaded", function () {

    const widget = document.getElementById('chatbot-widget');
    const windowEl = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const messages = document.getElementById('chatbot-messages');
    const inputArea = document.getElementById('chatbot-input-area');
    const input = document.getElementById('chatbot-input');

    widget.addEventListener('click', widgetClick);
    closeBtn.addEventListener('click', closeClick);
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey)
        {
            e.preventDefault();
            inputArea.requestSubmit();
        }
    });

    inputArea.onsubmit = (e) => {
        e.preventDefault();
        const userText = input.value.trim();
        if (!userText) return;
        addMessage(userText, 'user');
        input.value = '';

        fetch("https://collagechatbot.onrender.com/chat", {
            method: "POST",
            headers: { 
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({msg: userText})
        })
        .then(response => response.text())
        .then(data => addMessage(data))
        .catch(error => console.error("Error: ", error));
    }



    /* ----------------------- */
    function widgetClick()
    {
        windowEl.style.display = 'flex';
        widget.style.display = 'none';
        setTimeout(() => input.focus(), 300);
        if (!messages.hasChildNodes())
        {
            botMessage("Hi there! I'm your assistant. I can help you track orders, answer FAQs, or report an issue.");
        }
    }



    /* -------------------------- */
    function closeClick()
    {
        windowEl.style.display = 'none';
        widget.style.display = 'flex';
    }


    /* ------------------------ */
    function botMessage(text)
    {
        showTyping(() => addMessage(text, 'bot'));
    }


    /* ---------------------- */
    function showTyping(callback)
    {
        var spanDot = '<span class="typing-dot"></span>';
        spanDot +=      '<span class="typing-dot"></span>';
        spanDot +=      '<span class="typing-dot"></span>';

        const typing = document.createElement('div');
        typing.className = "typing-bot";
        typing.innerHTML = spanDot;
                            
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
        setTimeout(() => {
            typing.remove;
            callback();
        }, 700 + Math.random() * 400);
    }


    /* ------------------------- */
    function addMessage(text, sender = 'bot')
    {
        const msg = document.createElement('div');
        msg.className = `chatbot-msg ${sender}`;
        msg.innerHTML = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }


});



