export default {
  async fetch(request) {
    const urlDestino = "https://script.google.com/macros/s/AKfycbxghvot-BAWzvkt1JzGM7Qg55nS0zmm-q-Iv40EE4rXuUO9hWsae65o9voePx1k1PYIY4g/exec";

    // Respuesta para OPTIONS (preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
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
