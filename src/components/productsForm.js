const productsForm = () => {
  return `
  <form name="productForm" class="productForm">
    <input type="text" name="productName" class="productName"/>
    <select name="category" class="productCategory">
      <option value="food" selected="selected">Food</option>
      <option value="tools">Tools</option>
      <option value="toys">Toys</option>
      <option value="weapon">Weapon</option>
    </select>
    <input type="file" class="productImage" name="image"/>
    <textarea cols="30" rows="10" name="productDescription" class="productDescription"></textarea>
    <input type="number" name="productPrice" class="productPrice"/>
    <button type="submit" class="productFormButton button">Add product</button>
  </form>
  `
}

export default productsForm;
