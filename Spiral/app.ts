window.onload = function ()
{
    var line = new Line({ x: 50, y: 50});
    line.penDown();
    line.move(256);
    line.turn(1 / 4);
    for (var n: number = 256; n > 1; n /= 1.1)
    {
        for (var innerN = 0; innerN < 2; innerN++)
        {
            line.move(n);
            line.turn(1 / 4);
        }
    }
    var path = line.SVGPaths;
    path.forEach(function (v) { canvas.appendChild(v) });
};

declare var canvas: SVGElement;