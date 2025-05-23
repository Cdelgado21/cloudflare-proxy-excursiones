export default {
  async fetch(request) {
    const urlDestino = "https://script.google.com/macros/s/AKfycbxghvot-BAWzvkt1JzGM7Qg55nS0zmm-q-Iv40EE4rXuUO9hWsae65o9voePx1k1PYIY4g/exec";

    if (request.method === "POST") {
      const cuerpo = await request.text();
      const json = JSON.parse(cuerpo);

      // Asegurarse que el tipo sea "nuevo_tour"
      if (json.tipo === "nuevo_tour") {
        return fetch(urlDestino, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(json)
        });
      } else {
        return new Response(JSON.stringify({
          success: false,
          error: "Tipo de solicitud no permitido"
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    return new Response("Método no permitido", { status: 405 });
  }
}

