'use strict';

class Graphic {
    constructor() { }

    move(x, y) {
        console.log('moving on', x, y)
    }

    draw() {
        console.log('drawing')
    }
}

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
        console.log('moving on', x, y)
    }

    draw() {
        console.log('drawing')
    }
}


class Circle extends Dot {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }

    draw() {
        console.log('drawing circle')
    }

}

class CompoundGraphic {
    children = [];

    add(graphic) {
        console.log("success added");
        this.children.push(graphic);
    }

    remove(graphic) {
        console.log(`${graphic} was deleted`);
    }

    move(x, y) {
        this.children.forEach(item => {
            item.x += x;
            item.y += y;
            console.log(`${item} was changed them position`);
        });

    }


}


class ImageEditor {
    all = [];

    get all() {
        return this.all[2];
    }

    // set all(value) {
    //     this.name = value;
    // }

    load() {
        this.all = new CompoundGraphic();
        console.log('all', this.all);
        this.all.add(new Dot(1, 2));
        this.all.add(new Circle(5, 3, 10));
        // console.log('ImageEditor-> load')
    }
    groupSelected(arrGraphics) {
        const group = new CompoundGraphic();
        arrGraphics.forEach(component => {
            group.add(component);
        });
        this.all.add(group)
    }
}
// console.log(CompoundGraphic);
// console.log(ImageEditor);
// ImageEditor.load;


// ImageEditor.load;
const newIE = new ImageEditor();

newIE.load();
newIE.groupSelected([new Circle(5, 5, 10), new Circle(2, 2, 4)]);
newIE.groupSelected([new Circle(5, 5, 10), new Circle(2, 2, 4)]);

console.log(newIE);
// console.log(newIE.all.load(new Circle(1, 1, 1)));
console.log(newIE.all);
newIE.groupSelected(newIE.all.children);
// newIE.load()
console.log(newIE);
