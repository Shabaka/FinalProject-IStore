class ServiceCart {
    constructor(containerCounter, containerCart, productsCatalog) {
        this.containerCounter = document.querySelector(containerCounter);
        this.containerCart = document.querySelector(containerCart);
        this.productsCatalog = productsCatalog;
        this.newMethod();
    }
    newMethod() {
        this.create();
    }

    create() {
        this.containerCounter.addEventListener('click', function() {
            serviceCart.containerCart.style.display = 'flex';
            var productsCart = serviceCart.getProductsCart();
            var wrapper = document.createElement('slot');

            for (var i=0; i<productsCart.length; i++) {
                var item = serviceCreateElement.getElement({ tagName: 'div', className: 'item' });
                var name = serviceCreateElement.getElement({ tagName: 'div', className: 'name', innerText: productsCart[i].name });
                var img = serviceCreateElement.getElement({ tagName: 'div', className: 'img', backgroundImage: `url(${productsCart[i].img})` });
                var price = serviceCreateElement.getElement({ tagName: 'div', className: 'price', innerText: productsCart[i].price.toLocaleString() + ' ₽' });

                item.appendChild(name);
                item.appendChild(img);
                item.appendChild(price);
                wrapper.appendChild(item);
            }

            var close = serviceCreateElement.getElement({ tagName: 'div', className: 'cart-close'});
            close.addEventListener('click', function () {
                serviceCart.containerCart.innerHTML = '';
                serviceCart.containerCart.style.display = 'none';
            });

            serviceCart.containerCart.appendChild(wrapper);
            serviceCart.containerCart.appendChild(close);
        });
    }
    getProductsCart() {
        var products = serviceStore.getProducts();
        var productsCart = [];
        for (var i = 0; i < this.productsCatalog.length; i++) {
            if (products.indexOf(this.productsCatalog[i].id) !== -1) {
                productsCart.push(this.productsCatalog[i]);
            }
        }
        return productsCart;
    }
}
var serviceCart = new ServiceCart('.container_counter', '.container-cart', productsCatalog);

// class ServiceCart {
//     constructor(containerCounter, containerCart, productsCatalog) {
//         this.containerCounter = document.querySelector(containerCounter);
//         this.containerCart = document.querySelector(containerCart);
//         this.productsCatalog = productsCatalog;
//         this.create();
//     }
//     create() {

//         this.containerCounter.addEventListener('click', function () {
//             serviceCart.containerCart.style.display = 'flex';
//             var productsCart = serviceCart.getProductsCart();
//             var wrapper = document.createElement('slot');

//             for (var i = 0; i < productsCart.length; i++) {

//                 var item = serviceCreateElement.getElement({ tagName: 'div', className: 'item' });
//                 var name = serviceCreateElement.getElement({ tagName: 'div', className: 'name', innerText: productsCart[i].name });
//                 var img = serviceCreateElement.getElement({ tagName: 'div', className: 'img', backgroundImage: `url(${productsCart[i].img})` });
//                 var price = serviceCreateElement.getElement({ tagName: 'div', className: 'price', innerText: productsCart[i].price.toLocaleString() + ' USD' });

//                 item.appendChild(name);
//                 item.appendChild(img);
//                 item.appendChild(price);
//                 wrapper.appendChild(item);
//             }
//             var close = serviceCreateElement.getElement({ tagName: 'div', className: 'cart-close' });

//             close.addEventListener('click', function () {
//                 serviceCart.containerCart.innerHTML = '';
//                 serviceCart.containerCart.style.display = 'none';
//             });

//             serviceCart.containerCart.appendChild(wrapper);
//             serviceCart.containerCart.appendChild(close);
//         });
//     }
//     getProductsCart() {
//         var products = serviceStore.getProducts();
//         var productsCart = [];
//         for (var i = 0; i < this.productsCatalog.length; i++) {
//             if (products.indexOf(this.productsCatalog[i].id) !== -1) {
//                 productsCart.push(this.productsCatalog[i]);
//             }
//         }
//         return productsCart;
//     }
// }

// var serviceCart = new ServiceCart('.container_counter', '.container-cart', productsCatalog);