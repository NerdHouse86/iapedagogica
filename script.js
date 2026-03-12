// Dados (reais) dos botões temáticos
const TOPICS = [
  {
    id: "ia-generativa",
    title: "O que é IA Generativa?",
    desc: "Conceito, cuidado com imprecisões e a importância da validação humana.",
    links: [
      {
        label: "Vídeo — IA Generativa",
        url: "https://drive.google.com/file/d/1A8Tmm3su3DakTSn8-ajgeHrPDGtkL1jH/view?usp=drive_link"
      }
    ]
  },
  {
    id: "planejamento-quinzenal",
    title: "Planejamento Quinzenal",
    desc: "Modelo estruturado para apoiar planejamentos mais organizados e estratégicos.",
    links: [
      {
        label: "Documento — Modelo / Prompt",
        url: "https://docs.google.com/document/d/1SED341KyBGTFJHOnsPvcI9ibXZESI6wy68hE_-x2U0/edit?usp=sharing"
      },
      {
        label: "Arquivo — Material 1",
        url: "https://drive.google.com/file/d/1OA_84LYWIv_7Xmuj4jgUe8-Mi2CjwhS/view?usp=drive_link"
      },
      {
        label: "Arquivo — Material 2",
        url: "https://drive.google.com/file/d/1jt6llVc2vxZm4aKh2NyEXigMOmPYPmqc/view?usp=drive_link"
      }
    ]
  },
  {
    id: "metodologias",
    title: "Metodologias e Técnicas",
    desc: "Leitura, reflexão e aprofundamento por vídeos e materiais de apoio.",
    links: [
      {
        label: "Documento — Metodologias e Técnicas",
        url: "https://docs.google.com/document/d/1jbJIzMYCR2Bz8o2gLyC4ZWeihvfXwjsWGifBsI7Or_A/edit?usp=sharing"
      },
      {
        label: "Arquivo — Material 1",
        url: "https://drive.google.com/file/d/13hNL4mvFeudzYHJHOEmGiB7-B76yHVzp/view?usp=drive_link"
      },
      {
        label: "Arquivo — Material 2",
        url: "https://drive.google.com/file/d/1lvjoFQ5G5OzjdWmS-UnFoew0a9uxa_fe/view?usp=drive_link"
      }
    ]
  },
  {
    id: "interdisciplinaridade-gestao",
    title: "Interdisciplinaridade e Gestão",
    desc: "Exemplos de uso para planejamento interdisciplinar e apoio à gestão escolar.",
    links: [
      {
        label: "Arquivo — Interdisciplinaridade",
        url: "https://drive.google.com/file/d/1-xHUOiaTRX0dF_-VewfsZ-Bzc0pevv61/view?usp=drive_link"
      },
      {
        label: "Arquivo — Gestão",
        url: "https://drive.google.com/file/d/1HFG8imGeb1DawNEUsti4N_QkA8BXFbPI/view?usp=drive_link"
      }
    ]
  },
  {
    id: "drive-geral",
    title: "Drive Geral (Todos os Arquivos)",
    desc: "Acesso direto à pasta com todos os materiais do projeto.",
    links: [
      {
        label: "Pasta — Drive Geral",
        url: "https://drive.google.com/drive/folders/1onVCCEZuuifSPCTlxjTZRKAdTpRce_Il?usp=drive_link"
      }
    ]
  }
];

// Elementos
const grid = document.getElementById("topicsGrid");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLinks = document.getElementById("modalLinks");
const toast = document.getElementById("toast");

let lastFocusEl = null;

// Render do grid
function renderTopics() {
  const fragment = document.createDocumentFragment();

  TOPICS.forEach(topic => {
    const card = document.createElement("article");
    card.className = "topic";

    const btn = document.createElement("button");
    btn.className = "topic__btn";
    btn.type = "button";
    btn.setAttribute("aria-label", `Abrir links do tema: ${topic.title}`);
    btn.addEventListener("click", () => openModal(topic));

    const h3 = document.createElement("h3");
    h3.className = "topic__title";
    h3.textContent = topic.title;

    const meta = document.createElement("p");
    meta.className = "topic__meta";
    meta.textContent = topic.desc;

    const badge = document.createElement("div");
    badge.className = "topic__badge";
    badge.innerHTML = `🔗 <span>${topic.links.length} link${topic.links.length > 1 ? "s" : ""}</span>`;

    btn.appendChild(h3);
    btn.appendChild(meta);
    btn.appendChild(badge);
    card.appendChild(btn);

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

// Modal open/close
function openModal(topic) {
  lastFocusEl = document.activeElement;

  modalTitle.textContent = topic.title;
  modalDesc.textContent = topic.desc;

  // Limpa e insere links
  modalLinks.innerHTML = "";
  topic.links.forEach((l, idx) => {
    const li = document.createElement("li");
    li.className = "link";

    const left = document.createElement("div");
    left.className = "link__left";

    const label = document.createElement("div");
    label.className = "link__label";
    label.textContent = l.label;

    const url = document.createElement("div");
    url.className = "link__url";
    url.textContent = l.url;

    left.appendChild(label);
    left.appendChild(url);

    const a = document.createElement("a");
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "btn btn--ghost";
    a.textContent = "Abrir";

    // ID acessível para primeiro link
    if (idx === 0) a.setAttribute("aria-label", `Abrir: ${l.label}`);

    li.appendChild(left);
    li.appendChild(a);
    modalLinks.appendChild(li);
  });

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  // Foco no botão fechar
  const closeBtn = modal.querySelector("[data-close='true']");
  closeBtn && closeBtn.focus();

  document.addEventListener("keydown", onKeyDown);
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.removeEventListener("keydown", onKeyDown);

  if (lastFocusEl) lastFocusEl.focus();
}

function onKeyDown(e) {
  if (e.key === "Escape") closeModal();
}

// Clique fora e botões de fechar
modal.addEventListener("click", (e) => {
  const close = e.target.closest("[data-close='true']");
  if (close) closeModal();
});

// Copiar prompts (exemplos)
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".js-copy");
  if (!btn) return;

  const targetId = btn.getAttribute("data-copy");
  const el = document.getElementById(targetId);
  if (!el) return;

  const text = el.innerText;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Prompt copiado ✅");
  } catch {
    // fallback simples
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("Prompt copiado ✅");
  }
});

let toastTimer = null;
function showToast(message){
  toast.textContent = message;
  toast.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-show"), 2200);
}

// Init
renderTopics();