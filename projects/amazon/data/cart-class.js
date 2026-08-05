class Cart {
  items;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.items = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.items) {
      this.items =
        [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.items));
  }

  addToCart(productId) {
    //check if the item already figures in the cart
    let matchingItem;
    this.items.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })

    //quantity selector
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)

    //add quantity
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.items.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.items.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.items = newCart;

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.items.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  calculateCartQuantity() {
    //calculate number of items in the cart
    let cartQuantity = 0;
    this.items.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.items.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);