function fetchProductCatalog() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (Math.random() < 0.8) {
                resolve([
                    { id: 1, name: 'Laptop', price: 1200 },
                    { id: 2, name: 'Headphones', price: 200 }
                ]);
            }
            else {
                reject('Failed to fetch product catalog');
            }
        }, 1000);
    });
}
function fetchProductReviews(productId) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (Math.random() < 0.8) {
                resolve([
                    { id: 1, name: 'Laptop', price: 1200 },
                    { id: 2, name: 'Headphones', price: 200 }
                ]);
            }
            else {
                reject('Failed to fetch product catalog');
            }
        }, 1500);
    });
}
fetchProductCatalog().then(function (products) { return console.log(products); });
