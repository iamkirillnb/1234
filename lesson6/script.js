Vue.component('goods-cart', {
    props: {
        title: String,
        price: Number,
        id: Number
    },
    template: `
    <div class="goods-cart">
        <h3>{{ title }}</h3>
        <p>{{ price }}</p>
        <button :data-id='id' v-on:click='addItem'>купить</button>
    </div>`,
    data() {
        return {
            value: this.id,
        }
    },
    methods: {
        addItem() {
            app.addToBasket(this.value)
        }
    }
})

Vue.component('goods-list', {
    props: {
        list: Array,
    },
    template: `
    <div class="goods-list">
        <goods-cart 
            v-for="good in list" 
            v-bind:key="good.id_product"
            v-bind:id='good.id_product'
            v-bind:title='good.product_name'
            v-bind:price='good.price'>
        </goods-cart>
    </div>`
})


Vue.component('search', {
    template: `
    <div class="search">
    <input type='text' v-model='searchString' class='goods-search' />
    <button class="search-button" type="button" v-on:click='onClick'>Искать</button>
    </div>`,
    data() {
        return {
            searchString: ''
        }
    },
    methods: {
        onClick() {
            this.$emit('search', this.searchString)
        }
    }
});
Vue.component('basket', {
    props: {
        basket: Array
    },
    template: `
    <div class="card basket">
        <h5>В корзине: {{basket.length}} элементов</h5>
    </div>`
});

Vue.component('totalprice', {
    props: {
        total: Number
    },
    template: `
    <div class="total">
        <h5>Общая стоимость: {{total}}</h5>
    </div>`
});

const API_URL =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
// `${API_URL}/catalogData.json`

const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: "",
        basketItems: [],
        basketCost: 0,
    },
    mounted() {
        this.loadData();

    },
    methods: {
        loadData() {
            let url = `${API_URL}/catalogData.json`;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.goods = data;
                    this.filteredGoods = data;
                    console.log(this.filteredGoods)
                })
                .catch((err) => {
                    console.log(err.text);
                })
        },
        FilterGoods(searchString) {
            const regx = new RegExp(searchString, 'i');
            this.filteredGoods = this.goods.filter((good) => regx.test(good.product_name));

        },
        addToBasket(id) {
            this.filteredGoods.forEach(element => {
                if (element.id_product == id) {
                    this.basketCost += element.price;
                    this.basketItems.push({ product_name: element.product_name, price: element.price })
                }


            });
            console.log(this.basketCost)
        }

    },
});