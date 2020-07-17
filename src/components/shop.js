import { getInfo } from './services';

export const shop = {
  productItems: [],
  currentCategory: 'all',
  currentPage: 'products',
  getUserProducts() {
    return this.productItems.filter(product => product.author === getInfo().id)
  }
}
