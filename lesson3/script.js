const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }

    add_to_basket() {
        
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.goods = data;
                this.render();
                this.get_total();
            })
            .catch((err) => {
                console.log(err.text);
            });
    }
    render() {
        let listHtml = "";
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document
            .querySelector(".goods-list")
            .insertAdjacentHTML("afterbegin", listHtml);
    }
    get_total() {
        let total = 0;
        this.goods.forEach((item) => (total += (+item.price)));
        document.querySelector("#basket_total_price").insertAdjacentHTML("beforeend", total);
    }
}


// Класс элемента корзины
class BasketItem {
    constructor(id_product, product_name, price) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="basket-item"><div class="basket-info"><h3>${this.product_name}</h3><p>${this.price}</p></div><button class='deleteItem' onclick='deleteItem(${this.id_product})'>&times;</button></div>`;
    }
}


class Basket {
    constructor() {
        this.cartGoods = [];
    }
    // Добавление товара в корзину (привязываем на нажатие кнопки)
    addToBasket(id) {
        let toBasket;
        list.goods.forEach(function(item) {
            if(id == item.id_product) {
                toBasket = {
                    id: item.id_product,
                    title: item.product_name,
                    price: item.price,
                }
            }
        });
        this.cartGoods.push(toBasket);
        console.log(this.cartGoods);
        this.basketCount();
        this.render();
    }

    // Удаление товара из корзины (привязываем на нажатие кнопки)
    deleteFromBasket(id) {
        let getIdElemen;
        this.cartGoods.forEach(function(item, i) {
            let thisId = item.id_product;
            if(id == thisId) {
                getIdElemen = i;
            }
            
        });
        this.cartGoods.splice(getIdElemen, 1);
        this.render();
        this.basketCount();
    }

    // Считаем стоимость товаров в корзине
    calcAllGoods() {
        let totalPrice = 0;
        this.cartGoods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        let totalGoodsAnswer = "Общая сумма товаров в корзине: $" + totalPrice;
        document.querySelector('#goods-total').innerHTML = '';
        document.querySelector('#goods-total').insertAdjacentHTML('beforeend', totalGoodsAnswer);
    }

    // Считаем количество товаров в корзине и выводим на кнопку
    basketCount() {
        let count = this.cartGoods.length;
        document.querySelector('#cartcoint').innerHTML = '';
        document.getElementById('cartcoint').insertAdjacentHTML('beforeend', `В корзине ${count} элементов`);
    }

    // Рендер динамического содержимого корзины
    render() {
        let readHtml = '';
        this.cartGoods.forEach((good) => {
            const goodItem = new BasketItem(good.id_product, good.product_name, good.price);
            readHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = readHtml;
        this.calcAllGoods();
    }
}

const list = new GoodsList();
list.fetchGoods()

document.getElementById('btn').onclick = function () {
    const one = new Basket();
    one.addToBasket(123);
    one.calcAllGoods();
}


