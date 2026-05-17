// ==========================
// 1.2.3 Створення об'єкта car1 через new Object()
// ==========================

var car1 = new Object();

car1.color = "red";
car1.maxSpeed = 180;

car1.driver = {
    name: "Faїk Andrii Mykolaiovych",
    category: "C",
    personalLimitations: "No driving at night"
};

car1.tuning = true;
car1.numberOfAccidents = 0;


// ==========================
// 1.2.5 Метод drive для car1
// ==========================

car1.drive = function () {
    console.log("I am not driving at night");
};

// Демонстрація роботи
car1.drive();


// ==========================
// 1.2.4 Створення об'єкта car2 через літерал
// ==========================

var car2 = {
    color: "blue",
    maxSpeed: 200,

    driver: {
        name: "Faїk Andrii Mykolaiovych",
        category: "B",
        personalLimitations: null
    },

    tuning: false,
    numberOfAccidents: 2
};


// ==========================
// 1.2.6 Метод drive для car2
// ==========================

car2.drive = function () {
    console.log("I can drive anytime");
};

// Демонстрація роботи
car2.drive();


// ==========================
// 1.2.7 Конструктор Truck
// ==========================

function Truck(color, weight, avgSpeed, brand, model) {

    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    // ==========================
    // 1.2.9 Метод trip
    // ==========================

    this.trip = function () {

        if (!this.driver) {
            console.log("No driver assigned");
        }
        else {

            var message = "Driver " + this.driver.name + " ";

            if (this.driver.nightDriving) {
                message += "drives at night ";
            }
            else {
                message += "does not drive at night ";
            }

            message += "and has " + this.driver.experience + " years of experience";

            console.log(message);
        }
    };
}


// ==========================
// 1.2.8 Метод AssignDriver через prototype
// ==========================

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {

    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};


// ==========================
// 1.2.10 Створення об'єктів Truck
// ==========================

// Перший truck
var truck1 = new Truck(
    "white",
    5000,
    75.5,
    "Volvo",
    "FH16"
);

// Другий truck
var truck2 = new Truck(
    "black",
    4500,
    68.3,
    "MAN",
    "TGX"
);


// Додаємо водіїв
truck1.AssignDriver(
    "Faїk Andrii Mykolaiovych",
    true,
    10
);

truck2.AssignDriver(
    "Faїk Andrii Mykolaiovych",
    false,
    5
);


// Демонстрація роботи trip()
truck1.trip();
truck2.trip();

// ======================================================
// 1.2.12 - 1.2.15
// Клас Square
// ======================================================

class Square {

    constructor(a) {
        this.a = a;
    }

    // Статичний метод
    static help() {
        console.log("Square is a quadrilateral with four equal sides and four right angles.");
    }

    // Периметр
    length() {
        let perimeter = this.a * 4;
        console.log("Perimeter of square: " + perimeter);
    }

    // Площа
    square() {
        let area = this.a * this.a;
        console.log("Area of square: " + area);
    }

    // Повна інформація
    info() {

        console.log("=== Square Info ===");

        console.log("Side 1: " + this.a);
        console.log("Side 2: " + this.a);
        console.log("Side 3: " + this.a);
        console.log("Side 4: " + this.a);

        console.log("Angle 1: 90");
        console.log("Angle 2: 90");
        console.log("Angle 3: 90");
        console.log("Angle 4: 90");

        console.log("Perimeter: " + (this.a * 4));
        console.log("Area: " + (this.a * this.a));
    }
}


// ======================================================
// Демонстрація Square
// ======================================================

Square.help();

let square1 = new Square(5);

square1.length();
square1.square();
square1.info();


// ======================================================
// 1.2.16 - 1.2.17
// Клас Rectangle
// ======================================================

class Rectangle extends Square {

    constructor(a, b) {
        super(a);

        this.b = b;
    }

    static help() {
        console.log("Rectangle is a quadrilateral with opposite sides equal and all angles equal to 90 degrees.");
    }

    length() {

        let perimeter = 2 * (this.a + this.b);

        console.log("Perimeter of rectangle: " + perimeter);
    }

    square() {

        let area = this.a * this.b;

        console.log("Area of rectangle: " + area);
    }

    info() {

        console.log("=== Rectangle Info ===");

        console.log("Side 1: " + this.a);
        console.log("Side 2: " + this.b);
        console.log("Side 3: " + this.a);
        console.log("Side 4: " + this.b);

        console.log("Angle 1: 90");
        console.log("Angle 2: 90");
        console.log("Angle 3: 90");
        console.log("Angle 4: 90");

        console.log("Perimeter: " + (2 * (this.a + this.b)));
        console.log("Area: " + (this.a * this.b));
    }
}


// ======================================================
// Демонстрація Rectangle
// ======================================================

Rectangle.help();

let rectangle1 = new Rectangle(6, 4);

rectangle1.length();
rectangle1.square();
rectangle1.info();


// ======================================================
// 1.2.18 - 1.2.19
// Клас Rhombus
// ======================================================

class Rhombus extends Square {

    constructor(a, alpha, beta) {

        super(a);

        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Rhombus is a quadrilateral with all sides equal.");
    }

    length() {

        let perimeter = this.a * 4;

        console.log("Perimeter of rhombus: " + perimeter);
    }

    square() {

        let area = this.a * this.a * Math.sin(this.beta * Math.PI / 180);

        console.log("Area of rhombus: " + area);
    }

    info() {

        console.log("=== Rhombus Info ===");

        console.log("Side 1: " + this.a);
        console.log("Side 2: " + this.a);
        console.log("Side 3: " + this.a);
        console.log("Side 4: " + this.a);

        console.log("Angle 1: " + this.alpha);
        console.log("Angle 2: " + this.beta);
        console.log("Angle 3: " + this.alpha);
        console.log("Angle 4: " + this.beta);

        console.log("Perimeter: " + (this.a * 4));

        let area = this.a * this.a * Math.sin(this.beta * Math.PI / 180);

        console.log("Area: " + area);
    }
}


// ======================================================
// Демонстрація Rhombus
// ======================================================

Rhombus.help();

let rhombus1 = new Rhombus(5, 120, 60);

rhombus1.length();
rhombus1.square();
rhombus1.info();


// ======================================================
// 1.2.20 - 1.2.21
// Клас Parallelogram
// ======================================================

class Parallelogram extends Rectangle {

    constructor(a, b, alpha, beta) {

        super(a, b);

        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Parallelogram is a quadrilateral with opposite sides parallel.");
    }

    length() {

        let perimeter = 2 * (this.a + this.b);

        console.log("Perimeter of parallelogram: " + perimeter);
    }

    square() {

        let area = this.a * this.b * Math.sin(this.beta * Math.PI / 180);

        console.log("Area of parallelogram: " + area);
    }

    info() {

        console.log("=== Parallelogram Info ===");

        console.log("Side 1: " + this.a);
        console.log("Side 2: " + this.b);
        console.log("Side 3: " + this.a);
        console.log("Side 4: " + this.b);

        console.log("Angle 1: " + this.alpha);
        console.log("Angle 2: " + this.beta);
        console.log("Angle 3: " + this.alpha);
        console.log("Angle 4: " + this.beta);

        console.log("Perimeter: " + (2 * (this.a + this.b)));

        let area = this.a * this.b * Math.sin(this.beta * Math.PI / 180);

        console.log("Area: " + area);
    }
}


// ======================================================
// Демонстрація Parallelogram
// ======================================================

Parallelogram.help();

let parallelogram1 = new Parallelogram(8, 5, 120, 60);

parallelogram1.length();
parallelogram1.square();
parallelogram1.info();

// ======================================================
// 1.2.22
// Getter та Setter для Rhombus
// (бо Parallelogram успадковується від Rectangle)
// ======================================================

class RhombusWithAccessors extends Square {

    constructor(a, alpha, beta) {

        super(a);

        this._alpha = alpha;
        this._beta = beta;
    }

    // Getter та Setter для a
    get side() {
        return this.a;
    }

    set side(value) {
        this.a = value;
    }

    // Getter та Setter для alpha
    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this._alpha = value;
    }

    // Getter та Setter для beta
    get beta() {
        return this._beta;
    }

    set beta(value) {
        this._beta = value;
    }
}


// ======================================================
// 1.2.23
// Виклик help для всіх класів
// ======================================================

console.log("=== HELP METHODS ===");

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();


// ======================================================
// 1.2.24
// Створення об'єктів та виклик info
// ======================================================

console.log("=== OBJECT INFO ===");

let sq = new Square(4);
sq.info();

let rect = new Rectangle(8, 3);
rect.info();

let rho = new Rhombus(6, 120, 60);
rho.info();

let para = new Parallelogram(10, 5, 120, 60);
para.info();


// ======================================================
// 1.2.25
// Функція Triangular
// ======================================================

function Triangular(a = 3, b = 4, c = 5) {

    return {
        a,
        b,
        c
    };
}


// ======================================================
// 1.2.26
// Створення 3 об'єктів через Triangular
// ======================================================

console.log("=== TRIANGLES ===");

let triangle1 = Triangular();
let triangle2 = Triangular(5, 5, 5);
let triangle3 = Triangular(7, 8, 9);

console.log(triangle1);
console.log(triangle2);
console.log(triangle3);


// ======================================================
// 1.2.27
// Функція PiMultiplier
// ======================================================

function PiMultiplier(number) {

    return function () {

        return Math.PI * number;
    };
}


// ======================================================
// 1.2.28
// Робота PiMultiplier
// ======================================================

console.log("=== PI MULTIPLIER ===");

let multiplyBy2 = PiMultiplier(2);

let multiplyByTwoThirds = PiMultiplier(2 / 3);

let divideBy2 = PiMultiplier(1 / 2);

console.log(multiplyBy2());

console.log(multiplyByTwoThirds());

console.log(divideBy2());


// ======================================================
// 1.2.29
// Функція Painter
// ======================================================

function Painter(color) {

    return function (obj) {

        if ("type" in obj) {

            console.log(color + " " + obj.type);
        }
        else {

            console.log("No 'type' property occurred!");
        }
    };
}


// ======================================================
// 1.2.30
// Створення PaintBlue, PaintRed, PaintYellow
// ======================================================

let PaintBlue = Painter("Blue");
let PaintRed = Painter("Red");
let PaintYellow = Painter("Yellow");


// ======================================================
// 1.2.31
// Тестові об'єкти
// ======================================================

let object1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

let object2 = {
    type: "Truck",
    avgSpeed: 90,
    loadCapacity: 2400
};

let object3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};


// ======================================================
// Демонстрація роботи Painter
// ======================================================

console.log("=== PAINTER ===");

// Object 1
PaintBlue(object1);
PaintRed(object1);
PaintYellow(object1);


// Object 2
PaintBlue(object2);
PaintRed(object2);
PaintYellow(object2);


// Object 3
PaintBlue(object3);
PaintRed(object3);
PaintYellow(object3);