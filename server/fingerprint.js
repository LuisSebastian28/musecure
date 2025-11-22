// server/fingerprint.js
import { spawn } from "child_process";
import path from "path";

// Ruta absoluta a fpcalc.exe
const __dirname = path.resolve();
const fpcalcPath = path.join(__dirname, "fpcalc", "fpcalc.exe");

// Archivo de audio en la misma carpeta del server
const audioFile = path.join(__dirname, "Black Sheep.mp3");

// Comando fpcalc
const fp = spawn(fpcalcPath, [audioFile]);

fp.stdout.on("data", (data) => {
  console.log("OUTPUT:", data.toString());
});

fp.stderr.on("data", (data) => {
  console.error("ERROR:", data.toString());
});

fp.on("close", (code) => {
  console.log(`Proceso terminado con código ${code}`);
});
