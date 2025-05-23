export default {
  async fetch(request) {
    const urlDestino = "https://script.google.com/macros/s/AKfycbxghvot-BAWzvkt1JzGM7Qg55nS0zmm-q-Iv40EE4rXuUO9hWsae65o9voePx1k1PYIY4g/exec";

    // Respuesta para OPTIONS (preflight)
const respuesta = await fetch(urlDestino, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(json)
});

// ⚠️ Importante: convertir a JSON solo si es JSON real
let contenido = await respuesta.text();  // <- usamos .text() primero

try {
  contenido = JSON.parse(contenido);  // <- intentamos convertir si es posible
} catch (e) {
  return new Response("❌ La respuesta no es JSON válido:\n" + contenido, {
    status: 500,
    headers: { "Access-Control-Allow-Origin": "*" }
  });
}

return new Response(JSON.stringify(contenido), {
  status: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
});

    }

    // Procesar POST
    if (request.method === "POST") {
      const cuerpo = await request.text();
      const json = JSON.parse(cuerpo);

      if (json.tipo === "nuevo_tour") {
        const response = await fetch(urlDestino, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(json)
        });

        const data = await response.text();

        return new Response(data, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        });
      }

      return new Response(JSON.stringify({ success: false, error: "Tipo no permitido" }), {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    return new Response("Método no permitido", {
      status: 405,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}
