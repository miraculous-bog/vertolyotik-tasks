'use strict';
// працюємо з класом ImageEditor. Для того аби створити екземпляр вікна графічних елемнтів створюємо змінну від цього класу.
// для побудови дерева з графічних елементів використано паттерн компонувальник

const isArray = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

const isObject = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

const getTree = (ob) => {
    const otherObj = [];
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


    const getClearTree = (str) => {
        const newArr = str.map(item => {
            let index = 0;
            for (let i = item.length - 1; i < item.length; i--) {
                if (item[i] === '.') {
                    index = i;
                    break;
                }

            }
            return item.slice(3);
        });
        const prepearedArr = [];
        newArr.forEach(item => {
            if (item !== prepearedArr[prepearedArr.length - 1]) {
                prepearedArr.push(item);
            }
        })
        return prepearedArr;
    };

    const treeElemnts = three(ob);
    const editedArrStr = getClearTree(treeElemnts);
    const getGraficTree = (arr) => {


        const findInterface = (str, index) => {
            // console.log(str, str[11])
            if (str[11] === ' ') {
                console.log(`${index}${str.split(" ")[1]}`);
                otherObj.push({ count: index, id: str.split(" ")[1] });
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
    return otherObj;
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

    move(x, y, destination) {
        if (destination) {
            this.x += x;
            this.y += y;
            console.log('moving on', x, y)
        } else {
            this.x -= x;
            this.y -= y;
            console.log('moving on -', x, y)
        }
    }

    draw() {
        console.log('drawing')
    }
}


class Circle extends Dot {

    constructor(x, y, id, parameters) {
        super(x, y, id);
        this.type = 'circle';
        this.parameters = parameters;
    }


}
class Rectangle extends Dot {

    constructor(x, y, id, parameters) {
        super(x, y, id);
        this.type = 'rectangle';
        this.parameters = parameters;
    }


}
class CompoundGraphic {
    children = [];

    add(graphic) {
        console.log("success added");
        this.children.push(graphic);
    }

    remove(id) {
        const index = this.children.indexOf(this.children.find(el => el.id === id));
        this.children.splice(index, 1);
        console.log(`${id} was deleted`);
    }


    moveGraphicGroup(x, y, destination) {
        this.children.forEach(item => {
            if (destination) {
                item.x += x;
                item.y += y;
                console.log(`${item} was changed them position`);
            } else {
                item.x -= x;
                item.y -= y;
                console.log(`${item} was changed them position`);
            }
        });
    }

}


class ImageEditor {
    all = [];

    static repeatData = {
        data: [],
        action: "",
    }
    static backupData = {
        data: [],
        action: "",
    }
    load() {
        this.all = new CompoundGraphic();
        console.log('all', this.all);
        this.all.add(new Circle(50, 20, '', [50, 50]));
        this.all.add(new Rectangle(100, 300, '', [20, 30]));
    }
    addElement(element, otherGroup = null) {
        if (otherGroup === null) {
            this.all.add(element)
        } else {
            const item = this.getGroup(otherGroup);
            item.add(element);
        }
        ImageEditor.repeatData.data = [element, otherGroup];
        ImageEditor.repeatData.action = this.addElement;


        ImageEditor.backupData.data = [element.id];
        ImageEditor.backupData.action = this.deleteGraphic;
        this.drawing();
    }
    groupSelected(arrGraphics, otherGroup = null) {
        const group = new CompoundGraphic();
        arrGraphics.forEach(component => {
            group.add(component);
        });
        if (otherGroup === null) {
            this.all.add(group)
        } else {
            const item = this.getGroup(otherGroup);
            item.add(group);
        }
        ImageEditor.repeatData.data = [arrGraphics, otherGroup];
        ImageEditor.repeatData.action = this.groupSelected;
        this.drawing();

    }

    getObj(id, type) {
        var paths = [];

        function findPath(branch, str, prevBranch = null) {
            Object.keys(branch).forEach(function (key) {
                if (isArray(branch[key]) || isObject(branch[key])) {
                    findPath(branch[key], str ? str + "." + key : key, branch);
                }
                else {

                    if (branch.id === id && type === "element") { paths = branch; } else if (branch.id === id && type === "group") {
                        console.log("----------");
                        paths = prevBranch;
                    }
                    return;
                }
            });
        }

        findPath(this.all, "");
        return paths;
    }
    getGroup(id) {
        var paths = [];

        function findPath(branch, prevBranch = null) {
            Object.keys(branch).forEach(function (key) {
                if (branch[key].children || isArray(branch[key])) {
                    findPath(branch[key], branch);
                }
                else {
                    if (branch[key].id === id) {
                        paths = prevBranch;
                    }
                }
            });
        }

        findPath(this.all, "");
        return paths;
    }

    getElm(el) {
        if (el.type === "dot") {
            return new Dot(el.x, el.y);
        } else if (el.type === "circle") {
            return new Circle(el.x, el.y, el.radius);
        }
    }

    moveGraphic(id, x, y, destination) {
        const graphic = this.getObj(id, 'element');
        console.log(graphic);
        graphic.move(x, y, destination);
        ImageEditor.repeatData.data = [id, x, y, destination];
        ImageEditor.repeatData.action = this.moveGraphic;

        ImageEditor.backupData.data = [id, -x, -y, destination ? false : true];
        ImageEditor.backupData.action = this.moveGraphic;
        this.drawing();

    }
    moveGraphicGroup(id, x, y, destination) {
        const group = this.getGroup(id);
        console.log(group);
        group.moveGraphicGroup(x, y, destination);

        ImageEditor.repeatData.data = [id, x, y, destination];
        ImageEditor.repeatData.action = this.moveGraphicGroup;


        ImageEditor.backupData.data = [id, -x, -y, destination ? false : true];
        ImageEditor.backupData.action = this.moveGraphicGroup;
        this.drawing();

    }


    deleteGraphic(id) {
        const graphic = this.getGroup(id);
        const backupInfo = this.getObj(id, "element");
        ImageEditor.backupData.data = [this.getElm(backupInfo), graphic];
        graphic.remove(id);
        console.log(graphic);

        ImageEditor.backupData.action = this.addElement;
        this.drawing();

    }

    shiftGraphic(id, group = null) {


        const currentGraphic = this.getObj(id, "element");
        const graphic = this.getElm(currentGraphic);
        const gr = this.getGroup(id);
        gr.remove(id);
        this.addElement(graphic, group);
        console.log(graphic);


        ImageEditor.repeatData.data = [id, group];
        ImageEditor.repeatData.action = this.shiftGraphic;
        this.drawing();

    }

    repeat() {
        const calling = ImageEditor.repeatData.action.bind(this, ...ImageEditor.repeatData.data);
        calling();
    }

    backupData() {
        const calling = ImageEditor.backupData.action.bind(this, ...ImageEditor.backupData.data);
        calling();
    }

    drawing(thisObj) {
        const paths = [];
        let counter = 0;
        function findPath(branch, str) {
            Object.keys(branch).forEach(function (key) {
                if (isArray(branch[key]) || isObject(branch[key])) {
                    findPath(branch[key]);
                    counter++;
                }
                else {
                    paths.push({ ...branch });
                }
            });
        }

        findPath(this.all, "");
        const answr = [];
        answr.push({ ...paths[0] });

        for (let i = 1; i < paths.length; i++) {
            if (paths[i].id !== paths[i - 1].id) {
                answr.push({ ...paths[i] });
            }
        }
        // return answr;
        const gettingTree = getTree(this);
        const editedRightIdTree = gettingTree.map(item => {
            const newId = item.id.split("_")[1];
            return { ...item, id: newId }
        })
        const prepearedDataItem = editedRightIdTree.map(item => {
            let match = answr.find(el => el.id === item.id);


            return { ...match, zIndex: item.count.length };
        });
        const colorCircle = ["#660099", "#9900FF", "#9933FF", "#9966FF", "#CC99FF"];
        const colorRectangle = ["#006600", "#339933", "#66CC66", "#99FF99", "#CCFFCC"];
        let strElements = "";

        const getColor = (num, type) => {
            if (type === "circle") {
                if (num > 4) {
                    return colorCircle[5];
                } else {
                    return colorCircle[num];
                }
            } else if (type === "rectangle") {
                if (num > 4) {
                    return colorRectangle[5];
                } else {
                    return colorRectangle[num];
                }
            }
        }
        prepearedDataItem.forEach(item => {
            let str;
            if (item.type === "circle") {
                str = `<div class=${item.type}
                style="height: ${item.parameters[0]}px;width: ${item.parameters[1]}px;border-radius: 50%;background-color: ${getColor(item.zIndex, item.type)};z-index: ${100 - item.zIndex};top: ${item.y}px;left: ${item.x}px;"></div>`;
                strElements += str;
            } else if (item.type === "rectangle") {
                str = `<div class="${item.type}" style="height: ${item.parameters[0]}px;width: ${item.parameters[1]}px;background-color: ${getColor(item.zIndex, item.type)};z-index: ${100 - item.zIndex};top: ${item.y}px;left: ${item.x}px;"></div>`;
                strElements += str;
            }
        });

        const wrapper = document.querySelector(".wrapper");


        const verifyingPosition = (positionData) => {
            const subArr = prepearedDataItem.filter(item => item.id);
            return subArr.filter(item => {
                let x = positionData.left;
                let y = positionData.top;
                let x1 = item.x;
                let y1 = item.y;
                let x2 = x1 + item.parameters[0];
                let y2 = y1 + item.parameters[1];
                if ((x <= x2 && x >= x1) && (y <= y2 && y >= y1)) {
                    return item;
                }
            });
        }

        const handlerClick = (event) => {
            // var rect = event;
            const currentPointElm = verifyingPosition({
                left: event.pageX,
                top: event.pageY,
            });

            if (currentPointElm.length !== 0) {
                const indexArr = currentPointElm.map(item => item.zIndex);
                const maxNum = Math.max(...indexArr);
                const searchedEl = currentPointElm.find(item => item.zIndex === maxNum);
                alert(`найглибший» елемент в цій точцi\ntype: ${searchedEl.type}\nx: ${searchedEl.x}\ny: ${searchedEl.y}\nwidth and height: ${searchedEl.parameters[0]} ${searchedEl.parameters[1]}`);
            }

        }
        wrapper.innerHTML = '';
        let mainStr = `<div class="window">${strElements}</div>`
        wrapper.insertAdjacentHTML('afterbegin', mainStr)

        document.querySelector("body").addEventListener("click", handlerClick);
    }

}

// створюємо екземпляр головного класу контролю елементів та груп
const newIE = new ImageEditor();

// завантажуємо стартові елементи за доп. методу load()
newIE.load();
// в корені нашого дерева створюємо групу в яку завантажуємо коло та прямокутник
newIE.groupSelected([new Circle(300, 410, '', [10, 10]), new Rectangle(300, 500, '', [100, 50]), new Rectangle(50, 20, "", [100, 100])]);
// після кожного виклику метода виконується візуальна побудова структури в консолі, також можна викликати за доп. фукнції getTree(obj);
// додамо новий елемент за допю методу, в параметрах ми передаємо елемент, і другим id групи в яку хочему помістити, якщо id не вказаний то автоматично закинеться в корінь дерева.
newIE.addElement(new Circle(400, 400, "", [40, 40]));


// Також на доступні наступні методи

// рухає фігуру
// obj.moveGraphic(id,x,y,destination)

// рухає групу фігур
// moveGraphicGroup(id, x, y, destination)

// видаляє фігуру
//obj.deleteGraphic(id)

// переміщення в структурі граф. дерева
// obj.shiftGraphic(id, group = null)

//повторює попередній метод
// obj.repeat()

// відмінює попередню дію методу
// obj.backupData()


getTree(newIE);






