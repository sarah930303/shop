// 初始化購物車
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 更新購物車列表和總價格
function updateCart() {
  const cartList = document.getElementById('cart-list');
  const totalPrice = document.getElementById('total-price');

  // 清空先前的內容
  cartList.innerHTML = '';

  let total = 0;

  // 顯示每個商品
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.product} x${item.quantity} - $${item.price * item.quantity}`;

    // 添加移除按鈕
    const removeButton = document.createElement('button');
    removeButton.textContent = '移除';
    removeButton.onclick = () => removeFromCart(index);
    listItem.appendChild(removeButton);

    cartList.appendChild(listItem);

    total += item.price * item.quantity;
  });

  // 更新總價格
  totalPrice.textContent = total.toFixed(2);

  // 將購物車存入localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 新增商品到購物車
function addToCart() {
  const productSelect = document.getElementById('product');
  const quantityInput = document.getElementById('quantity');
  const selectedOption = productSelect.options[productSelect.selectedIndex];
  
  const productAndPrice = selectedOption.value.split('-');
  const product = productAndPrice[0];
  const price = parseFloat(productAndPrice[1]);
  const quantity = parseInt(quantityInput.value);

  if (product && !isNaN(price) && price > 0 && !isNaN(quantity) && quantity > 0) {
    cart.push({ product, price, quantity });
    updateCart();
  } else {
    alert('請選擇有效的商品和數量！');
  }
}

// 從購物車中移除商品
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// 新增確認購買函數
function confirmPurchase() {
  let confirmationMessage = '你已完成購買\n\n購買清單：\n';

  // 將購物車內容添加到確認購買的訊息中
  cart.forEach(item => {
    confirmationMessage += `${item.product} x${item.quantity} - $${item.price * item.quantity}` + String.fromCharCode(10);
  });

  alert(confirmationMessage);

  // 清空購物車
  cart = [];
  updateCart();
}
// 初始化頁面
updateCart();
