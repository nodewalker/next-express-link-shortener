export const fetchApi = async (url: string, init?: RequestInit) => {
  return (await fetch(`http://localhost:5000${url}`, init)).json();
};

export const fetchApiWithAuth = async (url: string, init?: RequestInit) => {
  let access_token = localStorage.getItem("access_token");
  const res = await (
    await fetch(`http://localhost:5000${url}`, {
      ...init,
      headers: { Authorization: `Bearer ${access_token}` },
    })
  ).json();

  if (res.status === 401) {
    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      const refresh = await (
        await fetch(`http://localhost:5000/auth/refresh`, {
          method: "POST",
          body: JSON.stringify({ token: refresh_token }),
        })
      ).json();
      if (refresh.msg === "success") {
        localStorage.setItem("access_token", refresh.data.access_token);
        localStorage.setItem("refresh_token", refresh.data.refresh_token);
      }
    }
  }
  access_token = localStorage.getItem("access_token");
  return await (
    await fetch(`http://localhost:5000${url}`, {
      ...init,
      headers: { Authorization: `Bearer ${access_token}` },
    })
  ).json();
};
