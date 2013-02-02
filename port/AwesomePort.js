

function init()
{	

	var items = [];

	$.getJSON('spokane.json', function (data) {
		$.each(data, function(key, val) {
			items.push(new JsOB(val[0], val[1], 0)); // ERROR PRONE
		});
	});

	return items;
}


function blaListener(items)
{
	// EEEEEEEPPPPPPPPPP
	var newMap = new Map(0,0,200,200, 25, .005);

	newMap.setWeight(items);

	var points = [][];
	points = newMap.getWeighedPoints();

	return points;
}

function JsOB(latitude, longitude, privilege)
{
	var latitude = latitude;
	var longitude = longitude;
	var privilege = privilege;
}

function Map(x1, y1, x2, y2, tileCount, threshold) {

	var sizeX = x2 - x1;
	var sizeY = y2 - y1;

	var shiftX = sizeX / tileCount;
	var shiftY = sizeY / tileCount;

	var boxesInMap = [][];

	for (var i=0; i<tileCount; i++)
	{
		for (var ii=0; ii<tileCount; ii++)
		{
			boxesInMap[ii][i] = new Box(x1 + ii * shiftX, y1 + i * shiftY, x1 + (1+ii) * shiftX,  y1 + (1+i) * shiftY, threshold);
		}
	}

	this.getWeighedPoints = new function() {
		var points = [][];

		boxesInMap.length
		boxesInMap[0].length

		for (var i=0; i < boxesInMap[1].length; i++)
		{
			for (var ii = 0; ii < boxesInMap.length; ii ++)
			{
				boxesInMap[ii][i].setCenter();
				points[ii][i] = boxesInMap[ii][i].getCenterPoint
			}
		}
		return points;
	}

	this.setWeight = new function(JsOB) {
		for (var i=0; i<boxesInMap[1].length; i++)
		{
			for (var ii=0; ii<boxesInMap.length; ii++)
			{
				for (var iii=0; iii<JsOB.length; iii++)
				{
					boxesInMap[ii,i].setCenter();

					if (boxesInMap[ii,i].isIn(new Point(JsOB[iii].latitude, JsOB[iii].longitude), 0)) {
						boxesInMap[ii,i].count++;
					}
				}
			}
		}
	}
}

function Box(nx1, ny1, nx2, ny2, threshold) {

	var threshold = threshold;
	var x1 = nx1;
	var x2 = nx2;
	var y1 = ny1;
	var y2 = ny2;

	var sx, sy, xInfluences, yInfluences, xInfluenceShift, yInfluenceShift;

	this.getCenterPoint = new function() {
		return new Point(sx, sy, count);
	}

	this.setCenter = new function() {
		sx = ((x2 - x1) / 2) + x1;
		sy = ((y2 - y1) / 2) + y1;

		sx = (sx + xInfluenceShift) / (xInfluences + 1);
		sy = (sy + yInfluenceShift) / (yInfluences + 1);
	}

	this.isIn = new function(point) {
		if (distance(point.x, sx, point.y, sy) < threshold)
		{
			xInfluenceShift += point.x;
			yInfluenceShift += point.y;
			xInfluences++;
			yInfluences++;
			return true;
		}
		return false;
	}

	this.distance = new function(x1, x2, y1, y2)
	{
		return Math.pow(Math.pow((y1 - y2), 2) + Math.pow((x1 - x2), 2), 0.5);
	}
}

function Point(newX, newY, count) {
	var x = newX;
	var y = newY;
	var count = count;
}