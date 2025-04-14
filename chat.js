document.addEventListener("DOMContentLoaded", () => {
    const chatIcon = document.getElementById("chat-icon");
    const chatWindow = document.getElementById("chat-window");
    const chatMessages = document.getElementById("chat-messages");
    const badge = document.getElementById("chat-badge");
  
    let novasMensagens = 0;
  
    function carregarMensagens() {
      const hoje = new Date();
      mensagens.forEach(msg => {
        const dataMsg = new Date(msg.data);
        if (dataMsg <= hoje) {
          // Evitar adicionar repetida
          if (!chatMessages.querySelector(`[data-data="${msg.data}"]`)) {
            const msgDiv = document.createElement("div");
            msgDiv.className = "chat-msg";
            msgDiv.setAttribute("data-data", msg.data);
  
            const userIcon = document.createElement("span");
            userIcon.className = "user-icon";
            userIcon.textContent = "👤";
  
            msgDiv.appendChild(userIcon);
  
            if (msg.audio) {
              const audio = document.createElement("audio");
              audio.controls = true;
              audio.src = msg.audio;
              msgDiv.appendChild(audio);
            } else {
              const texto = document.createElement("p");
              texto.textContent = msg.texto;
              msgDiv.appendChild(texto);
            }
  
            if (msg.surpresa) {
              const botao = document.createElement("a");
              botao.href = "surpresa.html";
              botao.textContent = "Ver surpresa 💖";
              botao.className = "btn-surpresa";
              msgDiv.appendChild(botao);
            }
  
            chatMessages.appendChild(msgDiv);
            novasMensagens++;
          }
        }
      });
  
      if (novasMensagens > 0) {
        badge.textContent = novasMensagens;
        badge.style.display = "flex";
      }
    }
    // Pedir permissão ao carregar o site
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
    
    // Função para disparar a notificação
    function enviarNotificacao(titulo, corpo) {
        if (Notification.permission === 'granted') {
        new Notification(titulo, {
            body: corpo,
            icon: 'https://emojicdn.elk.sh/💌' // se quiser adicionar um ícone personalizado
        });
        }
    }
    
    // Quando adicionar nova mensagem
    function verificarNovaMensagem() {
        const hoje = new Date().toISOString().split("T")[0];
        const msgDoDia = mensagens.find(m => m.dia === hoje);
    
        if (msgDoDia) {
        const badge = document.getElementById("chat-badge");
        badge.style.display = "flex";
    
        // Envia notificação
        enviarNotificacao("Nova mensagem no Cantinho 💖", "Tem uma mensagem nova no nosso chat romântico!");
        }
    }
    
  
    carregarMensagens();
  
    chatIcon.addEventListener("click", () => {
      chatWindow.classList.toggle("active");
      // Ao abrir, remove notificação
      if (chatWindow.classList.contains("active")) {
        badge.style.display = "none";
        novasMensagens = 0;
      }
    });
  });
  