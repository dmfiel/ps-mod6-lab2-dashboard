import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
  retryPromise,
  Product,
  Review,
  Report
} from './apiSimulator';

const MAX_RETRIES: number = 3;
const RETRY_DELAY: number = 1000;

function runFetchReport() {
  retryPromise(fetchProductCatalog, MAX_RETRIES, RETRY_DELAY)
    .then(products => {
      console.log(products);
      (products as Product[]).forEach((product, index) => {
        retryPromise(
          () => fetchProductReviews(product.id),
          MAX_RETRIES,
          RETRY_DELAY
        )
          .then(reviews => console.log(reviews))
          .catch(err => console.error(err))
          .finally(() => {
            if (index === products.length - 1) {
              retryPromise(fetchSalesReport, MAX_RETRIES, RETRY_DELAY)
                .then(report => console.log(report))
                .catch(err => console.error(err));
            }
          });
      });
    })
    .catch(err => console.error(err))
    .finally(() => console.log('All API calls have been attempted - .then'));
}

async function runFetchReportAsync() {
  try {
    const products: Product[] = await retryPromise(
      fetchProductCatalog,
      MAX_RETRIES,
      RETRY_DELAY
    );
    console.log(products);

    for (const product of products) {
      const reviews: Review[] = await retryPromise(
        () => fetchProductReviews(product.id),
        MAX_RETRIES,
        RETRY_DELAY
      );
      console.log(reviews);
    }

    const report: Report = await retryPromise(
      fetchSalesReport,
      MAX_RETRIES,
      RETRY_DELAY
    );
    console.log(report);

    console.log('All API calls have been attempted - async');
  } catch (err) {
    console.error(err);
  }
}

async function runFetchProductReviews(product: Product) {}

const USE_ASYNC = false;
if (!USE_ASYNC) {
  console.log('Start .then');
  runFetchReport();
  console.log('End .then');
} else {
  console.log('Start async');
  runFetchReportAsync();
  console.log('End async');
}
