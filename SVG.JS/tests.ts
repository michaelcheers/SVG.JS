window.onload = function ()
{
    var line = new Line({ x: 250, y: 0 });
    line.penDown();
    line.drawCircle(500, 200);
    line.drawRectangle({ x: 100, y: 100 });
    line.drawTriangle(50, 30, 1 / 4);
    document.body.appendChild(document.createTextNode(line.pathD.toString()));
    line.SVGPaths.forEach(function (v) { canvas.appendChild(v) });
};

declare var canvas: SVGElement;