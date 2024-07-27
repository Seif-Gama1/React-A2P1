// id: item.id,
// title: item.title,
// image: item.images[0],
// price: item.price,
// stock: item.stock,
// quantity:

export default class cartItem{
    // title;
    // id;
    // image;
    // price;
    // stock;
    // quantity;
    // total;
    constructor(title,id,image,price,stock,quantity = 1){
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.quantity = quantity;
    }
    increase = function(){
        if(this.quantity < this.stock){
            this.quantity++;
        }
    }
    decrease = function(){
        if(this.quantity > 1){
            this.quantity--;
        }
    }

    renderElement = function () {
        return ` <div class="card card-dark mb-3">
                    <div class="row align-items-center no-gutters">
                        <div class="col-md-4">
                            <button class="remove-btn" data-action="remove" id="${this.id}">&times;</button>
                            <img src=${this.image} class="card-img card-img-top" alt="Product Image">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${this.title}</h5>
                                <p class="card-text">Price: $<span id="price">${this.price}</span></p>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-dark-mode" type="button" data-action="decrease" id="${this.id}">-</button>
                                    </div>
                                    <input type="text" class="form-control text-center" id="quantity" value=${this.getQuantity()}>
                                    <div class="input-group-append">
                                        <button class="btn btn-dark-mode" type="button" data-action="increase" id="${this.id}">+</button>
                                    </div>
                                </div>
                                <p class="card-text">Total: $<span id="total">${this.getTotalPrice()}</span></p>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
    getQuantity = function(){
        return this.quantity;
    }
    getTotalPrice = function(){
        return (this.quantity) * (this.price);
    }

    static formToCartItemInstance = function ({
        id,
        title,
        image,
        price,
        stock,
        quantity,
      }) {
        return new cartItem(id, title, image, price, stock, quantity);
      };
}