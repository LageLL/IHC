// script.js - Lógica do Carrinho
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarCarrinho() {
    document.getElementById("cart-count").innerText = carrinho.length;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho(id, nome, preco) {
    carrinho.push({ id, nome, preco });
    atualizarCarrinho();
    
    // Criar a mensagem de sucesso
    let mensagem = document.createElement("div");
    mensagem.textContent = `${nome} foi adicionado ao carrinho com sucesso!`;
    mensagem.style.position = "fixed";
    mensagem.style.bottom = "20px";
    mensagem.style.left = "50%";
    mensagem.style.transform = "translateX(-50%)";
    mensagem.style.background = "#03dac6";
    mensagem.style.color = "#121212";
    mensagem.style.padding = "10px 20px";
    mensagem.style.borderRadius = "5px";
    mensagem.style.fontSize = "16px";
    mensagem.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    mensagem.style.transition = "opacity 0.5s ease-in-out";
    
    document.body.appendChild(mensagem);

    // Remover a mensagem após 3 segundos
    setTimeout(() => {
        mensagem.style.opacity = "0";
        setTimeout(() => mensagem.remove(), 500);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    const botaoFinalizar = document.querySelector(".finalizar");
    const mensagemErro = document.getElementById("mensagem-erro");

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener("click", (event) => {
            let total = carrinho.reduce((acc, item) => acc + item.preco, 0);

            if (total === 0) {
                event.preventDefault(); // Impede a navegação
                mensagemErro.style.display = "block"; // Exibe a mensagem de erro

                // Oculta a mensagem após 3 segundos
                setTimeout(() => {
                    mensagemErro.style.display = "none";
                }, 3000);
            }
        });
    }
});

function alterarFonte(tamanho) {
    let body = document.body;
    let estiloAtual = window.getComputedStyle(body, null).getPropertyValue("font-size");
    let novoTamanho = parseFloat(estiloAtual) + tamanho;
    body.style.fontSize = novoTamanho + "px";
}




if (document.getElementById("carrinho-lista")) {
    const lista = document.getElementById("carrinho-lista");
    const totalSpan = document.getElementById("total");

    carrinho.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        let btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.onclick = () => {
            carrinho.splice(index, 1);
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            location.reload();
        };
        li.appendChild(btnRemover);
        lista.appendChild(li);
    });

    let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    totalSpan.textContent = total.toFixed(2);
}
atualizarCarrinho();
