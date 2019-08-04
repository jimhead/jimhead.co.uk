//
// grab flickr images (via JSON -- what a total fscking hack) and 
// display them
//

function flickrcb(aSrc, aUrl, aTitle) {
    var listitem = document.createElement('li');
    listitem.className = 'flickritem';

    var anchor = document.createElement('a');
    anchor.setAttribute('href', aUrl);
    anchor.className = 'flickra';

    var image = document.createElement('img');
    image.setAttribute('src', aSrc);
    image.setAttribute('title', aTitle);
    image.setAttribute('alt', 'Photograph of ' + aTitle);
    image.setAttribute('width', 75);
    image.setAttribute('height', 75);
    image.className = 'flickrphoto';

    anchor.appendChild(image);
    listitem.appendChild(anchor);
    document.body.appendChild(listitem);
}

function min(a, b) {
    return (a < b) ? a : b;
}

// function MUST have this name, as it is what the flickr code will call
function jsonFlickrFeed(obj) {
    // make sure required DOM API is available
    if (!document.createElement)
	return false;
    if (!document.getElementById)
	return false;
    if (!document.getElementsByTagName)
	return false;

    //document.getElementById('flickrdummyli').style.display = 'none';

    var regexi = /http:\/\/static[^&]+/i;
    var i;
    for (i=0; i < min(obj.items.length, 5); ++i) {
	var item = obj.items[i];

	// this URL extraction code is horribly wonky but seems to work
	var url = item.description.match(regexi);
	if (url instanceof Array)
	    url = url[0];
	url = url.slice(0, url.length - 5) + "s.jpg";

	flickrcb(url, item.link, item.title);
    }
}
