function addEltToSVG(svg, name, attrs) {
    
 	var element = document.createElementNS("http://www.w3.org/2000/svg", name);
 	if (attrs === undefined) attrs = {};
 	for (var key in attrs) {
 		element.setAttributeNS(null, key, attrs[key]); // namespace = null, name = key, value = attrs[key]
 	}
    if (name == "text") {
        var textNode = document.createTextNode(attrs['content']);
        element.appendChild(textNode);
    }
	svg.append(element); // insert elements to the svg 
}

var width = 600, height = 400;

var s = document.createElementNS("http://www.w3.org/2000/svg", 'svg'), chartID = "histogram";
s.setAttribute("width", width);
s.setAttribute("height", height);

var rect1 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
rect1.setAttribute("width", 50);
rect1.setAttribute("height", 10);
rect1.setAttribute("x", 60);
rect1.setAttribute("fill", "blue");
s.appendChild(rect1);

var rect2 = addEltToSVG(s, "rect", {
    "width": 50,
    "height": 10,
    "x": 60,
    "fill": "blue"
});

var rect3 = addEltToSVG(s, "rect", {
    "width": 50,
    "height": 10,
    "fill": "blue"
});

var rect4 = addEltToSVG(s, "rect", {
    "width": 50,
    "height": 10,
    "fill": "blue"
});

var rect5 = addEltToSVG(s, "rect", {
    "width": 50,
    "height": 10,
    "fill": "blue"
});

var rect6 = addEltToSVG(s, "rect", {
    "width": 50,
    "height": 10,
    "fill": "blue"
});



function createHistogram(rect, words) {
    for (var i = 0; i < words.length; i++) {
        if (words[i].includes('A') || words[i].includes('B') || words[i].includes('C') || words[i].includes('D')) {
        
        }
    }
}


