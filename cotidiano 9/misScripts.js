async function cargarContenido() {
  await delay(2500);
  cargarElementos();
  cargarTextos();
  cargarCotizaciones();
}

function cargarElementos() {
  document.getElementById("titulo").textContent = "Cotizaciones Online";
}

function cargarTextos() {
  document.getElementById("EurUsd").textContent = "💶 Euro a Dólares: ";
  document.getElementById("CrcUsd").textContent = "💵 Dólar a Colones: ";
  document.getElementById("BitcoinUsd").textContent = "₿ Bitcoin a USD: ";
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function cargarCotizaciones() {
  try {
    // 💶 Euro a Dólar
    const euroRes = await fetch("https://open.er-api.com/v6/latest/EUR");
    const euroData = await euroRes.json();
    const euroUsd = euroData.rates?.USD;
    if (euroUsd) {
      document.getElementById("EurUsd").textContent += "€" + euroUsd.toFixed(2);
    }

    // 💵 Dólar a Colones
    const crcRes = await fetch("https://open.er-api.com/v6/latest/USD");
    const crcData = await crcRes.json();
    const usdToCrc = crcData.rates?.CRC;
    if (usdToCrc) {
      document.getElementById("CrcUsd").textContent += "₡" + usdToCrc.toFixed(2);
    }

    // ₿ Bitcoin a Dólar
    const btcRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
    const btcData = await btcRes.json();
    const btcUsd = btcData?.bitcoin?.usd;
    if (btcUsd !== undefined) {
      document.getElementById("BitcoinUsd").textContent += "$" + btcUsd.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      document.getElementById("BitcoinUsd").textContent += "⚠️ No se pudo cargar";
    }
  } catch (error) {
    console.error("Error cargando cotizaciones:", error);
    document.getElementById("BitcoinUsd").textContent += "⚠️ Error al conectar";
  }
}