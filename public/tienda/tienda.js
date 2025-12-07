/* ============================================================
   CLIENT ID (para carrito sin login)
============================================================ */
function getClientId() {
    let id = localStorage.getItem("clientId");
    if (!id) {
      id = "client_" + Date.now();
      localStorage.setItem("clientId", id);
    }
    return id;
  }
  
  /* ============================================================
     FETCH con clientId automático 
  ============================================================ */
  async function clientFetch(url, options = {}) {
    const clientId = getClientId();
  
    options.headers = {
      ...(options.headers || {}),
      "x-client-id": clientId,
      "Content-Type": "application/json"
    };
  
    return fetch(url, options);
  }
  