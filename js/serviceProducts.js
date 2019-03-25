//слайдер с перемоткой
var imgStore = ['img/slider/1.jpg', 'img/slider/2.jpg', 'img/slider/3.jpg', 'img/slider/4.jpg', 'img/slider/5.jpg', 'img/slider/6.jpg'];

var img = document.querySelector('.img1');
img.setAttribute('src', imgStore[0]);
img.setAttribute('data-index', 0);

document.querySelector('.btn_right').addEventListener('click', function () {//Кнопка "Вперед"
    var index = Number(img.getAttribute('data-index'));

    if (index == imgStore.length - 1) {
        index = -1;
    }
    img.setAttribute('src', imgStore[++index]);
    img.setAttribute('data-index', index++);
});

document.querySelector('.btn_left').addEventListener('click', function () {//Кнопка "Назад"
    index = Number(img.getAttribute('data-index'));

    if (index == 0) {
        index = imgStore.length;
    }
    img.setAttribute('src', imgStore[--index]);
    img.setAttribute('data-index', index--);
});
//слайдер с перемоткой

//витрина
class ServiceProducts {
    constructor(containerProducts, containerCounter, productsCatalog) {
        this.container = document.querySelector(containerProducts);
        this.containerCounter = document.querySelector(containerCounter);
        this.productsCatalog = productsCatalog;
        this.create();
    }
    create() {
        var wrapper = document.createElement('slot');

        var products = serviceStore.getProducts();
        this.containerCounter.innerText = products.length;

        for (var i = 0; i < this.productsCatalog.length; i++) {

            var index = products.indexOf(this.productsCatalog[i].id);
            if (index === -1) {
                var activeClass = '';
                var activeText = 'Добавить в корзину';
            } else {
                var activeClass = ' btn-active';
                var activeText = 'Удалить из корзины';
            }

            var item = this.getElement({ tagName: 'div', className: 'item' });
            var name = this.getElement({ tagName: 'div', className: 'name', innerText: this.productsCatalog[i].name });
            var img = this.getElement({ tagName: 'div', className: 'img', backgroundImage: `url(${this.productsCatalog[i].img})` });
            var price = this.getElement({ tagName: 'div', className: 'price', innerText: this.productsCatalog[i].price.toLocaleString() + ' USD' });
            var btn = this.getElement({ tagName: 'button', className: 'btn' + activeClass, innerText: activeText, id: this.productsCatalog[i].id });

            btn.addEventListener('click', function () {
                var id = this.getAttribute('data-id');
                var result = serviceStore.putProduct(id);

                serviceProducts.containerCounter.innerText = result.products.length;

                if (result.pushProduct) {
                    this.classList.add('btn-active');
                    this.innerText = 'Удалить из корзины';
                } else {
                    this.classList.remove('btn-active');
                    this.innerText = 'Добавить в корзину';
                }
            });

            item.appendChild(name);
            item.appendChild(img);
            item.appendChild(price);
            item.appendChild(btn);
            wrapper.appendChild(item);
        }
        this.container.appendChild(wrapper);
    }

    getElement(options) {
        var element = document.createElement(options.tagName);
        if ('className' in options) {
            element.setAttribute('class', options.className);
        }
        if ('innerText' in options) {
            element.innerText = options.innerText;
        }
        if ('backgroundImage' in options) {
            element.style.backgroundImage = options.backgroundImage;
        }
        if ('id' in options) {
            element.setAttribute('data-id', options.id);
        }
        return element;
    }
}

var serviceProducts = new ServiceProducts('.container-products', '.container_counter', productsCatalog);
//витрина