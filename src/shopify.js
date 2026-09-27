const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = '2024-10';

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e) => e.message).join('; '));
  return json.data;
}

const CART_FIELDS = `
  id
  checkoutUrl
  cost { totalAmount { amount currencyCode } }
  lines(first: 50) {
    nodes {
      id
      quantity
      attributes { key value }
      merchandise {
        ... on ProductVariant {
          id
          price { amount currencyCode }
        }
      }
    }
  }
`;

export async function fetchVariantPrices(variantIds) {
  const ids = [...new Set(variantIds.filter(Boolean))];
  if (ids.length === 0) return {};
  const data = await shopifyFetch(
    `query VariantPrices($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on ProductVariant {
          id
          price { amount currencyCode }
        }
      }
    }`,
    { ids }
  );
  const prices = {};
  data.nodes.forEach((node) => {
    if (node) prices[node.id] = Number(node.price.amount);
  });
  return prices;
}

export async function createCart() {
  const data = await shopifyFetch(
    `mutation CartCreate {
      cartCreate {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }`
  );
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join('; '));
  }
  return data.cartCreate.cart;
}

export async function createCartWithLine(merchandiseId, quantity, attributes) {
  const data = await shopifyFetch(
    `mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }`,
    { lines: [{ merchandiseId, quantity, attributes }] }
  );
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join('; '));
  }
  return data.cartCreate.cart;
}

export async function fetchCart(cartId) {
  const data = await shopifyFetch(
    `query GetCart($id: ID!) {
      cart(id: $id) { ${CART_FIELDS} }
    }`,
    { id: cartId }
  );
  return data.cart;
}

export async function addCartLine(cartId, merchandiseId, quantity, attributes) {
  const data = await shopifyFetch(
    `mutation AddLine($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }`,
    { cartId, lines: [{ merchandiseId, quantity, attributes }] }
  );
  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join('; '));
  }
  return data.cartLinesAdd.cart;
}

export async function updateCartLine(cartId, lineId, updates) {
  const data = await shopifyFetch(
    `mutation UpdateLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }`,
    { cartId, lines: [{ id: lineId, ...updates }] }
  );
  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join('; '));
  }
  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(cartId, lineId) {
  const data = await shopifyFetch(
    `mutation RemoveLine($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }`,
    { cartId, lineIds: [lineId] }
  );
  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join('; '));
  }
  return data.cartLinesRemove.cart;
}
