 
var showDebug = false;
var isReplay = true;
var okShadow = false;
var scheduler = false;
var nbrPartMax = 700;
var nbrPartSfMax = nbrPartMax;

// TUMULT
noise.seed(Math.random());


/*
Render Order
0 -
1 - Stars
2 - Ico...
3 - Ground
*/

var Awidth = 300,  Aheight = 300;
var scene = AFRAME.scenes[0].object3D;
var refNow = Date.now();
var refScene = Date.now();

var nodeType  = Object.freeze({GROUND: 1, SKY: 2, HEAD: 3, BDC: 4, VOID: 0});


var rayCaster, INTERSECTED;
var gaze = {};
  gaze.idObject = -1;
  gaze.timeRef = 0;
  gaze.shortGaze = 1000;
  gaze.longGaze = 3000;


// All
var myQuat = new THREE.Quaternion();
var myPos = new THREE.Vector3();
var sky = new THREE.Group();
var starFd = {};
var sfdPos, sfdCol; 
var sfd = {};
sfd.scale = 6;
sky.radius = 6;
var posSf = [], colSf = [];

var me = {}; me.id = 0; me.teta = Math.PI*0.5; me.phi = 0;
var listLight = [];
var spotLight;


init();
animate();

// ==========


function onKeyPressed(event)  {


	switch(event.key) {
	case 'a':
    //	scene.add( starFd.clone() );
		break;
	case 'd':
		showDebug = !showDebug;
		if(showDebug) {
			document.getElementsByTagName("a-scene")[0].setAttribute("stats", true);
		} else {
			document.getElementsByTagName("a-scene")[0].removeAttribute("stats");
		}
		break;
	}

}

// ==================================
// ======== INIT ==================== ================
// ==================================

function init() {
  
	refScene = Date.now();

  	document.addEventListener("keydown", onKeyPressed, false); 

	// Global creation (doesn't depend on scene)
  	render.createGround();
  	render.createSky();
	render.createStarField();

    // Light

	//var geoL = new THREE.IcosahedronGeometry( 0.2, 3 );
	//var matL = new THREE.MeshStandardtMaterial( { color: 0xffffff } );

/*
var light = new THREE.PointLight( 0xff0077, 1, 30 );
light.position.set( 5, 5, 5 );
light.castShadow = true;
scene.add( light );

var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
scene.add( pointLightHelper );

var light2 = new THREE.PointLight( 0x5533ff, 1, 30 );
light2.position.set( -5, 5, -5 );
light2.castShadow = true;
scene.add( light2 );

var pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize );
scene.add( pointLightHelper2 );
  var light3 = new THREE.DirectionalLight( 0xFFFFFF, 0.8 );
  light3.position.set( 0, -1, 0 ).normalize();
  light3.castShadow = true;
  scene.add( light3 ); 
  listLight.push(light3);
*/


  var light1 = new THREE.DirectionalLight( 0x5599ff, 0.15 );
  light1.position.set( 0, 1, 1 ).normalize();
  light1.castShadow = true;
  light1.shadowCameraVisible = true;
  scene.add( light1 ); 
  listLight.push(light1);
	
  var light2 = new THREE.DirectionalLight( 0xff5577, 0.25);
  light2.position.set( -1, 1, -1 ).normalize();
  light2.castShadow = true;
  light2.shadowCameraVisible = true;
  scene.add( light2 ); 
  listLight.push(light2);
 
  //var light3 = new THREE.DirectionalLight( 0x222244, 0.8 );
  var light3 = new THREE.DirectionalLight( 0xFFFFFF, 0.2 );
  light3.position.set( 0, -1, 0 ).normalize();
  light3.castShadow = true;
  light3.shadowCameraVisible = true;
  scene.add( light3 ); 
  listLight.push(light3);


spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 20, 0 );
spotLight.castShadow = true;
spotLight.angle = Math.PI/6;
spotLight.penumbra = 1;
spotLight.intensity = 0.5
scene.add( spotLight );


//var spotLightHelper = new THREE.SpotLightHelper( spotLight );
//scene.add( spotLightHelper );




}

// ==================================
// ======== ANIMATE  ================ ================
// ==================================

function animate() {

	// Fade to apparition of sky
	if(sky.children[0].material.opacity < 0.99) {
		var tOp = (Date.now() - refScene)/1000;
		sky.children[0].material.opacity = Math.min(tOp/5,1); 
		sky.children[1].material.opacity = Math.min(tOp/5,1)*0.4; 
	}


	sky.children[0].rotation.set(0,Math.cos(Date.now()*0.0004)*0.3,0);
	sky.children[1].rotation.set(0,Math.cos(Date.now()*0.00035+2)*0.3,0);
	requestAnimationFrame( animate );
}


