console.log("Fetching partner data...");

const getPartners = async () => {
  try {
    const response = await fetch("/public/data/partners.json");
    const partners = await response.json();


    console.log("Partners loaded:", partners);


    const partnerList = document.getElementById("partner-list");

    partners.forEach(partner => {
      const listItem = document.createElement("a");
      listItem.innerText = partner;
      listItem.href = `https://menu.cravings.live/menu.html?partner=${partner}`;
      partnerList.appendChild(listItem);
    });

  } catch (error) {
    console.error("Error fetching partner data:", error);
  }
};


getPartners();