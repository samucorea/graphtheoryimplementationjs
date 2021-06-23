import Node from './Node.js'


const canvas = document.querySelector('canvas')
const p = document.querySelector('.hey')
const context = canvas.getContext('2d')

let nodes = []

canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';


function drawNode(node) {
    context.beginPath();
    context.fillStyle = node.fillStyle
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
    context.strokeStyle = node.strokeStyle;
    context.stroke();
    context.fill();
}

function clickCanvas(e) {

    const node = new Node(e.offsetX, e.offsetY, 10, '#22cccc', '#009999')


    nodes.push(node)
    drawNode(node);
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
    if (selection) {
        selection.x = e.offsetX;
        selection.y = e.offsetY;
        drawNode(selection);
    }
}

function down(e) {
    let target = within(e.offsetX, e.offsetY);
    if (target) {
        selection = target;
    }
}

function up(e) {
    selection = undefined;
}

canvas.addEventListener('click', clickCanvas)
canvas.addEventListener('mousemove', move);
canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', up)

