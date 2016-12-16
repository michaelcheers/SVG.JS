class linear {
    static slope (x1, y1, x2, y2) {
        if (x1 == x2) console.log("error");
        return (y1 - y2) / (x1 - x2);
    }
    static yInt (x1, y1, x2, y2) {
        if (x1 === x2) return y1 === 0 ? 0 : false;
        if (y1 === y2) return y1;
        return y1 - linear.slope(x1, y1, x2, y2) * x1;
    }
    static getIntersection (x11, y11, x12, y12, x21, y21, x22, y22) {
        var slope1, slope2, yint1, yint2, intx, inty;
        if (x11 == x21 && y11 == y21) return [x11, y11];
        if (x12 == x22 && y12 == y22) return [x12, y22];

        slope1 = this.slope(x11, y11, x12, y12);
        slope2 = this.slope(x21, y21, x22, y22);
        if (slope1 === slope2) return false;

        yint1 = this.yInt(x11, y11, x12, y12);
        yint2 = this.yInt(x21, y21, x22, y22);
        if (yint1 === yint2) return yint1 === false ? false : [0, yint1];

        if (slope1 === undefined) return [y21, slope2 * y21 + yint2];
        if (slope2 === undefined) return [y11, slope1 * y11 + yint1];
        intx = (slope1 * x11 + yint1 - yint2) / slope2;
        return [intx, slope1 * intx + yint1];
    }
}

type Polygon = Vector2[];

window.onload = function ()
{
    var line = new Line({ x: 100, y: 100 });
    line.penDown();
    var hexagon: Polygon = [];
    for (var n: number = 0; n < 6; n++)
    {
        hexagon.push(line.pos);
        line.move(200);
        line.turn(1 / 6);
    }
    var colors = ["#f00", "#00f", "#0f0", "#f0f", "#00f", "#ff0"];
    var polygons: Polygon[] = [hexagon];
    var seperatingLines: [Vector2, Vector2][] = [];
    for (var n = 0; n < 6; n++)
    {
        for (var n2 = 2; n2 < 4; n2++)
        {
            line.changeColor(colors[n]);
            line.moveTo(hexagon[n]);
            line.lineTo(hexagon[(n2 + n) % 6]);
        }
    }
    var path = line.SVGPaths;
    path.forEach(function (v) { canvas.appendChild(v) });
};

declare var canvas: SVGElement;