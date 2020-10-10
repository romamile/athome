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
    var matcap1 = new THREE.TextureLoader().load( 'matCap1.png' );
    let matE1 = new THREE.MeshMatcapMaterial( { vertexColors: true, matcap: matcap1 } );
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
    var matcap2 = new THREE.TextureLoader().load( 'matCap1.png' );
    let matE2 = new THREE.MeshMatcapMaterial( { vertexColors: true, matcap: matcap2 } );
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
    var matcap3 = new THREE.TextureLoader().load( 'matCap1.png' );
    let matE3 = new THREE.MeshMatcapMaterial( { vertexColors: true, matcap: matcap3, transparent: true, opacity: 0.7 } );
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


render.createEntityOld = function(name, time) {


    // 0) Parametres

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



	let geoE = new THREE.IcosahedronGeometry( 5, 1 );
	geoE.computeFlatVertexNormals();

    
    var matcap = new THREE.TextureLoader().load( 'matCap1.png' );
    let matE = new THREE.MeshMatcapMaterial( { vertexColors: true, matcap: matcap } );
    //matE.color.setHex(Math.random() * 0xffffff);

	//let matE = new THREE.MeshBasicMaterial( { vertexColors: true } );
	//let matE = new THREE.MeshLambertMaterial( { vertexColors: true } );
	let entity = new THREE.Mesh( geoE, matE );

    // 1) Patterns 

    // 1.1) FILL
	for(let i = 0; i < entity.geometry.faces.length; ++i) {
		entity.geometry.faces[i].color = new THREE.Color(1,0,0); 
	}

    // 1.2) RANDOM DOTS
    //let nbrRandDots = 10; 
    //for(let i = 0; i < nbrRandDots; ++i) {
	//	entity.geometry.faces[i].color = new THREE.Color( Math.random()*0.6+0.2, Math.random()*0.6+0.2, Math.random()*0.6+0.2); 
	//}

    // 1.3) RANDOM ZONE
    let sizeZone = 15;
    let offsetZone = Math.floor( Math.random() * (entity.geometry.faces.length-sizeZone) );
    for(let i = offsetZone; i < offsetZone + sizeZone; ++i) {
		entity.geometry.faces[i].color = new THREE.Color( 1.0, 0, 0); 
	}
    




    entity.id = Math.floor( Math.random() * 999999);

    entity.aa = new THREE.Spherical();
    entity.a = new THREE.Spherical();
    entity.s = new THREE.Spherical();
    entity.p = new THREE.Spherical(THREE.Math.randFloat( sMin, sMax ), Math.random()*Math.PI - Math.PI/2, Math.random()*Math.PI*2);

	entity.rotation.set(Math.random()*3.14,Math.random()*3.14,Math.random()*3.14);
	entity.position.setFromSpherical( entity.s )


    entity.attracted = false;

	listEntities.add(entity);

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


// ===========================
// Create a Star field
// ===========================

render.createStarField = function() {


	let starsGeometryBuff = new THREE.BufferGeometry();
	starsGeometryBuff.setAttribute = function ( name, attribute ) {
		this.attributes[ name ] = attribute;
		return this;
	};


	var shaderMaterial = new THREE.ShaderMaterial( {
		vertexShader: document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
		vertexColors: true
	} );


	for ( let i = 0; i < nbrPartMax; i ++ ) {
		let star = new THREE.Vector3();
        	star.setFromSphericalCoords( THREE.Math.randFloat( 30,600 ), Math.random()*Math.PI - Math.PI/2, Math.random()*Math.PI*2)
		posSf.push( star.x );
		posSf.push( star.y );
		posSf.push( star.z );
		colSf.push( 1 );
		colSf.push( 1 );
		colSf.push( 1 );
	}

	starsGeometryBuff.addAttribute( 'position', new THREE.Float32BufferAttribute( posSf, 3 ) );
	starsGeometryBuff.addAttribute( 'color',    new THREE.Float32BufferAttribute( colSf, 3 ) );
	//starsGeometryBuff.addAttribute( 'color',    new THREE.Uint8BufferAttribute( colSf, 3 ) );

	starFd = new THREE.Points( starsGeometryBuff, shaderMaterial );
	starFd.renderOrder = 1;
	starFd.prevNbrPart = 0;
    starFd.myName = "starfield";
	starFd.scale.set(sfd.scale, sfd.scale, sfd.scaleD);

	starFd.rotation.set(-Math.PI/2,0,0);
	scene.add( starFd );


    sfdPos = starFd.geometry.attributes.position.array;
    sfdCol = starFd.geometry.attributes.color.array;

}


render.updateStarField = function(_nbrPart) {

    // Del Old one
      for ( i = AFRAME.scenes[0].object3D.children.length - 1; i >= 0 ; i -- ) {
        var node = AFRAME.scenes[0].object3D.children[ i ];
        if ( node.myName === "starfield" ) {
            node.geometry.dispose();
            node.material.dispose();
            AFRAME.scenes[0].object3D.remove(node); 
        } 
      }
    
    // reset buffers
    posSf.length = 0
    colSf.length = 0

    nbrPartSfMax = _nbrPart;

    // Redo geometry
        let starsGeometryBuff = new THREE.BufferGeometry();
        starsGeometryBuff.setAttribute = function ( name, attribute ) {
            this.attributes[ name ] = attribute;
            return this;
        };


        let shaderMaterial = new THREE.ShaderMaterial( {
            vertexShader: document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        } );


        for ( let i = 0; i < nbrPartSfMax; i ++ ) {
            let star = new THREE.Vector3();
                star.setFromSphericalCoords( THREE.Math.randFloat( 30,600 ), Math.random()*Math.PI/2, Math.random()*Math.PI*2)
            posSf.push( star.x );
            posSf.push( star.y );
            posSf.push( star.z );
            colSf.push( 1 );
            colSf.push( 1 );
            colSf.push( 1 );
        }

        starsGeometryBuff.addAttribute( 'position', new THREE.Float32BufferAttribute( posSf, 3 ) );
        starsGeometryBuff.addAttribute( 'color',    new THREE.Float32BufferAttribute( colSf, 3 ) );
        //starsGeometryBuff.addAttribute( 'color',    new THREE.Uint8BufferAttribute( colSf, 3 ) );

        starFd = new THREE.Points( starsGeometryBuff, shaderMaterial );
        starFd.renderOrder = 1;
        starFd.prevNbrPart = 0;
        starFd.scale.set(scaleD, scaleD, scaleD);
        starFd.myName = "starfield";
        scene.add( starFd );

        sfdPos = starFd.geometry.attributes.position.array;
        sfdCol = starFd.geometry.attributes.color.array;
}


// ===========================
// Create ground
// ===========================

render.createGround = function() {

  // 1) Reset Ground
  for ( i = AFRAME.scenes[0].object3D.children.length - 1; i >= 0 ; i -- ) {
    var node = AFRAME.scenes[0].object3D.children[ i ];
    if ( node.type == nodeType.GROUND ) {
        node.geometry.dispose();
        node.material.dispose();
        AFRAME.scenes[0].object3D.remove(node); 
    } 
  }

/*
  var l = 20;
  var h = l; //l * Math.sqrt(0.75);

  var n_i = Math.floor(Awidth /l);
  var n_j = Math.floor(Aheight /h);
*/


  var n_i = 20;
  var n_j = 20;

  var l = Awidth/n_i;
  var h = l; //l * Math.sqrt(0.75);

  var geo = new THREE.Geometry(); 

  var amplitude = 10;
  var amp = 5;

  for(var j = 0; j <= n_j; ++j) 
  for(var i = 0; i <= n_i; ++i) { 

    if((i == n_i/2 -1 && j == n_j/2)
    || (i == n_i/2    && j == n_j/2)
    || (i == n_i/2 +1 && j == n_j/2)

    || (i == n_i/2 -1 && j == n_j/2 +1)
    || (i == n_i/2    && j == n_j/2 +1)

    || (i == n_i/2 -1 && j == n_j/2 -1)
    || (i == n_i/2    && j == n_j/2 -1)
    ) {
        if( j%2 == 0 ) {
            geo.vertices.push(new THREE.Vector3( i * l         , 0, j * h));
        } else {
            geo.vertices.push(new THREE.Vector3( (0.5 + i) * l , 0, j * h));
        }
        continue;
    }


    let r = Math.sqrt((i-n_i/2)*(i-n_i/2) + (j-n_j/2)*(j-n_j/2));
    // Vertices
    if( j%2 == 0 ) {
        geo.vertices.push(new THREE.Vector3( i * l         , amplitude*(0.5-Math.random())*Math.pow(r,0.3)+amp*r, j * h));
    } else {
        geo.vertices.push(new THREE.Vector3( (0.5 + i) * l , amplitude*(0.5-Math.random())*Math.pow(r,0.3)+amp*r, j * h));
    }

  }

  for(var j = 0; j < n_j; ++j)  // < and not <=
  for(var i = 0; i < n_i; ++i) {

    var p1 = j * (n_i+1) + i;
    var p2 = p1 + (n_i+1);

    // Faces
    if( j%2 == 0 ) {
        geo.faces.push( new THREE.Face3( p1+1, p1, p2) );
        geo.faces.push( new THREE.Face3( p2, p2+1, p1+1) );
    } else {
        geo.faces.push( new THREE.Face3( p2+1, p1, p2) );
        geo.faces.push( new THREE.Face3( p2+1, p1+1, p1) );
    }

  }

  geo.computeFaceNormals();

  var mat = new THREE.MeshPhongMaterial( {color:0x999999} );
  //var mat = new THREE.MeshLambertMaterial( {color:0x999999} );
  //mat.shading = THREE.FlatShading

  var groundMesh = new THREE.Mesh( geo, mat );
    groundMesh.renderOrder = 3;
  //var groundMesh = new THREE.Points(geo);
  groundMesh.position.set(-Awidth/2, 0, -Aheight/2);
  groundMesh.type = nodeType.GROUND;

  //groundMesh.receiveShadow = true;
  scene.add(groundMesh);


}



