import { fetchProductCatalog, fetchProductReviews } from './apiSimulator';

function runFetchReport() {
  try {
    fetchProductCatalog()
      .then(products => console.log(products))
      .catch(err => {
        throw new Error(err);
      });
    fetchProductReviews(1)
      .then(reviews => console.log(reviews))
      .catch(err => {
        throw new Error(err);
      });
  } catch (err) {
    console.error(err);
  }
}

console.log('start');
runFetchReport();
console.log('end');
