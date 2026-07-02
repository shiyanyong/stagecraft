export async function onRequestGet(context) {
  const payload =
    (await context.env.STAGECRAFT_DATA.get("storefront-products")) ??
    JSON.stringify({ products: [], syncedAt: null });

  return new Response(payload, {
    headers: corsHeaders(),
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
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
