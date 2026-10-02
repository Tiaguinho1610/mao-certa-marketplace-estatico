const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

function openModal(title, text){
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
}
document.getElementById("modalClose").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

document.getElementById("loginBtn").addEventListener("click", () =>
  openModal("Entrar", "Área de demonstração. Você poderá conectar este formulário ao seu sistema de autenticação.")
);
document.getElementById("registerBtn").addEventListener("click", () =>
  openModal("Cadastrar meu serviço", "Cadastre seu nome, profissão, cidade, descrição, telefone, fotos e avaliações. Esta etapa pode ser conectada ao banco de dados do marketplace.")
);

document.querySelectorAll(".profile-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".professional-card");
    const name = card.querySelector("h3").textContent;
    const profession = card.querySelector(".profession").textContent;
    openModal(name, `${profession}. Nesta demonstração, a página de perfil pode receber fotos, portfólio, avaliações, serviços, disponibilidade e botão para solicitar orçamento.`);
  });
});

const grid = document.getElementById("professionalGrid");
document.querySelectorAll(".filter").forEach(filter => {
  filter.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    const selected = filter.dataset.filter;
    grid.querySelectorAll(".professional-card").forEach(card => {
      card.style.display = selected === "Todos" || card.dataset.category === selected ? "" : "none";
    });
  });
});

document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("serviceSearch").value = card.dataset.service;
    document.getElementById("profissionais").scrollIntoView({behavior:"smooth"});
  });
});

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const service = document.getElementById("serviceSearch").value.trim();
  const location = document.getElementById("locationSearch").value.trim();
  if(!service && !location){
    openModal("Faça uma busca", "Digite um serviço ou uma cidade para encontrar profissionais.");
    return;
  }
  const query = [service, location].filter(Boolean).join(" em ");
  openModal("Busca realizada", `A busca por "${query}" está pronta para ser conectada ao banco de profissionais e aos filtros reais.`);
});

document.getElementById("demoForm").addEventListener("submit", e => {
  e.preventDefault();
  openModal("Tudo certo!", "Formulário de demonstração enviado. Para produção, podemos salvar esses dados em Firebase, Supabase ou outro backend.");
});

const menuButton = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  });
});
