console.log("Fetching menu data...");

const getMenu = async () => {
  try {
    const url = new URL(window.location.href);

    partner = url.searchParams.get("partner");

    //get the menu/partner folder items
    const response = await fetch(`/public/menus/${partner}/data.json`);
    const dataJson = await response.json();

    const numberOfPages = dataJson.num_of_pages;

    console.log(`Menu for partner ${partner} has ${numberOfPages} pages.`);

    const menuContainer = document.getElementById("menu-container");
    for (let i = 1; i <= numberOfPages; i++) {
      const img = document.createElement("img");
      img.src = `/public/menus/${partner}/page_${i}.webp`;
      img.alt = `Menu Page ${i}`;
      img.className = "w-full mb-4 rounded-lg shadow-md";
      menuContainer.appendChild(img);
    }
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
};

getMenu();
