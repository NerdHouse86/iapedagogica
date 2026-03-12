// Dados reais dos botões e links
const temasData = [
    {
        id: 1,
        title: 'O que é IA Generativa?',
        links: [
            { label: 'Assistir ao Vídeo Explicativo', url: 'https://drive.google.com/file/d/1A8Tmm3su3DakTSn8-ajgeHrPDGtkL1jH/view?usp=drive_link' }
        ]
    },
    {
        id: 2,
        title: 'Planejamento Quinzenal',
        links: [
            { label: 'Material de Referência 1', url: 'https://docs.google.com/document/d/1SED341KyBGTFJHOnsPvcI9ibXZESI6wy68hE_-x2U0/edit?usp=sharing' },
            { label: 'Material de Referência 2', url: 'https://drive.google.com/file/d/1OA_84LYWIv_7Xmuj4jgUe8-Mi2CjwhS/view?usp=drive_link' },
            { label: 'Material de Referência 3', url: 'https://drive.google.com/file/d/1jt6llVc2vxZm4aKh2NyEXigMOmPYPmqc/view?usp=drive_link' }
        ]
    },
    {
        id: 3,
        title: 'Metodologias e Técnicas',
        links: [
            { label: 'Guia de Metodologias', url: 'https://docs.google.com/document/d/1jbJIzMYCR2Bz8o2gLyC4ZWeihvfXwjsWGifBsI7Or_A/edit?usp=sharing' },
            { label: 'Técnicas em Sala de Aula', url: 'https://drive.google.com/file/d/13hNL4mvFeudzYHJHOEmGiB7-B76yHVzp/view?usp=drive_link' },
            { label: 'Documento de Apoio', url: 'https://drive.google.com/file/d/1lvjoFQ5G5OzjdWmS-UnFoew0a9uxa_fe/view?usp=drive_link' }
        ]
    },
    {
        id: 4,
        title: 'Interdisciplinaridade e Gestão',
        links: [
            { label: 'Integração de Disciplinas', url: 'https://drive.google.com/file/d/1-xHUOiaTRX0dF_-VewfsZ-Bzc0pevv61/view?usp=drive_link' },
            { label: 'Gestão Escolar com IA', url: 'https://drive.google.com/file/d/1HFG8imGeb1DawNEUsti4N_QkA8BXFbPI/view?usp=drive_link' }
        ]
    },
    {
        id: 5,
        title: 'Drive Geral (Todos os Arquivos)',
        links: [
            { label: 'Acessar Pasta Completa no Drive', url: 'https://drive.google.com/drive/folders/1onVCCEZuuifSPCTlxjTZRKAdTpRce_Il?usp=drive_link' }
        ]
    }
];

// Elementos do DOM
const gridContainer = document.getElementById('button-grid');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalLinksContainer = document.getElementById('modal-links');

// Função para renderizar os botões na tela principal
function renderizarBotoes() {
    temasData.forEach(tema => {
        // Criar elemento de card (botão grande)
        const card = document.createElement('div');
        card.classList.add('theme-card');
        card.innerHTML = `<h3>${tema.title}</h3>`;
        
        // Adicionar evento de clique para abrir o modal
        card.addEventListener('click', () => abrirModal(tema));
        
        gridContainer.appendChild(card);
    });
}

// Função para abrir o modal e injetar os links específicos
function abrirModal(tema) {
    modalTitle.textContent = tema.title;
    modalLinksContainer.innerHTML = ''; // Limpar links anteriores

    tema.links.forEach(linkObj => {
        const linkTag = document.createElement('a');
        linkTag.href = linkObj.url;
        linkTag.target = '_blank'; // Abre em nova guia
        linkTag.classList.add('resource-link');
        linkTag.textContent = linkObj.label;
        
        modalLinksContainer.appendChild(linkTag);
    });

    modal.classList.add('active');
}

// Fechar Modal ao clicar no botão 'X'
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Fechar Modal ao clicar fora da caixa branca
modal.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.classList.remove('active');
    }
});

// Inicializar a aplicação renderizando os botões
renderizarBotoes();