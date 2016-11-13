var Line = (function () {
    function Line(pos) {
        this.pos = pos || { x: 0, y: 0 };
        this.direction = 1 / 4;
        this.line = false;
        this.pathD = [Line.vector2ToString("M", this.pos)];
        this.colors = ["black"];
        this.index = 0;
    }
    Line.vector2ToString = function (start, pos) {
        return start + pos.x + " " + pos.y;
    };
    Line.prototype.move = function (steps) {
        this.drawLineTo({ x: (Math.sin(this.directionInRadians) * steps) + this.pos.x, y: this.pos.y - (Math.cos(this.directionInRadians) * steps) });
    };
    Line.prototype.changeColor = function (color) {
        var index = this.colors.indexOf(color);
        if (index === -1) {
            this.pathD.push("");
            this.index = this.pathD.length - 1;
            this.colors.push(color);
        }
        else
            this.index = index;
        this.pathD[this.index] += (Line.vector2ToString("M", this.pos));
    };
    Line.prototype.turn = function (direction) {
        this.direction += direction;
    };
    Line.prototype.drawLineTo = function (pos) {
        this.pos = pos;
        this.pathD[this.index] += Line.vector2ToString(this.line ? " L" : " M", pos);
    };
    Line.prototype.moveTo = function (pos) {
        this.penUp();
        this.drawLineTo(pos);
        this.penDown();
    };
    Line.prototype.drawRegularPolygon = function (length, nSides) {
        for (var n = 0; n < nSides; n++) {
            this.move(length);
            this.turn(1 / nSides);
        }
    };
    Line.prototype.drawPolygon = function (lengths, nSides) {
        for (var n = 0; n < nSides; n++) {
            this.move(lengths[n % lengths.length]);
            this.turn(1 / nSides);
        }
    };
    Line.prototype.drawCircle = function (circumference, quality) {
        circumference *= Math.PI;
        for (var n = 0; n < quality; n++) {
            this.move(circumference / quality);
            this.turn(1 / quality);
        }
    };
    Line.prototype.drawRectangle = function (size) {
        for (var n = 0; n < 2; n++) {
            this.move(size.x);
            this.turn(0.25);
            this.move(size.y);
            this.turn(0.25);
        }
    };
    Line.prototype.drawSquare = function (width) {
        this.drawRectangle({ x: width, y: width });
    };
    Line.prototype.drawTriangle = function (width, length, angle) {
        var startPos = { x: this.pos.x, y: this.pos.y };
        this.move(width);
        this.turn(angle || (1 / 3));
        this.move(length || width);
        this.drawLineTo(startPos);
        this.direction = 0;
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
    Line.prototype.render = function (canvas) {
        this.SVGPaths.forEach(function (v) {
            canvas.appendChild(v);
        });
    };
    return Line;
}());
//# sourceMappingURL=lib.js.map