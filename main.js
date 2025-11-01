const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;
const multer = require("multer");
const sharp = require("sharp");

// Temporary upload folder for multer
const TMP_UPLOAD_DIR = path.join(__dirname, "tmp_uploads");
if (!fs.existsSync(TMP_UPLOAD_DIR)) {
  fs.mkdirSync(TMP_UPLOAD_DIR, { recursive: true });
}

const upload = multer({ dest: TMP_UPLOAD_DIR });

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "menu.html"));
});

app.get("/converter", (req, res) => {
  res.sendFile(path.join(__dirname, "converter.html"));
});

app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const partnerRaw = req.body.partner || req.body.folderName || "";
    // sanitize partner name: allow letters, numbers, dash, underscore
    const partner = String(partnerRaw).trim();
    if (!partner || !/^[a-zA-Z0-9_-]+$/.test(partner)) {
      // cleanup tmp files
      if (req.files) {
        for (const f of req.files) {
          fs.unlink(f.path, () => {});
        }
      }
      return res.status(400).json({
        error: "Invalid partner name. Use only letters, numbers, - and _",
      });
    }

    const targetDir = path.join(__dirname, "public", "menus", partner);
    await fsPromises.mkdir(targetDir, { recursive: true });


    for (const f of req.files || []) {
  
      if (f.mimetype.startsWith("image/")) {
        const originalName = path.parse(f.originalname).name;
        const destPath = path.join(targetDir, `${originalName}.webp`);
        const fileBuffer = await fsPromises.readFile(f.path);

        await sharp(fileBuffer)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 100 })
          .toFile(destPath);
        
        await fsPromises.unlink(f.path);
      } else {
        // If it's not an image (like data.json), just move it
        const destPath = path.join(targetDir, f.originalname);
        await fsPromises.rename(f.path, destPath);
      }
    }

    // Ensure data.json exists (if provided as a field)
    if (
      req.body.dataJson &&
      !req.files.find((f) => f.originalname === "data.json")
    ) {
      const dataJsonPath = path.join(targetDir, "data.json");
      await fsPromises.writeFile(dataJsonPath, req.body.dataJson, "utf8");
    }

    // Update partners list
    const partnersFile = path.join(
      __dirname,
      "public",
      "data",
      "partners.json"
    );
    let partners = [];
    try {
      const raw = await fsPromises.readFile(partnersFile, "utf8");
      partners = JSON.parse(raw);
      if (!Array.isArray(partners)) partners = [];
    } catch (e) {
      partners = [];
    }

    if (!partners.includes(partner)) {
      partners.push(partner);
      await fsPromises.writeFile(
        partnersFile,
        JSON.stringify(partners, null, 4),
        "utf8"
      );
    }

    return res.json({ success: true, partner });
  } catch (err) {
    console.error("Upload error:", err);
    // cleanup tmp files on error
    if (req.files) {
      for (const f of req.files) {
        fs.unlink(f.path, () => {});
      }
    }
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/test", async (req, res) => {
  for (let i = 1; i <= 50; i++) {
    const response = await fetch(
      "https://cravings-pdf-viewer.pages.dev/menu?partner=salkara"
    );
    console.log(`Request ${i} status:`, response.status);
  }

  res.send("Test completed");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
