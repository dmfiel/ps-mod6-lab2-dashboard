export interface Product {
  id: number;
  name: string;
  price: number;
}
export interface Review {
  id: number;
  review: string;
}

export function fetchProductCatalog(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve([
          { id: 1, name: 'Laptop', price: 1200 },
          { id: 2, name: 'Headphones', price: 200 }
        ]);
      } else {
        reject('Failed to fetch product catalog');
      }
    }, 1000);
  });
}

export function fetchProductReviews(productId: number): Promise<Review[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve([
          { id: 1, review: 'This is great.' },
          { id: 2, review: 'It burned down my house.' }
        ]);
      } else {
        reject('Failed to fetch product reviews');
      }
    }, 1500);
  });
}
