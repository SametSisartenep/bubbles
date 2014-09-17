$(document).ready(function () {

	$('a').mouseenter(function() {
		$(this).css("color", "#FFFB32");
	}).mouseleave(function () {
		$(this).css("color", "#FFF");
	});

	$('li').mouseenter(function () {
		$(this).css("color", "#FFFF00");
	}).mouseleave(function () {
		$(this).css("color", "#FFF");
	});

});