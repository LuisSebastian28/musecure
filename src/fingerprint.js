export async function computeFingerprint(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        // You must have fpcalc installed locally OR an API
        // For hackathon simplicity: simulate fingerprint
        const fakeFingerprint = "FAKE_FP_" + Date.now();
        resolve({ duration: 123, fingerprint: fakeFingerprint });
      } catch (e) {
        reject(e);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
