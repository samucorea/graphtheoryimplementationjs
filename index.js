import Node from './Node.js'
import Edge from './Edge.js'


const canvas = document.querySelector('canvas')
const kruskalBtn = document.getElementById('kruskalBtn')
const context = canvas.getContext('2d')



canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';

const nodes = []
let edges = []


function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i]
        let fromNode = edge.from;
        let toNode = edge.to;
        context.beginPath();
        context.strokeStyle = fromNode.strokeStyle;
        context.moveTo(fromNode.x, fromNode.y);
        context.lineTo(toNode.x, toNode.y);
        context.stroke();

        //Text
        const middleX = (fromNode.x + toNode.x) / 2
        const middleY = (fromNode.y + toNode.y) / 2
        context.font = '18px Arial'
        context.fillText(edge.weight, middleX + 10, middleY + 15)
        context.fillText(`e${i + 1}`, middleX - 10, middleY - 15)
    }

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

function edgeExists(S, T) {
    for (let i = 0; i < edges.length; i++) {
        const Sprime = JSON.stringify(edges[i].from)
        const Tprime = JSON.stringify(edges[i].to)

        if ((S == Sprime && T == Tprime) || (T == Sprime && S == Tprime)) {
            return true;
        }

    }

    return false;
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
        if (selection && selection !== target) {
            if (!edgeExists(JSON.stringify(selection), JSON.stringify(target))) {
                const weight = parseInt(prompt("Inserte peso de arista"))
                const edge = new Edge(selection, target, weight);

                edges.push(edge);
                selection = undefined;
                draw()
                return;
            }


        }
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

function createsCircuit(newEdge, currentEdges) {
    const dict = {}
    const edgesWithNewEdge = [...currentEdges, newEdge]
    edgesWithNewEdge.forEach(edge => {
        if (!dict.hasOwnProperty([edge.from.x, edge.from.y])) {
            dict[[edge.from.x, edge.from.y]] = 1;

        }

        if (!dict.hasOwnProperty([edge.to.x, edge.to.y])) {
            dict[[edge.to.x, edge.to.y]] = 1;

        }


    })

    return Object.keys(dict).length - 1 !== edgesWithNewEdge.length;

    // currentEdges.forEach(edge => {
    //     if (edge.from == newEdge.from || edge.to == newEdge.to || edge.from == newEdge.to || edge.to == newEdge.from) {
    //         counter++;
    //     }
    // })

    // return counter > 1
}

function Kruskal(edges) {
    console.log(edges)
    const edgesSorted = edges.sort((a, b) => (a.weight > b.weight) ? 1 : -1)
    console.log(edgesSorted.length)

    const newEdges = []
    const n = nodes.length



    let m = 0

    while (m < n - 1) {
        const edgeLessWeight = edgesSorted.shift()

        if (!createsCircuit(edgeLessWeight, newEdges)) {
            newEdges.push(edgeLessWeight)

        }
        m += 1;

    }

    return newEdges
}

canvas.addEventListener('mousemove', move);
canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', up)

kruskalBtn.addEventListener('click', () => {
    edges = Kruskal(edges)
    draw()
})

