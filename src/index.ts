import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
  retryPromise,
  Product
} from './apiSimulator';

const maxRetries = 3;
const retryDelay = 1000;

function runFetchReport() {
  retryPromise(fetchProductCatalog, maxRetries, retryDelay)
    .then(products => {
      console.log(products);
      (products as Product[]).forEach((product, index) => {
        retryPromise(
          () => fetchProductReviews(product.id),
          maxRetries,
          retryDelay
        )
          .then(reviews => console.log(reviews))
          .catch(err => console.error(err))
          .finally(() => {
            if (index === products.length - 1) {
              retryPromise(fetchSalesReport, maxRetries, retryDelay)
                .then(report => console.log(report))
                .catch(err => console.error(err));
            }
          });
      });
    })
    .catch(err => console.error(err))
    .finally(() => console.log('All API calls have been attempted'));
}

runFetchReport();
