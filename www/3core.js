$(document).ready(function() {
	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	//var renderer = new THREE.CanvasRenderer();
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColorHex(0xEEEEEE, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	//var axes = new THREE.AxisHelper(20);
	//scene.add(axes);

	var planeGeometry = new THREE.PlaneGeometry(60, 20);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.rotation.x = -0.5 * Math.PI;

	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;

	plane.receiveShadow = true;

	scene.add(plane);

	var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

	cube.position.x = -4;
	cube.position.y = 3;
	cube.position.z = 0;

	cube.castShadow = true;

	scene.add(cube);

	var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff, wireframe: false});
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	sphere.position.x = 20;
	sphere.position.y = 4;
	sphere.position.z = 2;

	sphere.castShadow = true;

	scene.add(sphere);

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(-40, 60, -10);

	spotLight.castShadow = true;

	scene.add(spotLight);

	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);

	$('#WebGL-output').append(renderer.domElement);
	renderer.render(scene, camera);
});