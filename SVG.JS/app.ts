class Line
{
    pos: Vector2;
    direction: number;
    line: boolean;
    pathD: string;

    constructor(pos?: Vector2)
    {
        this.pos = pos || { x: 0, y: 0 };
        this.direction = 90;
        this.line = false;
        this.pathD = Line.vector2ToString("M", this.pos);
    }

    static vector2ToString(start: string, pos: Vector2)
    {
        return start + pos.x + " " + pos.y;
    }

    move(steps: number)
    {
        this.lineTo({ x: (Math.sin(this.directionInRadians) * steps) + this.pos.x, y: this.pos.y - (Math.cos(this.directionInRadians) * steps) });
    }

    turn(direction: number)
    {
        this.direction += direction;
    }

    lineTo(pos: Vector2)
    {
        this.pos = pos;
        this.pathD += Line.vector2ToString(this.line ? " L" : " M", pos);
    }

    moveTo(pos: Vector2)
    {
        var oldLine = this.line;
        this.penUp();
        this.lineTo(pos);
        this.line = oldLine;
    }

    penDown()
    {
        this.line = true;
    }

    penUp()
    {
        this.line = false;
    }

    get directionInRadians()
    {
        return this.direction * (Math.PI / 180);
    }

    set directionInRadians(radians: number)
    {
        this.direction = radians * (180 / Math.PI);
    }

    get SVGPath()
    {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'd', this.pathD);
        path.setAttributeNS(null, 'stroke', 'black');
        path.setAttributeNS(null, 'fill', 'transparent');
        return path;
    }
}

type Vector2 = { x: number; y: number; }
window.onload = function () {
    var line = new Line();
    line.turn(45);
    line.move(100);
    line.penDown();
    for (var n = 0; n < 3; n++)
    {
        line.move(100);
        line.turn(120);
    }
    var path = line.SVGPath;
    canvas.appendChild(path);
};

declare var canvas: SVGElement;