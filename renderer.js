var render = {};

// ===========================
// Create Entity
// ===========================

render.createEntity = function(name, time) {


	let grpEntity = new THREE.Group();

    // 0) Parametres
    let xHueVar = 0;
    let baseHue = 0;
    let howMuchFill = 0; // and if
    let howMuchDot = 0; // and if
    
    let speedBreath = 0;
    let speedRandWalk = 0;
    let speedComeToYou = 0;

    let speedPerlin = 0;
    let speedRot1 = 0;
    let speedRot2 = 0;

    let howMuchOcclusion1 = 0;
    let howMuchOcclusion2 = 0;


    // How big ?
    // How much s, l, xHue and startHue ?

    // How much randomdot
    // How much fill ?


    // 1) Handling colors
  
    let s = Math.random()*0.4 + 0.3;
    let l = Math.random()*0.3 + 0.35;

    let xHue = Math.random()*0.1 + 0.15; // 0.15 <=> 0.25
    let h1 = Math.random();
    let h2 = (h1 + xHue); if(h2 > 1) h2-=1;
    let h3 = (h2 + xHue); if(h3 > 1) h3-=1;
  
    // 2) colors
    let c1 = new THREE.Color(); c1.setHSL(h1, s, l);
    let c2 = new THREE.Color(); c1.setHSL(h2, s, l);
    let c3 = new THREE.Color(); c1.setHSL(h3, s, l);


    // Random colors on face (and explore what shader ? Lamber, or flat)
    // Random regular polyhedre ?
    // Semi random size ?(low diff)



    // 1)
	let geoE1 = new THREE.IcosahedronGeometry( 5, 1 );
	geoE1.computeFlatVertexNormals();
    let matE1 = new THREE.MeshMatcapMaterial( { vertexColors: true, matcap: matcap } );
    matE1.color.setHex(Math.random() * 0xffffff);
	let entity1 = new THREE.Mesh( geoE1, matE1 );
	// Occlusion of faces
	for(var i = 0; i < 0; ++i) {
		var rand = Math.floor(Math.random()*entity1.geometry.faces.length)
		entity1.geometry.faces.splice(rand, 1);
	}
    entity1.castShadow = true;
    grpEntity.add(entity1);

    // 1)
	let geoE2 = new THREE.IcosahedronGeometry( 6, 1 );
	geoE2.computeFlatVertexNormals();
    let matE2 = new THREE.MeshMatcapMaterial( { vertexColors: true, matcap: matcap } );
    matE2.color.setHex(Math.random() * 0xffffff);
	let entity2 = new THREE.Mesh( geoE2, matE2 );
	// Occlusion of faces
	for(var i = 0; i < 60; ++i) {
		var rand = Math.floor(Math.random()*entity2.geometry.faces.length)
		entity2.geometry.faces.splice(rand, 1);
	}
    entity2.castShadow = true;
    grpEntity.add(entity2);

    // 3)
	let geoE3 = new THREE.IcosahedronGeometry( 8, 1 );
	geoE3.computeFlatVertexNormals();
    let matE3 = new THREE.MeshMatcapMaterial( { vertexColors: true, matcap: matcap, transparent: true, opacity: 0.7 } );
    matE3.color.setHex(Math.random() * 0xffffff);
	let entity3 = new THREE.Mesh( geoE3, matE3 );
	// Occlusion of faces
	for(var i = 0; i < 60; ++i) {
		var rand = Math.floor(Math.random()*entity3.geometry.faces.length)
		entity3.geometry.faces.splice(rand, 1);
	}
    entity3.castShadow = true;
    grpEntity.add(entity3);


    grpEntity.id = Math.floor( Math.random() * 999999);

    grpEntity.aa = new THREE.Spherical();
    grpEntity.a = new THREE.Spherical();
    grpEntity.s = new THREE.Spherical();
    grpEntity.p = new THREE.Spherical(THREE.Math.randFloat( sMin, sMax ),
                                      Math.random()*Math.PI,
                                      Math.random()*Math.PI*2);

	grpEntity.rotation.set(Math.random()*3.14,Math.random()*3.14,Math.random()*3.14);
	grpEntity.position.setFromSpherical( grpEntity.p )


    grpEntity.attracted = false;

	listEntities.add(grpEntity);

}


// ===========================
// Create Sky
// ===========================

render.createSky = function() {
	// Skysky
	sky.renderOrder = 3;
	scene.add( sky );


    // 0) FARAR AND SMALLALL AND STRONGONG
	let geoS0 = new THREE.IcosahedronGeometry( 400, 4 );
	let matS0 = new THREE.MeshLambertMaterial( { color: 0xffffff, side:THREE.BackSide,
											transparent: true, opacity:0 } );

	geoS0.computeFlatVertexNormals();
	let skysky0 = new THREE.Mesh( geoS0, matS0 );
	skysky0.rotation.set(Math.random()*3.14,Math.random()*3.14,Math.random()*3.14);

	// Occlusion of faces
	for(var i = 0; i < 5000; ++i) {
		var rand = Math.floor(Math.random()*skysky0.geometry.faces.length)
		skysky0.geometry.faces.splice(rand, 1);
	}

    skysky0.receiveShadow = true;
	sky.add(skysky0);


    // 1) FAR AND SMALL AND STRONG
	let geoS1 = new THREE.IcosahedronGeometry( 200, 2 );
	let matS1 = new THREE.MeshLambertMaterial( { color: 0xffffff, side:THREE.BackSide,
											transparent: true, opacity:0 } );

	geoS1.computeFlatVertexNormals();
	let skysky1 = new THREE.Mesh( geoS1, matS1 );
	skysky1.rotation.set(Math.random()*3.14,Math.random()*3.14,Math.random()*3.14);

	// Occlusion of faces
	for(var i = 0; i < 50; ++i) {
		var rand = Math.floor(Math.random()*skysky1.geometry.faces.length)
		skysky1.geometry.faces.splice(rand, 1);
	}
    skysky1.receiveShadow = true;
	sky.add(skysky1);


    // 2) CLOSE AND BIG AND WEAK
	let geoS2 = new THREE.IcosahedronGeometry( 100, 1 );
	let matS2 = new THREE.MeshLambertMaterial( { color: 0xffffff, side:THREE.BackSide,
											transparent: true, opacity:0 } );
	geoS2.computeFlatVertexNormals();
	let skysky2 = new THREE.Mesh( geoS2, matS2 );
	skysky2.rotation.set(Math.random()*3.14,Math.random()*3.14,Math.random()*3.14);

	// Occlusion of faces
	for(var i = 0; i < 25; ++i) {
		var rand = Math.floor(Math.random()*skysky2.geometry.faces.length)
		skysky2.geometry.faces.splice(rand, 1);
	}

    skysky2.receiveShadow = true;
	sky.add(skysky2);

	let geoS3 = new THREE.IcosahedronBufferGeometry( sky.radius + 1, 2 );
	let wireframe = new THREE.WireframeGeometry( geoS3 );
	let line = new THREE.LineSegments( wireframe );
	//line.material.depthTest = false;
	line.material.color = new THREE.Color(' 0xffffff');
	line.material.opacity = 0.1;
	line.material.transparent = true;
	scene.add( line );

}

