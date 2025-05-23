export default {
  async fetch(request) {
    const urlDestino = "https://script.google.com/macros/s/AKfycbxMH5xvWVaBkkQx5WSEjtdaTA5L0ecFmdocL_57sGMimAQzls9J5QSE4AafJ14JXEjJ0g/exec"; // tu URL correcta de Apps Script

    // Permitir preflight (CORS)
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
      try {
        const body = await request.text();
        const json = JSON.parse(body);

        const respuesta = await fetch(urlDestino, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(json)
        });

        const texto = await respuesta.text();

        // Intentamos convertir a JSON la respuesta
        try {
          const data = JSON.parse(texto);
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          });
        } catch (err) {
          return new Response(JSON.stringify({
            success: false,
            error: "La respuesta del servidor no es JSON válido",
            raw: texto
          }), {
            status: 500,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          });
        }

      } catch (err) {
        return new Response(JSON.stringify({
          success: false,
          error: err.message
        }), {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        });
      }
    }

    return new Response("Método no permitido", {
      status: 405,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}
