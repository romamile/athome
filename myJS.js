
var showDebug = false;
var isReplay = true;
var okShadow = false;
var scheduler = false;
var nbrPartMax = 700;
var nbrPartSfMax = nbrPartMax;

// TUMULT
noise.seed(Math.random());

var sMax = 85, sMin = 20;

var scene = AFRAME.scenes[0].object3D;
var refScene = Date.now();

var raycaster = new THREE.Raycaster();
var gaze = {};
  gaze.idObject = -1;
  gaze.timeRef = 0;
  gaze.shortGaze = 1000;
  gaze.longGaze = 3000;

var sky = new THREE.Group();
sky.radius = 100;
var listEntities = new THREE.Group();

var matcap = new THREE.TextureLoader().load( 'matCap1.png' );

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
		if(showDebug) { document.getElementsByTagName("a-scene")[0].setAttribute("stats", true);
		} else {        document.getElementsByTagName("a-scene")[0].removeAttribute("stats");    }
		break;
    case ' ':
        render.createEntity(null, null);
        break;
	}

}

// ==================================
// ======== INIT ==================== ================
// ==================================

function init() {
  
	refScene = Date.now();
  	document.addEventListener("keydown", onKeyPressed, false); 

    scene.add(listEntities);
  	render.createSky();

    // Light

  var light1 = new THREE.DirectionalLight( 0x5599ff, 0.15 );
  light1.position.set( 0, 0, -1 ).normalize();
  light1.castShadow = true;
  light1.shadowCameraVisible = true;
  scene.add( light1 ); 
	
  var light2 = new THREE.DirectionalLight( 0xff5577, 0.25);
  light2.position.set( 1, 1, 0 ).normalize();
  light2.castShadow = true;
  light2.shadowCameraVisible = true;
  scene.add( light2 ); 
 
  //var light3 = new THREE.DirectionalLight( 0x222244, 0.8 );
  var light3 = new THREE.DirectionalLight( 0xFFFFFF, 0.2 );
  light3.position.set( -1, -1, 0 ).normalize();
  light3.castShadow = true;
  light3.shadowCameraVisible = true;
  scene.add( light3 ); 

}

// ==================================
// ======== ANIMATE  ================ ================
// ==================================

function animate() {

	// 0) Fade to apparition of sky
	if(sky.children[0].material.opacity < 0.99) {
		var tOp = (Date.now() - refScene)/1000;
		sky.children[0].material.opacity = Math.min(tOp/5,1); 
		sky.children[1].material.opacity = Math.min(tOp/5,1)*0.98; 
		sky.children[2].material.opacity = Math.min(tOp/5,1)*0.4; 
	}


    // 1) Rotation of sky
	sky.children[0].rotation.set(0, 0, Math.cos(Date.now()*0.0003+1)*0.33);
	sky.children[1].rotation.set(Math.cos(Date.now()*0.00035+2)*0.3,0,0);
	sky.children[2].rotation.set(0,Math.cos(Date.now()*0.0004)*0.27,0);



    // 2) behavior of the entity
    listEntities.children.forEach(function(it) {

            
        // 2.a) GROUP
        let p = 0.00001, pp = 100;
        it.aa.set( (Math.random()-0.5)*p, (Math.random()-0.5)*p/10, (Math.random()-0.5)*p/10) 
        

        it.a.radius += it.aa.radius; it.a.radius*=0.95;
        it.a.phi    += it.aa.phi;    it.a.phi*=0.95;
        it.a.theta  += it.aa.theta;  it.a.theta*=0.95;

        it.s.radius += it.a.radius; it.s.radius*=0.95;
        it.s.phi    += it.a.phi;    it.s.phi*=0.95;
        it.s.theta  += it.a.theta;  it.s.theta*=0.95;
        
        if(it.attracted) {
            it.a.radius = Math.min(it.a.radius, 0);
            it.aa.radius = Math.min(it.aa.radius, 0);
            it.s.radius = -0.3;
        }

        it.p.radius += it.s.radius;
        it.p.phi    += pp * it.s.phi;
        it.p.theta  += pp * it.s.theta;

        if(!(sMin < it.p.radius && it.p.radius < sMax)) {
            it.s.radius *= -1;
        }
        
        it.position.setFromSpherical(it.p);


        // 2.b) Shell
/*
        it.children[0].rotation.x = noise.simplex2(0, Date.now()/100000) * 2*Math.PI*12;
        it.children[0].rotation.x = noise.simplex2(100, Date.now()/100000)* 2*Math.PI*12;
        it.children[0].rotation.x = noise.simplex2(100000, Date.now()/100000)* 2*Math.PI*12;

        it.children[1].rotation.y = Date.now()/1000;

        it.children[2].rotation.y = Date.now()/500;
*/
        it.children[1].scale.setScalar( 1 + 0.1*Math.sin(Date.now()/300) ); // 300 <> 3000
        it.children[2].scale.setScalar( 1 + 0.2*Math.sin(Date.now()/300) );

        // 2.c) Around


    }); 

    
    // 3) Gaze
    raycaster.setFromCamera( new THREE.Vector2(0,0), document.querySelector('a-scene').camera );
    var intersects = raycaster.intersectObjects( listEntities.children );

	if ( intersects.length > 0 ) {
        // Check if new object
        if(gaze.idObject != intersects[0].object.id) {
            gaze.idObject = intersects[0].object.id;
            gaze.timeRef = (new Date()).getTime();
            gaze.done = false;
			reticulumToActive(false);
        } else {
            // Test if suffisantly long gaze
            if(gaze.done != true && gaze.timeRef != 0 && (new Date()).getTime() > gaze.timeRef + gaze.shortGaze) {
                intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
                intersects[0].object.attracted = true;

				reticulumToActive(true);

                gaze.done = true;
            }
        }  
	} else {
		if(gaze.idObject != -1) { // After a gaze stopped
			reticulumToInactive();
		}
		gaze.idObject = -1;
		gaze.timeRef = 0;
        gaze.done = false;

    }


    // *) neeeext
	requestAnimationFrame( animate );
}


// ==================================
// ======== UTILS FUNCTIONS  ======== ================
// ==================================

reticulumToActive = function(longOrShortGaze) {
	let ret = document.getElementsByClassName("tstRet");
	for (let i = 0; i < ret.length; i++) {
	  ret[i].style.fill = "red";
	}
}


reticulumToInactive = function() {
	let ret = document.getElementsByClassName("tstRet");
	for (let i = 0; i < ret.length; i++) {
	  ret[i].style.fill = "white";
	}
}

