const books = [
  {
    id: 1,
    title: "L'Éveil des Ombres",
    author: "M. Noir",
    edition: "Tome 1",
    summary: "Une aventure entre réalité et illusion.",
    cover: "https://via.placeholder.com/100x140",
    offers: [],
    reviews: []
  }
];

let currentBook = null;

function goHome() {
  document.getElementById("book-page").classList.add("hidden");
  document.getElementById("book-list").classList.remove("hidden");
}

function showBook(book) {
  currentBook = book;
  document.getElementById("book-list").classList.add("hidden");
  document.getElementById("book-page").classList.remove("hidden");

  document.getElementById("book-title").textContent = book.title;
  document.getElementById("book-author").textContent = "Auteur : " + book.author;
  document.getElementById("book-edition").textContent = "Édition : " + book.edition;
  document.getElementById("book-cover").src = book.cover;
  document.getElementById("info-tab").textContent = book.summary;

  renderOffers();
  renderReviews();
}

function renderOffers() {
  const container = document.getElementById("offers");
  container.innerHTML = "";
  currentBook.offers.forEach(offer => {
    const el = document.createElement("div");
    el.textContent = `${offer.user} — ${offer.price}€ (${offer.condition}, ${offer.delivery})`;
    container.appendChild(el);
  });
}

function renderReviews() {
  const container = document.getElementById("reviews");
  container.innerHTML = "";
  currentBook.reviews.forEach(r => {
    const el = document.createElement("div");
    el.innerHTML = `<strong>${r.user}</strong><p>${r.text}</p>`;
    container.appendChild(el);
  });
}

function addOffer() {
  const user = document.getElementById("seller-name").value;
  const price = document.getElementById("seller-price").value;
  const delivery = document.getElementById("seller-delivery").value;
  const condition = document.getElementById("seller-condition").value;

  if (user && price) {
    currentBook.offers.push({ user, price, delivery, condition });
    renderOffers();
    toggleSell(true);
  }
}

function addReview() {
  const text = document.getElementById("review-text").value;
  if (text) {
    currentBook.reviews.push({ user: "Anonyme", text });
    document.getElementById("review-text").value = "";
    renderReviews();
  }
}

function toggleSell(hide = false) {
  const form = document.getElementById("sell-form");
  if (hide) form.classList.add("hidden");
  else form.classList.toggle("hidden");
}

function setupTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab + "-tab").classList.add("active");
    });
  });
}

function init() {
  const list = document.getElementById("books");
  books.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#">${book.title} - ${book.author}</a>`;
    li.onclick = () => showBook(book);
    list.appendChild(li);
  });
  setupTabs();
}

document.addEventListener("DOMContentLoaded", init);
