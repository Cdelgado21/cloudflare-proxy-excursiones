export default {
  async fetch(request) {
    const destino = "https://script.google.com/macros/s/AKfycbxghvot-BAWzvktlJZGM7qg55ns0Zmm-q-Iv40EE4rXWUoQ3Wsae65o9voePxlkTPlY4g/exec"; // Tu URL real

    // Manejar preflight OPTIONS (CORS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Manejar solicitud POST
    if (request.method === "POST") {
      const body = await request.text();

      const response = await fetch(destino, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      const result = await response.text();

      return new Response(result, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Cualquier otro método
    return new Response("Método no permitido", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
