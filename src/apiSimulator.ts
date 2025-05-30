const chanceSuccess = 0.8;

export interface Product {
  id: number;
  name: string;
  price: number;
}
export interface Review {
  id: number;
  review: string;
}
export interface Report {
  totalSales: number;
  unitsSold: number;
  averagePrice: number;
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export class DataError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function fetchProductCatalog(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < chanceSuccess) {
        resolve([
          { id: 1, name: 'Laptop', price: 1200 },
          { id: 2, name: 'Headphones', price: 200 }
        ]);
      } else {
        reject(new NetworkError('Failed to fetch product catalog'));
      }
    }, 1000);
  });
}

export function fetchProductReviews(productId: number): Promise<Review[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < chanceSuccess) {
        resolve(
          [
            { id: 1, review: 'This is great.' },
            { id: 1, review: 'It burned down my house.' },
            { id: 2, review: 'Why did I buy this?' },
            { id: 2, review: 'It cleaned my house!' }
          ].filter(review => review.id === productId)
        );
      } else {
        reject(
          new NetworkError(
            `Failed to fetch reviews for product ID ${productId}`
          )
        );
      }
    }, 1500);
  });
}

export function fetchSalesReport(): Promise<Report> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < chanceSuccess) {
        resolve({ totalSales: 525.25, unitsSold: 5, averagePrice: 150 });
      } else {
        reject(new DataError(`Failed to fetch sales report`));
      }
    }, 1000);
  });
}

export function retryPromise(
  target: Function,
  retries: number,
  delay: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    target()
      .then((result: any) => resolve(result))
      .catch((error: Error) => {
        if (retries === 0) reject(error);
        else {
          console.log(
            `Retrying ${
              target.name ? target.name : 'fetchProductReviews'
            }: ${retries}`
          );
          setTimeout(
            () =>
              retryPromise(target, retries - 1, delay)
                .then((result: any) => resolve(result))
                .catch(error => reject(error)),
            delay
          );
        }
      });
  });
}
