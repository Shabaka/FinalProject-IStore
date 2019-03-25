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
    constructor(containerProducts, productsCatalog) {
        this.container = document.querySelector(containerProducts);
        this.productsCatalog = productsCatalog;
        this.create();
    }
    create() {
        var wrapper = document.createElement('slot');

        for (var i = 0; i < this.productsCatalog.length; i++) {

            var item = this.getElement({ tagName: 'div', className: 'item' });
            var name = this.getElement({ tagName: 'div', className: 'name', innerText: this.productsCatalog[i].name });
            var img = this.getElement({ tagName: 'div', className: 'img', backgroundImage: `url(${this.productsCatalog[i].img})` });
            var price = this.getElement({ tagName: 'div', className: 'price', innerText: this.productsCatalog[i].price.toLocaleString() + ' ₽' });
            var btn = this.getElement({ tagName: 'button', className: 'btn', innerText: 'Купить', id:this.productsCatalog[i].id });

            
            
            btn.addEventListener('click', function() {
                var id = this.getAttribute('data-id');
                var result = serviceStore.putProduct(id);
                if (result.pushProduct) {}
                    this.classList.add('btn-a')
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

    actions() {
        //
    }
}

var serviceProducts = new ServiceProducts('.container-products', productsCatalog);
//витрина