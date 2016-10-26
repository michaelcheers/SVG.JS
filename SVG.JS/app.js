var Line = (function () {
    function Line(pos) {
        this.pos = pos || { x: 0, y: 0 };
        this.direction = 90;
        this.line = false;
        this.pathD = Line.vector2ToString("M", this.pos);
    }
    Line.vector2ToString = function (start, pos) {
        return start + pos.x + " " + pos.y;
    };
    Line.prototype.move = function (steps) {
        this.lineTo({ x: (Math.sin(this.directionInRadians) * steps) + this.pos.x, y: this.pos.y - (Math.cos(this.directionInRadians) * steps) });
    };
    Line.prototype.turn = function (direction) {
        this.direction += direction;
    };
    Line.prototype.lineTo = function (pos) {
        this.pos = pos;
        this.pathD += Line.vector2ToString(this.line ? " L" : " M", pos);
    };
    Line.prototype.moveTo = function (pos) {
        var oldLine = this.line;
        this.penUp();
        this.lineTo(pos);
        this.line = oldLine;
    };
    Line.prototype.penDown = function () {
        this.line = true;
    };
    Line.prototype.penUp = function () {
        this.line = false;
    };
    Object.defineProperty(Line.prototype, "directionInRadians", {
        get: function () {
            return this.direction * (Math.PI / 180);
        },
        set: function (radians) {
            this.direction = radians * (180 / Math.PI);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "SVGPath", {
        get: function () {
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttributeNS(null, 'd', this.pathD);
            path.setAttributeNS(null, 'stroke', 'black');
            path.setAttributeNS(null, 'fill', 'transparent');
            return path;
        },
        enumerable: true,
        configurable: true
    });
    return Line;
}());
window.onload = function () {
    var line = new Line();
    line.turn(45);
    line.move(100);
    line.penDown();
    for (var n = 0; n < 3; n++) {
        line.move(100);
        line.turn(120);
    }
    var path = line.SVGPath;
    canvas.appendChild(path);
};
//# sourceMappingURL=app.js.map