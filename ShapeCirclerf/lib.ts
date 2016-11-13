class Line
{
    pos: Vector2;
    direction: number;
    line: boolean;
    index: number;
    pathD: string[];
    colors: string[];

    constructor(pos?: Vector2)
    {
        this.pos = pos || { x: 0, y: 0 };
        this.direction = 1/4;
        this.line = false;
        this.pathD = [Line.vector2ToString("M", this.pos)];
        this.colors = ["black"];
        this.index = 0;
    }

    static vector2ToString(start: string, pos: Vector2)
    {
        return start + pos.x + " " + pos.y;
    }

    move(steps: number)
    {
        this.drawLineTo({ x: (Math.sin(this.directionInRadians) * steps) + this.pos.x, y: this.pos.y - (Math.cos(this.directionInRadians) * steps) });
    }

    changeColor(color: string)
    {
        var index: number = this.colors.indexOf(color);
        if (index === -1) {
            this.pathD.push("");
            this.index = this.pathD.length - 1;
            this.colors.push(color);
        }
        else
            this.index = index;
        this.pathD[this.index] += (Line.vector2ToString("M", this.pos));
    }

    turn(direction: number)
    {
        this.direction += direction;
    }

    drawLineTo(pos: Vector2)
    {
        this.pos = pos;
        this.pathD[this.index] += Line.vector2ToString(this.line ? " L" : " M", pos);
    }

    moveTo(pos: Vector2)
    {
        this.penUp();
        this.drawLineTo(pos);
        this.penDown();
    }

    drawRegularPolygon(length: number, nSides: number)
    {
        for (var n = 0; n < nSides; n++)
        {
            this.move(length);
            this.turn(1 / nSides);
        }
    }

    drawPolygon(lengths: number[], nSides: number)
    {
        for (var n = 0; n < nSides; n++)
        {
            this.move(lengths[n % lengths.length]);
            this.turn(1 / nSides);
        }
    }

    drawCircle(circumference: number, quality: number)
    {
        circumference *= Math.PI;
        for (var n = 0; n < quality; n++)
        {
            this.move(circumference / quality);
            this.turn(1 / quality);
        }
    }

    drawRectangle(size: Vector2)
    {
        for (var n = 0; n < 2; n++)
        {
            this.move(size.x);
            this.turn(0.25);
            this.move(size.y);
            this.turn(0.25);
        }
    }

    drawSquare(width: number)
    {
        this.drawRectangle({ x: width, y: width });
    }

    drawTriangle(width: number, length?: number, angle?: number)
    {
        var startPos = { x: this.pos.x, y: this.pos.y };
        this.move(width);
        this.turn(angle || (1 / 3));
        this.move(length || width);
        this.drawLineTo(startPos);
        this.direction = 0;
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

    render(canvas: SVGElement)
    {
        this.SVGPaths.forEach(function (v) {
            canvas.appendChild(v);
        });
    }
}

type Vector2 = { x: number; y: number; }