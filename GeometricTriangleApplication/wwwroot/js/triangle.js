const uri = 'api/GeometricTriangle/';

/*
 * Calls the GetVertices API and draws the grid and triangle
 */
function getVertices() {
    var rowDropDown = document.getElementById("rows");
    var columnDropDown = document.getElementById("columns");

    var selectedRowValue = rowDropDown.options[rowDropDown.selectedIndex].value;
    var selectedColumnValue = columnDropDown.options[columnDropDown.selectedIndex].value;

    fetch(uri + 'GetVertices?row=' + selectedRowValue + '&column=' + selectedColumnValue)
        .then(response => response.json())
        .then(data => {
            if (data) {
                drawGrid();
                drawTriangle(data);
            }
        })
        .catch(error => console.error('Unable to get vertices.', error));
}

/*
 * Draws the triangle
 */
function drawTriangle(data) {
    var vertices1 = data.vertices1;
    var vertices2 = data.vertices2;
    var vertices3 = data.vertices3;

    document.getElementById("vertices1").innerHTML = "(" + vertices1 + ")";
    document.getElementById("vertices2").innerHTML = "(" + vertices2 + ")";
    document.getElementById("vertices3").innerHTML = "(" + vertices3 + ")";

    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#5b9bd5";

        ctx.beginPath();
        ctx.moveTo(vertices1[1] * 5, vertices1[0] * 5);
        ctx.lineTo(vertices2[1] * 5, vertices2[0] * 5);
        ctx.lineTo(vertices3[1] * 5, vertices3[0] * 5);
        ctx.fill();
    }
}

/*
 * Draws the empty grid
 */
function drawGrid() {
    clearGrid();
    drawRowLines();
    drawColumnLines();
    drawDiagonalLines();
}

/*
 * Clears the grid
 */
function clearGrid() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

/*
 * Draws the row lines on the grid
 */
function drawRowLines() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.strokeStyle = "#86adcf";

        ctx.moveTo(0, 50);
        ctx.lineTo(300, 50);
        ctx.stroke();

        ctx.moveTo(0, 100);
        ctx.lineTo(300, 100);
        ctx.stroke();

        ctx.moveTo(0, 150);
        ctx.lineTo(300, 150);
        ctx.stroke();

        ctx.moveTo(0, 200);
        ctx.lineTo(300, 200);
        ctx.stroke();

        ctx.moveTo(0, 250);
        ctx.lineTo(300, 250);
        ctx.stroke();
    }
}

/*
 * Draws the column line on the grid
 */
function drawColumnLines() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.moveTo(50, 0);
        ctx.lineTo(50, 300);
        ctx.stroke();

        ctx.moveTo(100, 0);
        ctx.lineTo(100, 300);
        ctx.stroke();

        ctx.moveTo(150, 0);
        ctx.lineTo(150, 300);
        ctx.stroke();

        ctx.moveTo(200, 0);
        ctx.lineTo(200, 300);
        ctx.stroke();

        ctx.moveTo(250, 0);
        ctx.lineTo(250, 300);
        ctx.stroke();
    }
}

/*
 * Draws the diagonal lines on the grid
 */
function drawDiagonalLines() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 50);
        ctx.lineTo(250, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.lineTo(200, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 150);
        ctx.lineTo(150, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 200);
        ctx.lineTo(100, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 250);
        ctx.lineTo(50, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(250, 0);
        ctx.lineTo(300, 50);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(200, 0);
        ctx.lineTo(300, 100);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(150, 0);
        ctx.lineTo(300, 150);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(300, 200);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(50, 0);
        ctx.lineTo(300, 250);
        ctx.stroke();
    }
}

/*
 * Calls the GetRowAndColumn API and sets the row and column labels
 */
function getRowAndColumn() {
    var vertice1xDropDown = document.getElementById("vertice1xSelect");
    var vertice1yDropDown = document.getElementById("vertice1ySelect");
    var vertice2xDropDown = document.getElementById("vertice2xSelect");
    var vertice2yDropDown = document.getElementById("vertice2ySelect");
    var vertice3xDropDown = document.getElementById("vertice3xSelect");
    var vertice3yDropDown = document.getElementById("vertice3ySelect");

    var vertice1xValue = vertice1xDropDown.options[vertice1xDropDown.selectedIndex].value;
    var vertice1yValue = vertice1yDropDown.options[vertice1yDropDown.selectedIndex].value;
    var vertice2xValue = vertice2xDropDown.options[vertice2xDropDown.selectedIndex].value;
    var vertice2yValue = vertice2yDropDown.options[vertice2yDropDown.selectedIndex].value;
    var vertice3xValue = vertice3xDropDown.options[vertice3xDropDown.selectedIndex].value;
    var vertice3yValue = vertice3yDropDown.options[vertice3yDropDown.selectedIndex].value;

    var triangle = {
        vertices1: [parseInt(vertice1xValue), parseInt(vertice1yValue)],
        vertices2: [parseInt(vertice2xValue), parseInt(vertice2yValue)],
        vertices3: [parseInt(vertice3xValue), parseInt(vertice3yValue)]
    };

    fetch(uri + 'GetRowAndColumn', {
        method: "POST",
        body: JSON.stringify(triangle),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(data => {
            if (data != null && data.length == 2) {
                document.getElementById("row").innerHTML = data[0];
                document.getElementById("column").innerHTML = data[1];
            }
            else {
                document.getElementById("row").innerHTML = "";
                document.getElementById("column").innerHTML = "";
            }
        })
        .catch(error => console.error('Unable to get row and column.', error));
}