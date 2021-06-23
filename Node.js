class Node {
    x;
    y;
    radius;
    fillStyle;
    strokeStyle;

    constructor(x, y, radius, fillStyle, strokeStyle) {
        this.x = x
        this.y = y
        this.radius = radius
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
    }
}

export default Node