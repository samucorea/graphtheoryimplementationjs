import { nodeEquals } from './helperFunctions.js'

function Kruskal(nodes, edges) {

    console.log(isCyclic(nodes))

    return


    const edgesSorted = edges.sort((a, b) => (a.weight > b.weight) ? 1 : -1)


    const newEdges = []
    const newNodes = [...nodes]

    for (const node in newNodes) {
        newNodes[node].adjacentNodes = []
    }
    const n = nodes.length



    let m = 0

    while (m < n) {
        const edgeLessWeight = edgesSorted.shift()


        if (!createsCircuit(edgeLessWeight, newNodes)) {
            newEdges.push(edgeLessWeight)

        }
        m += 1;

    }

    return newEdges
}

const visited = []

function isCyclicUtil(v, visited, parent) {
    visited[v] = true;

    for (const node of v.adjacentNodes) {
        if (!visited[node]) {
            if (isCyclicUtil(node, visited, v)) {
                return true;
            }

        }

        else if (node == parent.number) {
            return true;
        }
    }

    return false;
}

function isCyclic(nodes) {
    for (const node of nodes) {
        if (!visited[node]) {
            if (isCyclicUtil(node.number, visited, -1)) {
                return true;
            }
        }
    }

    return false;
}



export { Kruskal }