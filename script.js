// Simple restaurant data
const menuData = [
  { name: "salkara", path: "assets/salkara.pdf" },
];

document.addEventListener("DOMContentLoaded", () => {
  const menuList = document.getElementById("menu-list");

  // Render menu cards
  menuData.forEach((menu) => {
    const card = document.createElement("div");
    card.className =
      "menu-card bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center";
    card.innerHTML = `
      <h3 class="text-xl font-semibold text-gray-800 mb-3 capitalize">${menu.name}</h3>
      <button 
        data-name="${menu.name}" 
        class="view-pdf px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
        View Menu <i data-feather="eye"></i>
      </button>
    `;
    menuList.appendChild(card);
  });

  feather.replace();

  // Handle redirect - Works for both local and Vercel
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-pdf") || e.target.closest(".view-pdf")) {
      const button = e.target.classList.contains("view-pdf")
        ? e.target
        : e.target.closest(".view-pdf");
      const name = button.getAttribute("data-name");
      
      // Use query parameter instead of path for local compatibility
      window.location.href = `menu.html?restaurant=${name}`;
    }
  });
});