import Node from './Node.js'


const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

let nodes = []

canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';


function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        context.beginPath();
        context.fillStyle = node.selected ? node.selectedFill : node.fillStyle;
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
        context.strokeStyle = node.strokeStyle;
        context.fill();
        context.stroke();
        context.font = '18px Arial'
        context.textAlign = 'center'
        context.fillText(`v${i + 1}`, node.x, node.y + (node.radius * 3))
    }
}



let selection = undefined;

function within(x, y) {
    return nodes.find(n => {
        return x > (n.x - n.radius) &&
            y > (n.y - n.radius) &&
            x < (n.x + n.radius) &&
            y < (n.y + n.radius);
    });
}

function move(e) {
    if (selection && e.buttons) {
        selection.x = e.offsetX;
        selection.y = e.offsetY;
        selection.moving = true;
        draw();
    }
}

function down(e) {
    let target = within(e.offsetX, e.offsetY);

    if (selection && selection.selected) {
        selection.selected = false;
    }
    if (target) {
        selection = target;
        selection.selected = true
        draw()
    }
}

function up(e) {

    if (!selection) {
        const node = new Node(e.offsetX, e.offsetY, 10)
        nodes.push(node);
        draw();
    }
    if (selection && !selection.selected) {
        selection = undefined;
    }
    draw();
}

// canvas.addEventListener('click', clickCanvas)
canvas.addEventListener('mousemove', move);
canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', up)

