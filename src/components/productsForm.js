const productsForm = () => {
  return `
  <form name="productForm" class="productForm">
    <input type="text" name="productName" class="productName"/>
    <input type="file" class="productImage" name="image"/>
    <textarea cols="30" rows="10" name="productDescription" class="productDescription"></textarea>
    <input type="number" name="productPrice" class="productPrice"/>
    <button type="submit">Add product</button>
  </form>
  `
}

export default productsForm;
