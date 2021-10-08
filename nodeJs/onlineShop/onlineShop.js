// This class creates product-like objects with basic properties and methods that can return attributes of those properties
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }
}

// This class creates order objects that can contain product objects, display and format their poperties's attributes via methods
class Order {
    constructor(nr, date) {
        this.nr = nr;
        this.date = date;
        this.products = [];
    }

    addProducts(products) {
        this.products = this.products.concat(products);
    }

    getTotal() {
        let total = 0;
        for (let i = 0; i < this.products.length; i++) {
            total += this.products[i].getPrice();
        }
        return total.toFixed(2);
    }

    getDate() {
        const day = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    // This methods returns all information on all product objects stored in order object
    getInfo() {
        let output = `Order nr: ${this.nr} \nDate: ${this.getDate()} \nProducts:\n`;

        for (let i = 0; i < this.products.length; i++) {
            output += `${i + 1}. ${this.products[i].getName()}: $${this.products[i].getPrice()}\n`;
        }

        output += `Final price: $${this.getTotal()}`;

        return output;
    }
}

const book = new Product("Władca Pierścieni", 49.99);
const ebook = new Product("Harry Potter - E-book", 40);
const ksiazeczka = new Product("Poradnik Techniczny Kierownika Budowy", 200);

const order1 = new Order("1", new Date("2021-08-26"));
order1.addProducts([book, ebook, ksiazeczka]);

console.log(order1.getInfo());
