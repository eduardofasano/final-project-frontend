angular.module('finalProject')
  .factory('PriceHelper', PriceHelper);

function PriceHelper() {
  return {
    calculateCurrentPricePerUnit: (minPrice, maxPrice, totalQuantity, currentQuantity) => {
      return (((minPrice - maxPrice)/(totalQuantity - 0)) * currentQuantity) + maxPrice;
    }
  };
}
