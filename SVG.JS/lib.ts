class Line
{
    pos: Vector2;
    direction: number;
    line: boolean;
    pathD: string[];
    colors: string[];

    constructor(pos?: Vector2)
    {
        this.pos = pos || { x: 0, y: 0 };
        this.direction = 1/4;
        this.line = false;
        this.pathD = [Line.vector2ToString("M", this.pos)];
        this.colors = ["black"];
    }

    static vector2ToString(start: string, pos: Vector2)
    {
        return start + pos.x + " " + pos.y;
    }

    move(steps: number)
    {
        this.lineTo({ x: (Math.sin(this.directionInRadians) * steps) + this.pos.x, y: this.pos.y - (Math.cos(this.directionInRadians) * steps) });
    }

    changeColor(color: string)
    {
        this.colors.push(color);
        this.pathD.push(Line.vector2ToString("M", this.pos));
    }

    turn(direction: number)
    {
        this.direction += direction;
    }

    lineTo(pos: Vector2)
    {
        this.pos = pos;
        this.pathD[this.pathD.length - 1] += Line.vector2ToString(this.line ? " L" : " M", pos);
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
        return this.direction * (Math.PI * 2);
    }

    set directionInRadians(radians: number)
    {
        this.direction = (radians * 2) / Math.PI;
    }

    get SVGPaths()
    {
        var result: SVGPathElement[] = [];
        for (var index = 0; index < this.pathD.length; index++)
        {
            result.push(this.SVGPath(index));
        }
        return result;
    }

    SVGPath (index: number)
    {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'd', this.pathD[index]);
        path.setAttributeNS(null, 'stroke', this.colors[index]);
        path.setAttributeNS(null, 'fill', 'transparent');
        return path;
    }
}

type Vector2 = { x: number; y: number; }