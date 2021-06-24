import Node from './Node.js'
import Edge from './Edge.js'
import { nodeEquals } from './helperFunctions.js'


const canvas = document.querySelector('canvas')
const kruskalBtn = document.getElementById('kruskalBtn')
const context = canvas.getContext('2d')



canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';

const nodes = []
let edges = []
let counter = 0;


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
        const Sprime = edges[i].from
        const Tprime = edges[i].to

        if ((nodeEquals(S, Sprime) && nodeEquals(T, Tprime)) || (nodeEquals(T, Sprime) && nodeEquals(S, Tprime))) {
            return true;
        }

    }

    return false;
}



let selection = undefined;
const adj = []

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

            if (!edgeExists(selection, target)) {
                const weight = parseInt(prompt("Inserte peso de arista"))
                const edge = new Edge(selection, target, weight);



                if (adj[target.number] == undefined) {
                    adj[target.number] = []

                }

                if (adj[selection.number] == undefined) {
                    adj[selection.number] = []
                }

                adj[target.number].push(selection.number)
                adj[selection.number].push(target.number)






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
        const node = new Node(e.offsetX, e.offsetY, 10, counter)
        counter++;
        nodes.push(node);
        draw();
    }
    if (selection && !selection.selected) {
        selection = undefined;
    }
    draw();
}

canvas.addEventListener('mousemove', move);
canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', up)


function Kruskal(nodes, edges) {



    const edgesSorted = edges.sort((a, b) => (a.weight > b.weight) ? 1 : -1)


    const newEdges = []
    const n = edges.length



    let m = 0

    while (m < n) {
        const edgeLessWeight = edgesSorted.shift()


        if (!createsCircuit(edgeLessWeight, nodes)) {
            newEdges.push(edgeLessWeight)

        }
        visited.length = 0;
        m += 1;

    }

    return newEdges
}

const visited = []

function isCyclicUtil(v, visited, parent) {
    visited[v] = true;

    for (const node of adj[v]) {
        if (!visited[node]) {
            if (isCyclicUtil(node, visited, v)) {
                return true;
            }

        }

        else if (node != parent) {
            return true;
        }
    }

    return false;
}

function isCyclic(nodes) {

    for (let i = 0; i < nodes.length; i++) {
        if (!visited[i]) {
            if (isCyclicUtil(i, visited, -1)) {
                return true;
            }
        }

    }

    return false;
}

function createsCircuit(newEdge, nodes) {


    adj[newEdge.to.number].push(newEdge.from.number)
    adj[newEdge.from.number].push(newEdge.to.number)
    const cyclic = isCyclic(nodes)

    if (cyclic) {
        adj[newEdge.to.number].pop();
        adj[newEdge.from.number].pop();
    }

    return cyclic
}


kruskalBtn.addEventListener('click', () => {
    adj.length = 0
    for (let i = 0; i < nodes.length; i++) {
        adj[i] = []
    }
    edges = Kruskal(nodes, edges)
    draw()
})

