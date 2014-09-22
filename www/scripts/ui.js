$(document).ready(function () {

	var prevColor;

	$('a').mouseenter(function() {
		prevColor = $(this).css("color");
		$(this).css("color", "#FFFB32");
	}).mouseleave(function () {
		$(this).css("color", prevColor);
	});

	$('li').mouseenter(function () {
		prevColor = $(this).css("color");
		$(this).css("color", "#FFFF00");
	}).mouseleave(function () {
		$(this).css("color", prevColor);
	});

});