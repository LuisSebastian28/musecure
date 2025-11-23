// storage.js

// Guardar canción nueva
export function saveSong(song) {
  const data = JSON.parse(localStorage.getItem("songs") || "[]");
  data.push(song);
  localStorage.setItem("songs", JSON.stringify(data));
}

// Obtener todas las canciones
export function getSongs() {
  return JSON.parse(localStorage.getItem("songs") || "[]");
}

// Buscar canción por fingerprint (COINCIDENCIAS PARCIALES)
export function findSongByFingerprint(inputFingerprint) {
  const songs = getSongs();
  
  if (!inputFingerprint || !Array.isArray(inputFingerprint)) {
    return null;
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const song of songs) {
    const similarity = compareFingerprints(inputFingerprint, song.fingerprint);
    
    if (similarity > bestScore && similarity > 0.3) { // Umbral mínimo de 30%
      bestScore = similarity;
      bestMatch = { ...song, similarity };
    }
  }

  return bestMatch;
}

// Comparar dos fingerprints y calcular similitud
function compareFingerprints(fp1, fp2) {
  if (!fp1 || !fp2 || !Array.isArray(fp1) || !Array.isArray(fp2)) {
    return 0;
  }

  // Extraer solo los hashes para comparación
  const hashes1 = new Set(fp1.map(item => item.hash));
  const hashes2 = new Set(fp2.map(item => item.hash));

  // Calcular intersección
  const commonHashes = [...hashes1].filter(hash => hashes2.has(hash));
  
  // Calcular similitud (Jaccard index)
  const unionSize = new Set([...hashes1, ...hashes2]).size;
  const similarity = unionSize > 0 ? commonHashes.length / unionSize : 0;

  console.log(`Coincidencias: ${commonHashes.length}/${unionSize}, Similitud: ${(similarity * 100).toFixed(1)}%`);
  
  return similarity;
}

// Función para verificar si una canción ya existe (antes de guardar)
export function checkDuplicate(inputFingerprint, minSimilarity = 0.4) {
  const songs = getSongs();
  
  for (const song of songs) {
    const similarity = compareFingerprints(inputFingerprint, song.fingerprint);
    
    if (similarity >= minSimilarity) {
      return {
        exists: true,
        song: song,
        similarity: similarity
      };
    }
  }
  
  return { exists: false };
}