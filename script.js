document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       ACCORDION
    ========================== */
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;

            document.querySelectorAll(".accordion-content").forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.style.paddingTop = "0";
                    item.style.paddingBottom = "0";
                }
            });

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.paddingTop = "0";
                content.style.paddingBottom = "0";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.paddingTop = "0.5rem";
                content.style.paddingBottom = "0.5rem";
            }
        });
    });

    /* ==========================
       CONTROLE DE FONTE
    ========================== */
    let tamanhoFonte = 100;

    const aumentarFonteBtn = document.getElementById("aumentarFonte");
    const diminuirFonteBtn = document.getElementById("diminuirFonte");

    const elementosTexto = document.querySelectorAll(
        ".narrativa, .cards, .formulario, .comentarios"
    );

    aumentarFonteBtn.addEventListener("click", () => {
        if (tamanhoFonte < 150) {
            tamanhoFonte += 10;

            elementosTexto.forEach(elemento => {
                elemento.style.fontSize = `${tamanhoFonte}%`;
            });
        }
    });

    diminuirFonteBtn.addEventListener("click", () => {
        if (tamanhoFonte > 70) {
            tamanhoFonte -= 10;

            elementosTexto.forEach(elemento => {
                elemento.style.fontSize = `${tamanhoFonte}%`;
            });
        }
    });

    /* ==========================
       MODO CONTRASTE
    ========================== */
    const contrasteBtn = document.getElementById("contraste");
    let modoEscuro = false;

    contrasteBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        modoEscuro = !modoEscuro;
    });

    /* ==========================
       LEITURA POR VOZ
    ========================== */
    const lerTextoBtn = document.getElementById("lerTexto");
    const pararLeituraBtn = document.getElementById("pararLeitura");

    let speech = null;

    lerTextoBtn.addEventListener("click", () => {

        window.speechSynthesis.cancel();

        const elementosLeitura = document.querySelectorAll(
            ".narrativa p, .narrativa h2, .cards h2, .accordion-content p"
        );

        let textoCompleto = "";

        elementosLeitura.forEach(elemento => {
            textoCompleto += elemento.innerText + ". ";
        });

        speech = new SpeechSynthesisUtterance(textoCompleto);

        speech.lang = "pt-BR";
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        window.speechSynthesis.speak(speech);
    });

    pararLeituraBtn.addEventListener("click", () => {
        window.speechSynthesis.cancel();
    });

    /* ==========================
       FORMULÁRIO
    ========================== */
    const formulario = document.querySelector(".formulario form");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        alert("Inscrição enviada com sucesso!");

        formulario.reset();
    });

    /* ==========================
       COMENTÁRIOS
    ========================== */
    const comentarioBtn = document.querySelector(".comentarios button");
    const comentarioArea = document.querySelector(".comentarios textarea");

    comentarioBtn.addEventListener("click", () => {

        const texto = comentarioArea.value.trim();

        if (texto === "") {
            alert("Digite um comentário antes de enviar.");
            return;
        }

        alert("Comentário enviado com sucesso!");

        comentarioArea.value = "";
    });

    /* ==========================
       ANIMAÇÃO DE ENTRADA
    ========================== */
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.15
    });

    const sections = document.querySelectorAll(
        ".narrativa, .cards, .imagens, .interativos"
    );

    sections.forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });

});