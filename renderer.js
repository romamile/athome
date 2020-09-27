var render = {};


// ===========================
// Create Billboards
// ===========================

render.createBillboard = function() {
	
var map = new THREE.TextureLoader().load( "textures/tst.png" );
map.wrapS = THREE.RepeatWrapping;
map.wrapT = THREE.RepeatWrapping;
map.repeat.set( 0.1, 0.1 );
map.minFilter = map.magFilter = THREE.LinearFilter;
map.anisotropy = 4;


	let hBill = 7;
	let lBill = 4;
	let lSide = 2*lBill*Math.tan(Math.PI/3)
	
	let lHeight = lSide * 0.5;
	let rectShape = new THREE.Shape();

	rectShape.moveTo( -lSide/2, -lHeight/2 );
	rectShape.lineTo( -lSide/2,  lHeight/2 );
	rectShape.lineTo(  lSide/2,  lHeight/2 );
	rectShape.lineTo(  lSide/2, -lHeight/2 );
	rectShape.lineTo( -lSide/2, -lHeight/2 );
	rectShape.moveTo( 0, 0 );

	let geometry = new THREE.ShapeBufferGeometry( rectShape );
	//let matBill = new THREE.MeshLambertMaterial( { side: THREE.DoubleSide, color:0x333349 });
	let matBill = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, map:map});


	let bill1 = new THREE.Mesh( geometry, matBill );
	bill1.rotation.set( 0, Math.PI*2/3, 0);
	bill1.position.set( Math.cos(Math.PI*5/6)*lBill, hBill, Math.sin(Math.PI*5/6)*lBill );
	//bill1.castShadow = true;

	let bill2 = new THREE.Mesh( geometry, matBill );
	bill2.rotation.set( 0, Math.PI*4/3, 0);
	bill2.position.set( Math.cos(Math.PI*1/6)*lBill, hBill, Math.sin(Math.PI*1/6)*lBill);
	//bill2.castShadow = true;

	let bill3 = new THREE.Mesh( geometry, matBill );
	bill3.rotation.set( 0, Math.PI*6/3, 0);
	bill3.position.set( Math.cos(Math.PI*9/6)*lBill, hBill, Math.sin(Math.PI*9/6)*lBill);
	//bill3.castShadow = true;

	let geocyl = new THREE.CylinderGeometry( 0.3, 0.3, hBill+14, 12 );
	let matcyl = new THREE.MeshBasicMaterial( {color: 0x885555} );
	var cylinder = new THREE.Mesh( geocyl, matcyl );
	cylinder.castShadow = true;

	billboards.add(bill1);
	billboards.add(bill2);
	billboards.add(bill3);
	billboards.add(cylinder);
	scene.add( billboards );

}

render.detroyBillboard = function() {

}

// ===========================
// Create Sky
// ===========================

render.createSky = function() {
	// Skysky
	sky.renderOrder = 3;
	scene.add( sky );

	let geoS1 = new THREE.IcosahedronGeometry( 200, 2 );
	let matS1 = new THREE.MeshLambertMaterial( { color: 0xffffff, side:THREE.BackSide,
											transparent: true, opacity:0 } );

	geoS1.computeFlatVertexNormals();
	let skysky1 = new THREE.Mesh( geoS1, matS1 );
	skysky1.position.set(0,0,0);
	skysky1.rotation.set(2, 4, 5);

	// Deletion of faces under 0
	for(var i = 0; i < skysky1.geometry.faces.length; ++i) {
		if(skysky1.geometry.vertices[ skysky1.geometry.faces[i].a ].y < 0) {
		   skysky1.geometry.faces.splice(i, 1);
		   	i--;
		}
	}

	// Occlusion of faces
	for(var i = 0; i < 50; ++i) {
		var rand = Math.floor(Math.random()*skysky1.geometry.faces.length)
		skysky1.geometry.faces.splice(rand, 1);
	}
	sky.add(skysky1);


	let geoS2 = new THREE.IcosahedronGeometry( 100, 1 );
	let matS2 = new THREE.MeshLambertMaterial( { color: 0xffffff, side:THREE.BackSide,
											transparent: true, opacity:0 } );
	geoS2.computeFlatVertexNormals();
	let skysky2 = new THREE.Mesh( geoS2, matS2 );

	// Occlusion of faces
	for(var i = 0; i < 25; ++i) {
		var rand = Math.floor(Math.random()*skysky2.geometry.faces.length)
		skysky2.geometry.faces.splice(rand, 1);
	}

	// Deletion of faces under 0
	for(var i = 0; i < skysky2.geometry.faces.length; ++i) {
		if(skysky2.geometry.vertices[ skysky2.geometry.faces[i].a ].y < 0) {
		   skysky2.geometry.faces.splice(i, 1);
		   	i--;
		}
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
// Create VR Heads/screens
// ===========================

render.createVoy = function() {
    let lSide = 0.1
    let lHeight = 0.05;
    let rectShape = new THREE.Shape();
    
    rectShape.moveTo( -lSide/2, -lHeight/2 );
    rectShape.lineTo( -lSide/2,  lHeight/2 );
    rectShape.lineTo(  lSide/2,  lHeight/2 );
    rectShape.lineTo(  lSide/2, -lHeight/2 );
    rectShape.lineTo( -lSide/2, -lHeight/2 );
    rectShape.moveTo( 0, 0 );

    let geometry = new THREE.ShapeBufferGeometry( rectShape );
    let matVoy = new THREE.MeshLambertMaterial( { side: THREE.DoubleSide, color:0xFFBBDD });
    
    let voy1 = new THREE.Mesh( geometry, matVoy );
    voy1.position.y = 1;
    scene.add( voy1 );
    listVoy.push( voy1 );

    let voy2 = new THREE.Mesh( geometry, matVoy );
    voy2.position.y = 1;
    scene.add( voy2  );
    listVoy.push( voy2 );
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
// Create a Tree
// ===========================

render.createTree = function() {

    // manager

    function loadModel() {
        object.traverse( function ( child ) {
            if ( child.isMesh ) child.material.map = texture;
        } );
    	object.position.x = - 9;
        object.scale.set(6,6,6);
        object.rotation.set(-0.25*Math.PI,0.25*Math.PI,0.25*Math.PI);
        scene.add( object );
    }

    var manager = new THREE.LoadingManager( loadModel );

    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    // texture

    var textureLoader = new THREE.TextureLoader( manager );
    //var texture = textureLoader.load( 'assets/UV_Grid_Sm.jpg' );
    //var texture = textureLoader.load( 'assets/treeTexture.dds' );
    var texture = textureLoader.load( 'assets/treeTexture.jpg' );

    // model
    function onProgress( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    }

    function onError() {}

    var loader = new THREE.OBJLoader( manager );

    loader.load( './assets/Arbre_LowPoly-40.obj', function ( obj ) {
        object = obj;
    }, onProgress, onError );

}


// ===========================
// Create the sky
// ===========================

render.createSky2 = function() {
  // 1) Reset Sky
  for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
    var node = scene.children[ i ];
    if ( node.type == nodeType.SKY ) {
        node.geometry.dispose();
        node.material.dispose();
        scene.remove(node); 
    } 
  }

  var l = 20;
  var h = l * Math.sqrt(0.75);
  var dep = 1000;

  var n_i = Math.floor( (Awidth + dep) /l);
  var n_j = Math.floor( (Aheight+ dep) /h);


  var geo = new THREE.Geometry(); 

  for(var j = 0; j <= n_j; ++j) 
  for(var i = 0; i <= n_i; ++i) { 

    //var skyH = 40 + Math.random()*20;
    var pp = 1.4
    var skyH = 130 - Math.pow(Math.abs(i-n_i*0.5), pp) - Math.pow(Math.abs(j-n_j*0.5), pp) + Math.random()*20;

    // Vertices
    if( j%2 == 0 ) {
        geo.vertices.push(new THREE.Vector3( -dep*0.5 + i * l         , skyH, -dep*0.5 + j * h));
    } else {
        geo.vertices.push(new THREE.Vector3( -dep*0.5 + (0.5 + i) * l , skyH, -dep*0.5 + j * h));
    }
        
    geo.vertices[geo.vertices.length-1].baseY = skyH;

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


  //var mat = new THREE.MeshPhongMaterial( {color:0x594999} );
  var mat = new THREE.MeshPhongMaterial( {color:0x999999} );
  mat.side = THREE.DoubleSide;
  mat.transparent = true;
  mat.opacity = 0.5;

  skyMesh = new THREE.Mesh( geo, mat );
  skyMesh.nodeType == nodeType.SKY;
  skyMesh.position.set(-Awidth/2, 0, -Aheight/2);
  skyMesh.type = nodeType.SKY;
  skyMesh.seed = 100;
  scene.add(skyMesh);
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



