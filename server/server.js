import express from "express";
import cors from "cors";
import multer from "multer";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
const upload = multer({ dest: path.join(__dirname, "uploads/") });

// --- Subida de archivo ---
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Archivo no enviado" });

  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, req.file.originalname);
  fs.renameSync(tempPath, targetPath);

  res.json({ filename: req.file.originalname });
});

// --- Generar fingerprint ---
app.post("/api/fingerprint", (req, res) => {
  const { filename } = req.body;
  if (!filename) return res.status(400).json({ error: "Falta el nombre del archivo" });

  const audioPath = path.join(__dirname, filename);
  const fpcalcPath = path.join(__dirname, "fpcalc", "fpcalc.exe"); // asegúrate de que fpcalc.exe está aquí

  const fp = spawn(fpcalcPath, [audioPath]);

  let output = "";
  fp.stdout.on("data", (data) => {
    output += data.toString();
  });

  fp.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  fp.on("close", (code) => {
    if (code !== 0) return res.status(500).json({ error: "Error generando fingerprint" });
    
    const durationMatch = output.match(/DURATION=(\d+)/);
    const fingerprintMatch = output.match(/FINGERPRINT=(.+)/);

    res.json({
      duration: durationMatch ? parseInt(durationMatch[1]) : null,
      fingerprint: fingerprintMatch ? fingerprintMatch[1] : null
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
