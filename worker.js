export default {
  async fetch(request) {
    const urlDestino = "https://script.google.com/macros/s/AKfycbxghvot-BAWzvkt1JzGM7Qg55nS0zmm-q-Iv40EE4rXuUO9hWsae65o9voePx1k1PYIY4g/exec";

    // Manejo del preflight (OPTIONS)
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

    // Manejo del POST
    if (request.method === "POST") {
      try {
        const cuerpo = await request.text();
        const json = JSON.parse(cuerpo);

        if (json.tipo === "nuevo_tour") {
          const respuesta = await fetch(urlDestino, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json)
          });

          let contenido = await respuesta.text();
          try {
            contenido = JSON.parse(contenido);
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

        return new Response(JSON.stringify({ success: false, error: "Tipo no permitido" }), {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" }
        });
      } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
          status: 500,
          headers: { "Access-Control-Allow-Origin": "*" }
        });
      }
    }

    // Cualquier otro método que no sea POST u OPTIONS
    return new Response("Método no permitido", {
      status: 405,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
};

