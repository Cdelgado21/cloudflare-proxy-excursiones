export default {
  async fetch(request) {
    const targetUrl = "https://script.google.com/macros/s/AKfycbxghvot-BAWzvktlJZGM7qg55ns0Zmm-q-Iv40EE4rXWUoQ3Wsae65o9voePxlkTPlY4g/exec"; // ← usa tu URL real

    if (request.method === "POST") {
      const body = await request.text();
      return fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
    } else {
      return new Response("Método no permitido", { status: 405 });
    }
  },
};
