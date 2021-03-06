<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- InstanceBegin template="/Templates/Vorlage.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>Guestbook</title>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- InstanceEndEditable -->
<!-- InstanceBeginEditable name="head" -->
<!-- InstanceEndEditable -->

<link href="../css/creative.css" rel="stylesheet" type="text/css" />
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../stylesheed/Vorlage.css" rel="stylesheet" type="text/css" />
<link href="../SpryAssets/SpryMenuBarHorizontal.css" rel="stylesheet"
	type="text/css" />
<script src="../SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
</head>
<body>
<center>
	<div id="kopf">
		<a href="../index.jsp"><img src="../Medien/catlogo.jpg"
			width="444" height="167" class="displayed" /></a>


	</div>

	<div >
			<ul id="MenuBar1" class="MenuBarHorizontal" >
				<li><a href="../index.jsp">Back to Main</a></li>
				<li><a href="../openpage.html">Openpage</a></li>
				<li><a href="guestbook.jsp">Refresh</a></li>




			</ul>
		</div>




	<br></br>
	<br></br>
	<br></br>

	<script type="text/javascript">
		var MenuBar1 = new Spry.Widget.MenuBar("MenuBar1", {
			imgDown : "../SpryAssets/SpryMenuBarDownHover.gif",
			imgRight : "../SpryAssets/SpryMenuBarRightHover.gif"
		});
	</script>
</center>
<center>
	<div>
		<div class="header-content">
		
				<h1>
					<b> Bombercat Guestbook</b>
				</h1>
				<jsp:useBean id="GuestBook"
					class="de.dhbwka.java.bombercat.website.GuestBook"
					scope="application" />
				<jsp:setProperty property="username" name="GuestBook"
					value="${param.username}" />
				<jsp:setProperty property="opinion" name="GuestBook"
					value="${param.opinion}" />
				<jsp:setProperty property="comment" name="GuestBook"
					value="${param.comment}" />
				<c:forEach var="item" items="${GuestBook.comments}">
					<p>
						<c:out value="${item.username}" />
						[
						<c:out value="${item.opinion}" />
						]:
						<c:out value="${item.comment}" />
					</p>
					</br>
				</c:forEach>
				<hr>
					<a href="guestbook.jsp" class="btn btn-primary btn-xl page-scroll">New
						Comment </a>
			</center>
		</div>
	</div>

</body>
</html>
	
	
	
	
	
</body>
</html>