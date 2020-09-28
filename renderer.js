var render = {};

// ===========================
// Create Entity
// ===========================

render.createEntity = function(name, time) {


    // Random colors on face (and explore what shader ? Lamber, or flat)
    // Random regular polyhedre ?
    // Semi random size ?(low diff)


	let geoE = new THREE.IcosahedronGeometry( 5, 1 );
	geoE.computeFlatVertexNormals();
	//let matE = new THREE.MeshLambertMaterial( { vertexColors: THREE.FaceColors } );
	let matE = new THREE.MeshLambertMaterial( { vertexColors: true } );
	let entity = new THREE.Mesh( geoE, matE );

	for(var i = 0; i < entity.geometry.faces.length; ++i) {
		entity.geometry.faces[i].color = new THREE.Color( Math.random()*0.6+0.2, Math.random()*0.6+0.2, Math.random()*0.6+0.2); 
	}



	entity.rotation.set(Math.random()*3.14,Math.random()*3.14,Math.random()*3.14);
	entity.position.setFromSphericalCoords( THREE.Math.randFloat( 30, 85 ), Math.random()*Math.PI - Math.PI/2, Math.random()*Math.PI*2)

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



