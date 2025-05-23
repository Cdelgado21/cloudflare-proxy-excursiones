export default {
  async fetch(request) {
    const urlDestino = "https://script.google.com/macros/s/AKfycbxghvot-BAWzvkt1JzGM7Qg55nS0zmm-q-Iv40EE4rXuUO9hWsae65o9voePx1k1PYIY4g/exec";

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

    if (request.method === "POST") {
      try {
        const cuerpo = await request.text();
        const json = JSON.parse(cuerpo);

        const respuesta = await fetch(urlDestino, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(json)
        });

        const texto = await respuesta.text();

        // Devolver la respuesta como texto crudo (sin JSON.parse)
        return new Response(texto, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        });

      } catch (err) {
        return new Response("❌ Error interno en el Worker: " + err.message, {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain"
          }
        });
      }
    }

    return new Response("Método no permitido", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}


