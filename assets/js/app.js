// Темная тема
document.getElementById('themeToggle').addEventListener('click', function() {
  let body = document.body;
  let navbar = document.querySelector('.navbar');
  let header = document.querySelector('header');
  let navLinks = document.querySelectorAll('.nav-link');
  let navbarBrandIcon = document.querySelector('.navbar-brand i');
  let themeToggle = document.getElementById('themeToggle');
  let cardBodies = document.querySelectorAll('.card-body');
  let imgTheme = document.querySelectorAll('.img-theme');
  let themeIcon = document.getElementById('themeIcon');
  body.classList.toggle('dark-theme');
  navbar.classList.toggle('dark-theme-navbar');
  header.classList.toggle('dark-theme-header');
  navLinks.forEach(navLink => navLink.classList.toggle('dark-theme-text'));
  navbarBrandIcon.classList.toggle('dark-theme-icon');
  themeToggle.classList.toggle('dark-theme-button');
  imgTheme.forEach(img => img.classList.toggle('img-theme-dark'));
  cardBodies.forEach(cardBody => cardBody.classList.toggle('card-body-theme'));
  if (body.classList.contains('dark-theme')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
  } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
  }
});


// Цвет фона
document.getElementById('colorPicker').addEventListener('input', function() {
  document.body.style.backgroundColor = this.value;
});


// Vue.js
const app = Vue.createApp({
    data() {
      return {
        products: [],
        filteredProducts: [],
        minPrice: 0,
        maxPrice: 1000,
        searchQuery: '',
        sort: 'none'
      }
    },
    created() {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          this.products = data;
          this.filteredProducts = [...this.products];
        })
        .catch(error => console.error(error));
    },
    watch: {
      minPrice() {
        console.log("Min price changed to: ", this.minPrice);
        this.filterAndSortProducts();
      },
      maxPrice() {
        console.log("Max price changed to: ", this.maxPrice);
        this.filterAndSortProducts();
      },
      searchQuery() {
        console.log("Search query changed to: ", this.searchQuery);
        this.filterAndSortProducts();
      },
      sort() {
        console.log("Sort option changed to: ", this.sort);
        if (this.sort === 'none') {
          this.resetFilters();
        } else {
          this.filterAndSortProducts();
        }
      }
    },
    methods: {
      resetFilters() {
        this.searchQuery = '';
        this.minPrice = 0;
        this.maxPrice = 1000;
        this.filteredProducts = [...this.products];
      },
      filterAndSortProducts() {
        console.log("Filtering and sorting products...");
  
        let filtered = this.products.filter(product =>
          product.price >= this.minPrice &&
          product.price <= this.maxPrice &&
          (product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
  
        let sorted;
        if (this.sort === 'asc') {
          sorted = [...filtered].sort((a, b) => a.price - b.price);
        } else if (this.sort === 'desc') {
          sorted = [...filtered].sort((a, b) => b.price - a.price);
        } else {
          sorted = [...filtered];
        }
  
        this.filteredProducts = sorted;
        console.log("Filtered and sorted products: ", this.filteredProducts);
      }
    }    
  });
  
  app.mount('#app');
  
  
  
  
  
  


  


// JAVASCRIPT (OLD VERSION)

// // R.1
// document.addEventListener('DOMContentLoaded', (event) => {
//   // Апишка
//   fetch('https://fakestoreapi.com/products')
//       .then(res => res.json())
//       .then(data => {
//           let products = data; // Сейв
//           let filteredProducts = [...products]; // Фильтр

//           // Вывод
//           function displayProducts(products) {
//               let productContainer = document.getElementById('productContainer');
//               productContainer.innerHTML = '';
          
//               products.forEach(product => {
//                   let productCard = `
//                       <div class="col-lg-3 col-md-6 mb-4">
//                           <div class="card shadow h-100">
//                               <img src="${product.image}" class="card-img-top" alt="${product.title}">
//                               <div class="card-body">
//                                   <h5 class="card-title">${product.title}</h5>
//                                   <p class="card-text">${product.description}</p>
//                                   <p class="card-text"><small class="text">$ ${product.price}</small></p>
//                               </div>
//                           </div>
//                       </div>
//                   `;
//                   productContainer.insertAdjacentHTML('beforeend', productCard);
//               });
//           }

//           // Функция фильтрации товаров по цене
//           function filterProductsByPrice(minPrice, maxPrice) {
//               filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
//               displayProducts(filteredProducts);
//           }

//           // Возрастание
//           function sortByPriceAsc() {
//               filteredProducts.sort((a, b) => a.price - b.price);
//               displayProducts(filteredProducts);
//               localStorage.setItem('sort', 'asc');
//           }

//           // Убывание
//           function sortByPriceDesc() {
//               filteredProducts.sort((a, b) => b.price - a.price);
//               displayProducts(filteredProducts);
//               localStorage.setItem('sort', 'desc');
//           }

//           // Все товары
//           function showAllProducts() {
//               filteredProducts = [...products];
//               displayProducts(filteredProducts);
//               localStorage.setItem('sort', 'none');
//               document.getElementById('searchInput').value = '';
//               localStorage.removeItem('searchQuery');
//           }

//           // Поиск
//           function searchProducts(query) {
//               filteredProducts = products.filter(product =>
//                   product.title.toLowerCase().includes(query.toLowerCase()) ||
//                   product.description.toLowerCase().includes(query.toLowerCase())
//               );

//               // Сохр после поиска
//               if (localStorage.getItem('sort') === 'asc') {
//                   sortByPriceAsc();
//               } else if (localStorage.getItem('sort') === 'desc') {
//                   sortByPriceDesc();
//               } else {
//                   displayProducts(filteredProducts);
//               }
//               localStorage.setItem('searchQuery', query);
//           }

//           document.getElementById('sortButtonNone').addEventListener('change', showAllProducts);
//           document.getElementById('sortButtonAsc').addEventListener('change', sortByPriceAsc);
//           document.getElementById('sortButtonDesc').addEventListener('change', sortByPriceDesc);
//           document.getElementById('searchInput').addEventListener('input', (e) => searchProducts(e.target.value));

//           // Ползунки цен
//           let lowerSlider = document.querySelector('#lower');
//           let upperSlider = document.querySelector('#upper');
//           let lowerValue = document.querySelector('#lower-value');
//           let upperValue = document.querySelector('#upper-value');

//           lowerSlider.oninput = function() {
//               upperSlider.value = Math.max(upperSlider.value, lowerSlider.value);
//               filterProductsByPrice(lowerSlider.value, upperSlider.value);
//               lowerValue.textContent = "$" + lowerSlider.value;
//           };

//           upperSlider.oninput = function() {
//               lowerSlider.value = Math.min(upperSlider.value, lowerSlider.value);
//               filterProductsByPrice(lowerSlider.value, upperSlider.value);
//               upperValue.textContent = "$" + upperSlider.value;
//           };

//           // Загрузка
//           if (localStorage.getItem('sort') === 'asc') {
//               document.getElementById('sortButtonAsc').checked = true;
//               sortByPriceAsc();
//           } else if (localStorage.getItem('sort') === 'desc') {
//               document.getElementById('sortButtonDesc').checked = true;
//               sortByPriceDesc();
//           } else {
//               document.getElementById('sortButtonNone').checked = true;
//               showAllProducts();
//           }
//           if (localStorage.getItem('searchQuery')) {
//               document.getElementById('searchInput').value = localStorage.getItem('searchQuery');
//               searchProducts(localStorage.getItem('searchQuery'));
//           } else {
//               displayProducts(products);
//           }
//       })
//       .catch(error => console.error(error));
// });
