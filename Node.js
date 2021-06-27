class Node {
    x;
    y;
    radius;
    fillStyle = '#080842'
    strokeStyle = ""
    selectedFill = '#88aaaa'
    selected = false
    adjacentNodes = []
    number

    constructor(x, y, radius, number) {
        this.x = x
        this.y = y
        this.radius = radius
        this.number = number;

    }

    addAdjacentNode(node) {
        this.adjacentNodes = [...this.adjacentNodes, node]
    }
}

export default Node