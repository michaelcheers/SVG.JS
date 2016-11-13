var colorsL = 0;
declare var inner: HTMLInputElement;
declare var outer: HTMLInputElement;

function getColors()
{
    var result = [];
    for (var n = 0; n < colors.childNodes.length; n++)
    {
        var item = colors.childNodes.item(n);
        result.push((item as HTMLInputElement).value);
    }
    return result;
}

function submit() { go(inner.valueAsNumber, outer.valueAsNumber);}

function go(innerCircle: number, outerCircle: number) {
    canvas.innerHTML = "";
    var increment = 0;
    var line = new Line({ x: 180, y: 180 });
    var lColors = colorsL == 0 ? ["#000000", "#ff0000", "#00ff00", "#0000ff", "#00ffff", "#ff00ff", "#ffff00", "#ffffff"] : getColors();
    line.penDown();
    var innerAngle = 1 / innerCircle;
    var innerStepsN = 360 * innerAngle;
    var outerAngle = 1 / outerCircle;
    for (var n = 0; n < outerCircle + (outerCircle / innerCircle); n++) {
        for (var n2 = 0; n2 < innerCircle; n2++) {
            line.changeColor(lColors[increment++ % lColors.length]);
            line.move(innerStepsN);
            line.turn(innerAngle);
        }
        line.turn(outerAngle);
    }
    var path = line.SVGPaths;
    path.forEach(function (v) { canvas.appendChild(v) });
}


function addColor()
{
    var color = document.createElement('input');
    color.id = "color" + colorsL++;
    color.type = "color";
    color.style.display = 'block';
    color.oninput = submit;
    colors.appendChild(color);
}

declare var colors: HTMLSpanElement;
declare var canvas: SVGElement;