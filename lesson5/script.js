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
        basketCost:0,
    },
    mounted() {
        this.loadData();
        document.body.addEventListener('click', (el) => {
            let itemId = el.target.dataset.id;
            this.addToBasket(itemId)
        })
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
        FilterGoods() {
            if (this.searchLine.length === 0) {
                this.filteredGoods = this.goods;
                return
            }
            const regx = new RegExp(this.searchLine.toLowerCase());
            this.filteredGoods = this.goods.filter((good) => regx.test(good.product_name.toLowerCase()));
            
        },
        addToBasket(id) {

            this.filteredGoods.forEach(element => {
                if (element.id_product == id) {
                    this.basketCost += element.price;
                    this.basketItems.push({product_name: element.product_name, price: element.price})
                }
                
            });
        }
        
    },
});
