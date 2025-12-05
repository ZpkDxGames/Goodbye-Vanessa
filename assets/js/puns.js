const puns = [
    {
        setup: "Por que o sujeito foi ao psicólogo?",
        punchline: "Porque ele estava se sentindo indeterminado! ❓"
    },
    {
        setup: "O que a vírgula disse para o ponto final?",
        punchline: "Gosto de você porque você sempre dá um fim na discussão! 🛑"
    },
    {
        setup: "Por que a crase não foi à festa?",
        punchline: "Porque ela é muito grave! 📉"
    },
    {
        setup: "O que a Tese disse para o Argumento?",
        punchline: "Sem você, eu não me sustento! 🤝"
    },
    {
        setup: "Por que o Gerúndio foi demitido?",
        punchline: "Porque ele só ficava enrolando... fazendo... dizendo... 🌀"
    },
    {
        setup: "Qual é o cúmulo da solidão na redação?",
        punchline: "Ser um parágrafo frasal! 🏜️"
    },
    {
        setup: "O que o corretor disse para a redação sem coesão?",
        punchline: "Nós não temos nenhuma ligação! 💔"
    },
    {
        setup: "Por que o estudante levou uma escada para a prova?",
        punchline: "Para atingir o topo da Competência 5! 🪜"
    },
    {
        setup: "Qual é o filme favorito dos professores de redação?",
        punchline: "O Senhor dos Anéis: A Sociedade da Oração Subordinada! 💍"
    },
    {
        setup: "O que o ponto de exclamação disse para o ponto de interrogação?",
        punchline: "Para de ser tão curioso! ❗❓"
    },
    {
        setup: "Por que o Pleonasmo subiu para cima?",
        punchline: "Para ver a vista com os próprios olhos! 👀"
    },
    {
        setup: "Qual é o país que é uma conjunção adversativa?",
        punchline: "Mas-cedônia! 🇲🇰"
    },
    {
        setup: "O que a folha de rascunho disse para a folha oficial?",
        punchline: "Eu sofro para você brilhar! ✨"
    },
    {
        setup: "Esqueça...",
        punchline: "TUDOOOO (menos o repertório sociocultural!) 🧠"
    }
];

let currentPunIndex = -1;
const cardContainer = document.getElementById('pun-card-container');
const nextBtn = document.getElementById('next-pun-btn');

function getRandomPun() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * puns.length);
    } while (newIndex === currentPunIndex && puns.length > 1);
    
    currentPunIndex = newIndex;
    return puns[currentPunIndex];
}

function createCard(pun) {
    const card = document.createElement('div');
    card.className = 'pun-display-card';
    
    card.innerHTML = `
        <div class="pun-inner">
            <div class="pun-front">
                <div class="pun-icon">🤔</div>
                <p class="pun-text">${pun.setup}</p>
                <span class="tap-hint">Toque para ver a resposta</span>
            </div>
            <div class="pun-back">
                <div class="pun-icon">😂</div>
                <p class="pun-text">${pun.punchline}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
            triggerConfetti(card);
        }
    });

    return card;
}

function showNextPun() {
    // Disable button temporarily
    nextBtn.disabled = true;
    
    const oldCard = cardContainer.querySelector('.pun-display-card');
    const newPun = getRandomPun();
    const newCard = createCard(newPun);

    // Prepare new card (start off-screen right)
    newCard.classList.add('entering');
    cardContainer.appendChild(newCard);

    // Animate old card out (to left)
    if (oldCard) {
        oldCard.classList.add('exiting');
        setTimeout(() => {
            oldCard.remove();
        }, 500); // Match CSS transition
    }

    // Animate new card in
    requestAnimationFrame(() => {
        newCard.classList.remove('entering');
    });

    setTimeout(() => {
        nextBtn.disabled = false;
    }, 500);
}

function triggerConfetti(element) {
    // Simple emoji burst effect
    const rect = element.getBoundingClientRect();
    const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    for (let i = 0; i < 10; i++) {
        createEmojiParticle(center.x, center.y);
    }
}

function createEmojiParticle(x, y) {
    const emojis = ['😂', '🤣', '😹', '💀', '✨'];
    const particle = document.createElement('div');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.className = 'emoji-particle';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showNextPun();
    nextBtn.addEventListener('click', showNextPun);
});
