class Node {
    x;
    y;
    radius;
    fillStyle = '#22cccc'
    strokeStyle = '#009999'
    selectedFill = '#88aaaa'
    selected = false

    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius

    }
}

export default Node