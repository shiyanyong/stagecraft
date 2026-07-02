const ordersKey = "storefront-orders";

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function onRequestPost(context) {
  const payload = await context.request.text();
  await appendOrder(context.env.STAGECRAFT_DATA, payload);
  return json({ ok: true });
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const payload = url.searchParams.get("payload");
  if (payload) {
    await appendOrder(context.env.STAGECRAFT_DATA, decodeURIComponent(payload));
  }
  return json({ ok: true });
}

async function appendOrder(kv, payload) {
  if (!payload) return;
  const raw = await kv.get(ordersKey);
  const orders = parseOrders(raw);
  orders.push(payload);
  await kv.put(ordersKey, JSON.stringify(orders.slice(-100)));
}

function parseOrders(raw) {
  try {
    const orders = JSON.parse(raw ?? "[]");
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

function json(payload) {
  return new Response(JSON.stringify(payload), {
    headers: corsHeaders(),
  });
}

function corsHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
