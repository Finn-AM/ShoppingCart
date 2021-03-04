let url = 'data.json';
let shopContainer = document.querySelector('.shop-container');
let wrapper = document.querySelector('.wrapper');
let total = document.querySelector('.total-price');
let cart = document.querySelector('.cart-items');
const st = [];

window.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let items = data.items;
      let allData = items
        .map((item) => {
          const name = item.name;
          const price = item.price;
          const image = item.img;
          return `
        <div class="shop-item">
        <h1 class="shop-title">${name}</h1>
        <img class="shop-img" src="${image}" alt="">
        
        <h3 class="shop-price">price : $<span class="price-tag">${price} </span></h3>
        <input class="cart-input" placeholder="How much?" type="number" data-id="input"/>
        <button class="btn shop-btn" type="button" data-id="btn">ADD</button>
        </div>
        `;
        })
        .join('');
      dude(allData);
    })
    .catch((error) => console.log(error));
}

function dude(allData) {
  shopContainer.innerHTML = allData;
  wrapper.appendChild(shopContainer);
  const shops = wrapper.querySelectorAll('.shop-item');
  shops.forEach((shop) => {
    const btn = shop.querySelector('.btn');
    const input = shop.querySelector('.cart-input');
    const price = shop.querySelector('.price-tag').textContent;
    const title = shop.querySelector('.shop-title').textContent;
    const quan = input.value;

    input.addEventListener('change', () => {
      if (input.value < 0) {
        input.value = 0;
      }
    });

    btn.addEventListener('click', function () {
      dudung(btn, input, price, title);
    });
  });
}

function dudung(btn, input, price, title) {
  let fillCart = document.createElement('div');
  fillCart.innerHTML = `
        <div class="item-list">
          <h1>${title}</h1>
          <h3> quantity ${input.value}</h3>
          <h2 class="current-price">price: $<a class="a">${
            price * input.value
          }</a></h2>
          <button class="delete">❌</button>
        </div>`;
  let deleteBtn = fillCart.querySelector('.delete');
  let itemquantity = fillCart.querySelector('.itemquantity');
  let currentPrice = fillCart.querySelector('.current-price');
  deleteBtn.addEventListener('click', function (e) {
    // console.dir(this);
    this.parentElement.remove();
  });

  if (cart.textContent.includes(title) || input.value === '') {
    alert('Item has been already in cart or item quantity is 0');
  } else {
    cart.appendChild(fillCart);
  }

  let x = Array.from(cart.querySelectorAll('.a'));
  let s = x.map((a) => parseFloat(a.innerText)).reduce((a, b) => a + b);
  console.log(s);
  total.innerText = s;
}
