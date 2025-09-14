AOS.init({ duration: 700, once: true });

// Simple single-page active link highlighting on scroll
// const sections = document.querySelectorAll("section, header");
// const navLinks = document.querySelectorAll(".nav-link");

// function setActiveLink() {
//   let index = sections.length;
//   while (--index && window.scrollY + 120 < sections[index].offsetTop) {}
//   navLinks.forEach((link) => link.classList.remove("active"));
//   const id = sections[index].id;
//   const activeLink = Array.from(navLinks).find(
//     (l) => l.getAttribute("href") === "#" + id
//   );
//   if (activeLink) activeLink.classList.add("active");
// }
// setActiveLink();
// window.addEventListener("scroll", setActiveLink);

// CONTACT FORM validation and pretend send
(function () {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    // simulate send
    alert("ধন্যবাদ! আপনার বার্তা প্রেরণ করা হয়েছে। আমরা দ্রুত উত্তর দেব।");
    form.reset();
    form.classList.remove("was-validated");
  });
})();

// POSTS: simple client-side add to blog area
document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("postTitle").value.trim();
  const body = document.getElementById("postBody").value.trim();
  if (!title || !body) return alert("সব খালি পূরণ করুন");
  // prepend a card
  const container = document.querySelector("#blog .row");
  const col = document.createElement("div");
  col.className = "col-md-4";
  col.innerHTML = `
      <div class="card h-100" data-aos="fade-up">
        <div class="card-body">
          <h5 class="card-title">${escapeHtml(title)}</h5>
          <p class="excerpt">${escapeHtml(body.substring(0, 120))}...</p>
          <a href="#" class="stretched-link">পুরোটা পড়ুন</a>
        </div>
        <div class="card-footer text-muted">${new Date().toLocaleDateString(
          "bn-BD"
        )}</div>
      </div>
    `;
  container.prepend(col);
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("postModal")
  );
  modal.hide();
  document.getElementById("postForm").reset();
  AOS.refresh();
});

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m];
  });
}

// Floating action (open new recipe quick)
document.getElementById("fabBtn").addEventListener("click", function () {
  openRecipeQuick();
});

function openRecipeQuick() {
  const modal = new bootstrap.Modal(document.getElementById("recipeModal"));
  document.getElementById("recipeModalTitle").innerText =
    "রেসিপি যোগ করুন (ডেমো)";
  document.getElementById("recipeModalBody").innerHTML = `
      <p class="mb-2">আপনি নতুন রেসিপি এখানে যোগ করতে পারেন — ডাটাবেস সংযুক্ত না থাকায় এটি শুধুমাত্র UI ডেমো।</p>
      <form id="quickRecipeForm">
        <div class="mb-3">
          <label class="form-label">রেসিপির নাম</label>
          <input class="form-control" id="qTitle" required>
        </div>
        <div class="mb-3">
          <label class="form-label">সংক্ষিপ্ত বর্ণনা</label>
          <textarea class="form-control" id="qDesc" rows="3" required></textarea>
        </div>
        <button class="btn btn-primary" type="submit">যোগ করুন</button>
      </form>
    `;
  modal.show();
  document
    .getElementById("quickRecipeForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const t = document.getElementById("qTitle").value.trim();
      const d = document.getElementById("qDesc").value.trim();
      if (!t || !d) return alert("সব পূরণ করুন");
      addRecipeCard(t, d);
      modal.hide();
    });
}

function addRecipeCard(title, desc) {
  const container = document.getElementById("recipeList");
  const col = document.createElement("div");
  col.className = "col-md-4 recipe-card";
  col.setAttribute("data-aos", "fade-up");
  col.innerHTML = `
      <div class="card card-fish">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60" class="card-img-top" alt="${escapeHtml(
          title
        )}">
        <div class="card-body">
          <h5 class="card-title">${escapeHtml(title)}</h5>
          <p class="excerpt">${escapeHtml(desc)}</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-sm btn-outline-primary" onclick="openRecipe('${escapeHtml(
              title
            )}')">রেসিপি দেখুন</button>
            <small class="text-muted">সময়: -</small>
          </div>
        </div>
      </div>
    `;
  container.prepend(col);
  AOS.refresh();
}

// recipe modal content by key
function openRecipe(key) {
  const modalEl = document.getElementById("recipeModal");
  const modal = new bootstrap.Modal(modalEl);
  const title =
    key === "ilish-jhol"
      ? "ইলিশের ঝোল"
      : key === "rui-bhaja"
      ? "রুই ভাজা"
      : key === "fish-fry"
      ? "মাছের ফ্রায়"
      : key;
  const body =
    key === "ilish-jhol"
      ? `
      <h6>উপকরণ</h6>
      <ul><li>ইলিশ - ৬ টুকরা</li><li>পেঁয়াজ, আদা-রসুন বাটা</li><li>চিনি, লবণ, হলুদ</li></ul>
      <h6>প্রণালী</h6>
      <ol><li>মাছ ধুয়ে নিন, লবণ ও হলুদ লেগিয়ে রাখুন।</li><li>কড়াইতে তেল গরম করে হালকা ভাজুন।</li><li>পেঁয়াজ, আদা-রসুন ভাজে ঝোল তৈরি করুন।</li><li>মাছ মিলিয়ে ঢেকে ১০ মিনিট রান্না করুন।</li></ol>
    `
      : key === "rui-bhaja"
      ? `
      <h6>উপকরণ</h6>
      <ul><li>রুই - টুকরা</li><li>লবণ, হলুদ, সরষের তেল</li></ul>
      <h6>প্রস্তুতি</h6>
      <p>সব মশলা দিয়ে সামান্য ম্যারিনেট করে গরম তেলে ভাজুন।</p>
    `
      : key === "fish-fry"
      ? `
      <h6>উপকরণ</h6><ul><li>মাছ (আপনার পছন্দ)</li><li>আটা, লবণ, সরিষা তেল</li></ul>
      <h6>প্রস্তুতি</h6><p>মাছ মশলায় মাখিয়ে আটা লেগিয়ে ডীপ ফ্রাই করুন।</p>
    `
      : `<p>রেসিপি: ${escapeHtml(key)}</p>`;
  document.getElementById("recipeModalTitle").innerText = title;
  document.getElementById("recipeModalBody").innerHTML = body;
  modal.show();
}

// generic modal usage
function openModal(which) {
  const gm = new bootstrap.Modal(document.getElementById("genericModal"));
  if (which === "fishModal") {
    document.getElementById("genericModalTitle").innerText =
      "মাছের পূর্ণ তালিকা";
    document.getElementById("genericModalBody").innerHTML = `
        <ul>
          <li>ইলিশ - পুষ্টিতে উচ্চ</li>
          <li>রুই - বাড়ির প্রিয়</li>
          <li>কাতলা - বড় ও মাংসল</li>
          <li>পুঁটি, মৃগেল, কই, তেলাপিয়া, সাই - স্থানীয় বেছে নিন</li>
        </ul>
      `;
  }
  gm.show();
}

// recipe search filter
document.getElementById("recipeSearch").addEventListener("input", function (e) {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll("#recipeList .card").forEach((card) => {
    const txt = card.innerText.toLowerCase();
    card.parentElement.style.display = txt.includes(q) ? "" : "none";
  });
});

// small helper: close mobile nav on click
document.querySelectorAll(".navbar-nav .nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    const bsCollapse = document.querySelector(".navbar-collapse");
    if (bsCollapse.classList.contains("show")) {
      bootstrap.Collapse.getInstance(bsCollapse).hide();
    }
  })
);

// initial small fade in
window.addEventListener("load", () => {
  document
    .querySelectorAll("[data-aos]")
    .forEach((el) => el.classList.add("aos-init"));
});
