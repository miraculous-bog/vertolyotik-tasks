'use strict';

const isArray = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

const isObject = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}


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
    getId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    constructor(x, y) {
        this.id = this.getId();
        this.type = 'dot';
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

    constructor(x, y, id, radius) {
        super(x, y, id);
        this.type = 'circle';
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

    getObj(id, type) {
        var paths = [];

        function findPath(branch, str, prevBranch = null) {
            Object.keys(branch).forEach(function (key) {
                if (isArray(branch[key]) || isObject(branch[key])) {
                    findPath(branch[key], str ? str + "." + key : key, branch);
                    // console.log(branch, key, branch[key]);
                }
                else {
                    // paths.push(str ? str + ' ' + branch.type + '_' + branch.id : key + ' ' + branch.type + ' ' + branch.id);
                    // console.log(branch);
                    if (branch.id === id && type === "element") { paths = branch; } else if (branch.id === id && type === "group") {
                        paths = prevBranch;
                    }
                    return;
                }
            });
        }

        findPath(this.all, "");
        return paths;
    }

}
// console.log(CompoundGraphic);
// console.log(ImageEditor);
// ImageEditor.load;


// ImageEditor.load;
const newIE = new ImageEditor();

newIE.load();
newIE.groupSelected([new Circle(5, 5, 10), new Circle(2, 2, 4)]);
newIE.groupSelected([]);
// newIE.groupSelected([new Circle(5, 5, 10), new Circle(2, 2, 4)]);

console.log(newIE);
// console.log(newIE.all.load(new Circle(1, 1, 1)));
// console.dir(newIE.all);
newIE.groupSelected(newIE.all.children);
// newIE.load()
console.dir(newIE);



function three(tr) {
    var paths = [];

    function findPath(branch, str) {
        Object.keys(branch).forEach(function (key) {
            if (isArray(branch[key]) || isObject(branch[key])) {
                findPath(branch[key], str ? str + "." + key : key);
                // console.log(branch, key, branch[key]);
            }
            else {
                paths.push(str ? str + ' ' + branch.type + '_' + branch.id : key + ' ' + branch.type + ' ' + branch.id);
                // console.log(branch);

            }
        });
    }

    findPath(tr, "");
    return paths;
}

const treeElemnts = three(newIE);


const getClearTree = (str) => {
    const newArr = str.map(item => {
        let index = 0;
        for (let i = item.length - 1; i < item.length; i--) {
            if (item[i] === '.') {
                index = i;
                break;
            }

        }
        // console.log(index);
        return item.slice(3);
    });
    const prepearedArr = [];
    // console.log(newArr);
    newArr.forEach(item => {
        if (item !== prepearedArr[prepearedArr.length - 1]) {
            prepearedArr.push(item);
        }
    })
    return prepearedArr;
};
// console.log(treeElemnts);
// getClearTree(treeElemnts);
const editedArrStr = getClearTree(treeElemnts);
// console.log(editedArrStr);

const getGraficTree = (arr) => {


    const findInterface = (str, index) => {
        // console.log(str, str[11])
        if (str[11] === ' ') {
            console.log(`${index}${str.split(" ")[1]}`);
        } else {
            console.log(`${index}group`);
            index += '+';
            findInterface(str.slice(11), index);
        }
    }


    for (let i = 0; i < arr.length; i++) {
        let counter = '';
        findInterface(arr[i], counter);
    }

    console.log("console.log(newIE.getObj(''));");
}
getGraficTree(editedArrStr);

// getGraficTree(getClearTree(treeElemnts), 1);


// console.log(newIE.updateCommentRating(''));