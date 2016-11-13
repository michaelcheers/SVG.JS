var Line = (function () {
    function Line(pos) {
        this.pos = pos || { x: 0, y: 0 };
        this.direction = 1 / 4;
        this.line = false;
        this.pathD = [Line.vector2ToString("M", this.pos)];
        this.colors = ["black"];
    }
    Line.vector2ToString = function (start, pos) {
        return start + pos.x + " " + pos.y;
    };
    Line.prototype.move = function (steps) {
        this.lineTo({ x: (Math.sin(this.directionInRadians) * steps) + this.pos.x, y: this.pos.y - (Math.cos(this.directionInRadians) * steps) });
    };
    Line.prototype.changeColor = function (color) {
        this.colors.push(color);
        this.pathD.push(Line.vector2ToString("M", this.pos));
    };
    Line.prototype.turn = function (direction) {
        this.direction += direction;
    };
    Line.prototype.lineTo = function (pos) {
        this.pos = pos;
        this.pathD[this.pathD.length - 1] += Line.vector2ToString(this.line ? " L" : " M", pos);
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
            return this.direction * (Math.PI * 2);
        },
        set: function (radians) {
            this.direction = (radians * 2) / Math.PI;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "SVGPaths", {
        get: function () {
            var result = [];
            for (var index = 0; index < this.pathD.length; index++) {
                result.push(this.SVGPath(index));
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.SVGPath = function (index) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'd', this.pathD[index]);
        path.setAttributeNS(null, 'stroke', this.colors[index]);
        path.setAttributeNS(null, 'fill', 'transparent');
        return path;
    };
    return Line;
}());
//# sourceMappingURL=lib.js.map