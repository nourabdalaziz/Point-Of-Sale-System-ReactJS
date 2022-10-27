const useCUD = (url, method, body, id) => {
  switch (method) {
    case "DELETE": {
      const prom = fetch(url + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return prom;
    }

    case "POST": {
      const prom = fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
      });
      return prom;
    }

    case "PUT": {
      const prom = fetch(url + id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
      });
      return prom;
    }
  }
};
export default useCUD;
