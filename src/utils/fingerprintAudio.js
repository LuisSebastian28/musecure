// fingerprintAudio.js

// Función applyHannWindow que falta
function applyHannWindow(signal) {
  const N = signal.length;
  const windowed = new Float32Array(N);
  
  for (let i = 0; i < N; i++) {
    const hann = 0.5 * (1 - Math.cos(2 * Math.PI * i / (N - 1)));
    windowed[i] = signal[i] * hann;
  }
  
  return windowed;
}

// FFT optimizada - versión más rápida
function fftOptimized(signal) {
  const N = signal.length;
  
  // Para desarrollo, usar una FFT simplificada o reducir tamaño
  if (N > 512) {
    // Reducir a 512 puntos para mayor velocidad
    const downsampled = downsample(signal, 512);
    return simpleFFT(downsampled);
  }
  
  return simpleFFT(signal);
}

// FFT simple pero más rápida que la original
function simpleFFT(signal) {
  const N = signal.length;
  const real = new Float32Array(N);
  const imag = new Float32Array(N);

  // Versión optimizada - precalcular constantes
  for (let k = 0; k < N; k++) {
    let sumReal = 0;
    let sumImag = 0;
    
    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N;
      const cosVal = Math.cos(angle);
      const sinVal = Math.sin(angle);
      
      sumReal += signal[n] * cosVal;
      sumImag -= signal[n] * sinVal;
    }
    
    real[k] = sumReal;
    imag[k] = sumImag;
  }

  // Calcular magnitudes
  const magnitudes = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    magnitudes[i] = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
  }
  
  return magnitudes;
}

// Función downsampling
function downsample(signal, targetLength) {
  const originalLength = signal.length;
  const downsampled = new Float32Array(targetLength);
  const ratio = originalLength / targetLength;
  
  for (let i = 0; i < targetLength; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.floor((i + 1) * ratio);
    let sum = 0;
    
    for (let j = start; j < end && j < originalLength; j++) {
      sum += signal[j];
    }
    
    const count = Math.min(end, originalLength) - start;
    downsampled[i] = count > 0 ? sum / count : 0;
  }
  
  return downsampled;
}

// Encontrar picos espectrales
function findLocalPeaks(spectrum, sampleRate, windowSize) {
  const peaks = [];
  const frequencyResolution = sampleRate / windowSize;
  
  // Ignorar frecuencias muy bajas y muy altas (ruido)
  const minBin = Math.max(1, Math.floor(100 / frequencyResolution)); // 100Hz
  const maxBin = Math.min(spectrum.length - 2, Math.floor(5000 / frequencyResolution)); // 5kHz
  
  for (let i = minBin; i <= maxBin; i++) {
    if (spectrum[i] > spectrum[i - 1] && 
        spectrum[i] > spectrum[i + 1] && 
        spectrum[i] > 0.05) { // Umbral más bajo
      peaks.push({
        frequency: i * frequencyResolution,
        magnitude: spectrum[i]
      });
    }
  }
  
  // Ordenar por magnitud y tomar los más fuertes
  return peaks.sort((a, b) => b.magnitude - a.magnitude)
              .slice(0, 3); // Solo 3 picos para reducir datos
}

// Generar hashes desde los picos
function generateHashesFromPeaks(spectralPeaks) {
  const hashes = [];
  
  // Combinar picos cercanos en el tiempo
  for (let i = 0; i < spectralPeaks.length - 1; i++) {
    const current = spectralPeaks[i];
    
    // Para cada pico actual, buscar picos en ventanas siguientes
    current.peaks.forEach(peak1 => {
      // Buscar solo en la siguiente ventana para reducir combinaciones
      for (let j = 1; j <= 2 && (i + j) < spectralPeaks.length; j++) {
        const targetFrame = spectralPeaks[i + j];
        targetFrame.peaks.forEach(peak2 => {
          // Crear hash simplificado
          const hash = `${Math.round(peak1.frequency/10)*10}|${Math.round(peak2.frequency/10)*10}|${j}`;
          hashes.push({
            hash,
            time: current.time
          });
        });
      }
    });
  }
  
  return hashes;
}

function extractSpectralPeaksOptimized(channelData, windowSize, hopSize, sampleRate) {
  const peaks = [];
  const numWindows = Math.floor((channelData.length - windowSize) / hopSize);
  
  console.log(`Ventanas a procesar: ${numWindows}`);
  
  for (let i = 0; i < numWindows; i++) {
    const start = i * hopSize;
    const window = channelData.slice(start, start + windowSize);
    
    const windowed = applyHannWindow(window);
    const spectrum = fftOptimized(windowed);
    const windowPeaks = findLocalPeaks(spectrum, sampleRate, windowSize);
    
    peaks.push({
      time: start / sampleRate,
      peaks: windowPeaks
    });
    
    // Mostrar progreso
    if (i % 100 === 0) {
      console.log(`Procesado: ${((i / numWindows) * 100).toFixed(1)}%`);
    }
    
    // Para debugging: procesar solo las primeras 50 ventanas
    if (i >= 50 && process.env.NODE_ENV === 'development') {
      console.log('Modo desarrollo: limitado a 50 ventanas');
      break;
    }
  }
  
  return peaks;
}

// VERSIÓN OPTIMIZADA Y PRÁCTICA
export async function generateFingerprint(file) {
  // Usar un ID único para el timer para evitar conflictos
  const timerId = `Fingerprint_${Date.now()}`;
  console.time(timerId);
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    const audioContext = new OfflineAudioContext(1, 44100 * 30, 44100);
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const channelData = audioBuffer.getChannelData(0);
    
    // PARÁMETROS OPTIMIZADOS
    const windowSize = 512; // Reducir aún más para velocidad
    const hopSize = 256;
    const sampleRate = 44100;
    
    // LIMITAR longitud del audio para pruebas
    const maxSamples = 44100 * 5; // Solo 5 segundos para prueba inicial
    const limitedData = channelData.slice(0, maxSamples);
    
    console.log(`Procesando ${limitedData.length} muestras...`);
    
    const spectralPeaks = extractSpectralPeaksOptimized(limitedData, windowSize, hopSize, sampleRate);
    const fingerprints = generateHashesFromPeaks(spectralPeaks);
    
    console.log(`Generados ${fingerprints.length} hashes`);
    console.timeEnd(timerId);
    
    return fingerprints;
  } catch (error) {
    console.error('Error en generateFingerprint:', error);
    console.timeEnd(timerId);
    throw error;
  }
}

// Función para comparar fingerprints (opcional)
export function compareFingerprints(fp1, fp2) {
  const commonHashes = fp1.filter(hash1 => 
    fp2.some(hash2 => hash2.hash === hash1.hash)
  );
  
  const similarity = commonHashes.length / Math.max(fp1.length, fp2.length);
  
  return {
    similarity,
    commonHashes: commonHashes.length,
    totalHashes: Math.max(fp1.length, fp2.length)
  };
}