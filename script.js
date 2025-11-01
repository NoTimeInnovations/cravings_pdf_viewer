document.addEventListener("DOMContentLoaded", async () => {
  const menuList = document.getElementById("menu-list");

  try {
    const response = await fetch("menuList.json");
    const restaurants = await response.json();

    if (restaurants.length === 0) {
      menuList.innerHTML = `<p class="text-center text-gray-600 col-span-full">No menus available yet.</p>`;
      return;
    }

    restaurants.forEach((name) => {
      const card = document.createElement("div");
      card.className =
        "menu-card bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center transition hover:shadow-lg hover:scale-[1.02]";
      card.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-800 mb-3 capitalize">${name}</h3>
        <button 
          data-name="${name}" 
          class="view-pdf px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
          View Menu <i data-feather="eye"></i>
        </button>
      `;
      menuList.appendChild(card);
    });

    feather.replace();

    // Button click -> redirect to viewer
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("view-pdf") || e.target.closest(".view-pdf")) {
        const button = e.target.classList.contains("view-pdf")
          ? e.target
          : e.target.closest(".view-pdf");
        const name = button.getAttribute("data-name");
        window.location.href = `menu.html?restaurant=${name}`;
      }
    });
  } catch (error) {
    console.error("Error loading menu list:", error);
    menuList.innerHTML = `<p class="text-center text-red-500 col-span-full">Failed to load menus.</p>`;
  }
});
