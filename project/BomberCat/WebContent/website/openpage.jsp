<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<link rel="stylesheet" href="css/creative.css" type="text/css">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="medien/favicon.ico" type="image/x-icon" />
<title>Welcome!</title>
<style type="text/css">
#startseite {
	height: 100%;
	width: 100%;
	position: absolute;
	overflow: auto;
	visibility: visible;
	background-image: url(Medien/Hintergrund_Startseite.jpg);
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
}

#Buttonlinks #play {
	position: absolute;
	left: 300px;
	top: 500px;
	cursor: pointer;
}

#Buttonrechts #website {
	position: absolute;
	left: 1300px;
	top: 500px;
	cursor: pointer;
}

#Changedtext {
	font-family:Merriweather,'Helvetica Neue',Arial,sans-serif;
	position: absolute;
	left: 25%;
	top: 0px;
	font-size: 100px;
	color: #C0F;
	text-align: center;
}
</style>
<script type="text/javascript">
	function MM_preloadImages() { //v3.0
		var d = document;
		if (d.images) {
			if (!d.MM_p)
				d.MM_p = new Array();
			var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
			for (i = 0; i < a.length; i++)
				if (a[i].indexOf("#") != 0) {
					d.MM_p[j] = new Image;
					d.MM_p[j++].src = a[i];
				}
		}
	}
	function MM_swapImgRestore() { //v3.0
		var i, x, a = document.MM_sr;
		for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
			x.src = x.oSrc;
	}

	function MM_findObj(n, d) { //v4.01
		var p, i, x;
		if (!d)
			d = document;
		if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
			d = parent.frames[n.substring(p + 1)].document;
			n = n.substring(0, p);
		}
		if (!(x = d[n]) && d.all)
			x = d.all[n];
		for (i = 0; !x && i < d.forms.length; i++)
			x = d.forms[i][n];
		for (i = 0; !x && d.layers && i < d.layers.length; i++)
			x = MM_findObj(n, d.layers[i].document);
		if (!x && d.getElementById)
			x = d.getElementById(n);
		return x;
	}

	function MM_swapImage() { //v3.0
		var i, j = 0, x, a = MM_swapImage.arguments;
		document.MM_sr = new Array;
		for (i = 0; i < (a.length - 2); i += 3)
			if ((x = MM_findObj(a[i])) != null) {
				document.MM_sr[j++] = x;
				if (!x.oSrc)
					x.oSrc = x.src;
				x.src = a[i + 2];
			}
	}
</script>
</head>

<body
	onload="MM_preloadImages('Medien/Button.jpg','Medien/Button_Wechsel_Play.jpg')">
	<jsp:useBean id="Bean" class="de.dhbwka.java.bombercat.website.CalculatorBean" />
	<div id="startseite">



		<div id="Changedtext">
			<jsp:getProperty property="randomSlogan" name="Bean"/>
		</div>
		<div id="Buttonlinks"
			onmouseover="MM_swapImage('play','','Medien/Button_Wechsel_Play.jpg',1)"
			onmouseout="MM_swapImage('play','','Medien/button.jpg',1)">
			<a href="index.html#game"><img src="Medien/button.jpg"
				width="227" height="51" alt="play" id="play" /></a>
		</div></div>
		<div id="Buttonrechts"
			onmouseover="MM_swapImage('website','','Medien/Button_Wechsel.jpg',1)"
			onmouseout="MM_swapImage('website','','Medien/Button_Web.jpg',1)">
			<a href="index.html"><img src="Medien/Button_Web.jpg"
				width="227" height="51" alt="Website" id="website" /></a>
		</div>
</body>
</html>
