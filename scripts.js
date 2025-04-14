// Função que vai atualizar o contador de tempo
function atualizarContador() {
  const dataAlvo = new Date("2025-04-02T00:00:00"); // data de início
  const agora = new Date(); // hora atual
  const diferenca = agora - dataAlvo; // diferença em milissegundos

  // Cálculo dos dias, horas, minutos e segundos
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  // Exibindo os valores no HTML
  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}

// Rodando a função de contagem a cada segundo
setInterval(atualizarContador, 1000);

// Executando a função imediatamente ao carregar a página
atualizarContador();

  
  function enviarMensagemDiaria() {
    const dataHoje = new Date();
    const dataLimite = new Date("2025-04-18");
  
    if (dataHoje <= dataLimite) {
      const mensagemContainer = document.getElementById("mensagem");
      const dataDia = dataHoje.getDate();
  
      // Mensagem padrão
      let mensagem = "Te amo ❤️";
  
      // Verifique as condições de envio para as mensagens específicas
      if (dataDia >= 16 && dataDia <= 18) {
        mensagem = "Te amo ❤️ (última mensagem com áudios)";
        // Adicionar os áudios na última mensagem
        mensagem += `<audio controls><source src="audio1.mp3" type="audio/mp3"></audio><br><audio controls><source src="audio2.mp3" type="audio/mp3"></audio><br>`;
        mensagem += `<a href="surpresa.html" class="te-amo-btn">Ir para surpresa</a>`;
      }
  
      mensagemContainer.innerHTML = mensagem;
    }
  }
  
  // Atualiza a mensagem todos os dias às 04h (hora local)
  const horaAtual = new Date().getHours();
  if (horaAtual === 4) {
    enviarMensagemDiaria();
  }
  
  document.getElementById("coracao-fixo").onclick = function() {
    alert("A mensagem será enviada todo dia às 04h da manhã até o dia 18/04!");
  };
  
  // Atualiza o contador a cada segundo
  setInterval(atualizarContador, 1000);
  atualizarContador();
  function verificarMensagens() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // zera horas pra comparar só data
  
    const container = document.getElementById("mensagens-chat");
    container.innerHTML = "";
  
    mensagens.forEach(msg => {
      const dataMsg = new Date(msg.data);
      if (dataMsg <= hoje) {
        const item = document.createElement("div");
        item.className = "mensagem-item";
  
        if (msg.tipo === "audio") {
          const audio = document.createElement("audio");
          audio.controls = true;
          audio.src = msg.src;
          audio.className = "audio-player";
          item.appendChild(audio);
        } else {
          item.innerHTML = msg.texto;
          if (msg.surpresa) {
            const botao = document.createElement("button");
            botao.textContent = "Abrir Surpresa ❤️";
            botao.className = "botao-surpresa";
            botao.onclick = () => window.location.href = "surpresa.html";
            item.appendChild(botao);
          }
        }
  
        container.appendChild(item);
      }
    });
  }
  
  document.getElementById("botao-chat").addEventListener("click", () => {
    const chat = document.getElementById("mensagens-chat");
    chat.classList.toggle("escondido");
  });
  
  verificarMensagens();
  
  