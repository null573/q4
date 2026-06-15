const API_ORIGIN = "https://q3-0knz.onrender.com";

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  if (!url.pathname.startsWith("/api/") && !url.pathname.startsWith("/auth/")) {
    return context.next();
  }

  const targetUrl = new URL(url.pathname + url.search, API_ORIGIN);
  const headers = new Headers(request.headers);
  headers.set("Host", new URL(API_ORIGIN).host);
  headers.set("X-Forwarded-Host", url.host);
  headers.set("X-Forwarded-Proto", url.protocol.replace(":", ""));

  return fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  });
}
