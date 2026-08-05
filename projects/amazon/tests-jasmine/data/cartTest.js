import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  //it('adds an existing product to the cart', () => {

  //});

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    document.body.innerHTML = `
      <select class="js-quantity-selector-${productId}">
        <option value="1" selected>1</option>
      </select>
    `;
    
    addToCart(productId);
    expect(cart.length).toEqual(1);
  });
});