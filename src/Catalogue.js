import pehlaKhatDetails from './PehlaKhatDetails.js';
import kaifiyatDetails from './KaifiyatDetails.js';

// Every collection sold on the site, keyed by the slug used in its URLs (/product/<slug>/<id>).
// Ids only need to be unique within a collection; `key` is unique across the whole catalogue
// and is what the cart and prices use to tell products apart.
export const collections = {
    'pehla-khat': pehlaKhatDetails,
    'kaifiyat': kaifiyatDetails,
};

export function productKey(collection, id) {
    return `${collection}-${id}`;
}

export const allProducts = Object.entries(collections).flatMap(([collection, products]) =>
    products.map((product) => ({ ...product, collection, key: productKey(collection, product.id) }))
);

export function findProduct(collection, id) {
    return allProducts.find((product) => product.collection === collection && product.id === Number(id));
}
