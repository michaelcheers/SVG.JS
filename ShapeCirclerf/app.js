function go(innerCircle, outerCircle) {
    canvas.innerHTML = "";
    var line = new Line({ x: 180, y: 180 });
    line.penDown();
    for (var n = 0; n < outerCircle; n++) {
        for (var n2 = 0; n2 < innerCircle; n2++) {
            line.move(360 / innerCircle);
            line.turn(1 / innerCircle);
            line.changeColor("#" + Math.floor(Math.random() * 0x1000000).toString(16));
        }
        line.turn(1 / outerCircle);
    }
    var path = line.SVGPaths;
    path.forEach(function (v) { canvas.appendChild(v); });
}
;
//# sourceMappingURL=app.js.map