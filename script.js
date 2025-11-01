document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurant = urlParams.get("restaurant");
  const pdfContainer = document.getElementById("pdf-container");
  const loadingScreen = document.getElementById("loading-screen");

  if (!restaurant) {
    pdfContainer.innerHTML =
      "<p style='text-align:center;color:white;margin:30px;'>No restaurant specified</p>";
    return;
  }

  const pdfPath = `assets/${restaurant}.pdf`;

  try {
    // Load the PDF
    const pdf = await pdfjsLib.getDocument(pdfPath).promise;

    // Clear loading screen
    loadingScreen.style.display = "none";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      // Scale for clarity
      const scale = 2; // higher = sharper
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // High DPI support for retina displays
      const outputScale = window.devicePixelRatio || 1;
      canvas.width = viewport.width * outputScale;
      canvas.height = viewport.height * outputScale;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      const transform =
        outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

      const renderContext = {
        canvasContext: context,
        transform,
        viewport,
      };

      await page.render(renderContext).promise;
      pdfContainer.appendChild(canvas);
    }
  } catch (error) {
    console.error("Error loading PDF:", error);
    loadingScreen.innerHTML =
      "<p style='color:red;'>Failed to load menu. Please try again later.</p>";
  }
});
