export const fetchApi = async (url: string, init?: RequestInit) => {
  return (
    await fetch(`https://shortener.smirnov-portfolio.ru/api${url}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    })
  ).json();
};

export const fetchApiWithAuth = async (url: string, init?: RequestInit) => {
  let access_token = localStorage.getItem("access_token");
  let isRefreshSuccess = false;

  const res = await fetchApi(url, {
    ...init,
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (res.status === 401) {
    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      const refresh = await fetchApi(`/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({ token: refresh_token }),
      });
      if (refresh.msg === "success") {
        localStorage.setItem("access_token", refresh.data.access_token);
        localStorage.setItem("refresh_token", refresh.data.refresh_token);
        isRefreshSuccess = true;
      }
    }
  }
  if (isRefreshSuccess) {
    access_token = localStorage.getItem("access_token");
    return await fetchApi(url, {
      ...init,
      headers: { Authorization: `Bearer ${access_token}` },
    });
  }
  return res;
};
