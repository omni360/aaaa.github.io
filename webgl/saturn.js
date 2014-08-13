/* 
* @Author: omni360
* @Date:   2014-08-13 20:44:50
* @Last Modified by:   omni360
* @Last Modified time: 2014-08-13 21:08:58
*/

Saturn.Rings = function(innerRadius,outerRadius,nSegments){
	THREE.Geometry.call(this);

	var outerRadius = outerRadius || 1,
	innerRadius = innerRadius || .5,
	gridY = nSegments || 10;

	var i,twopi = 2 * Math.PI;
	var iVer = Math.max(2,gridY);

	var origin = new THREE.Vector3( 0, 0, 0 );
	//this .vertices.push(new THREE.Vertex(origin));

	for(i = 0; i<(iVer +1); i++){
		var fRad1 = i / iVer;
		var fRad2 = (i + 1) /iVer;
		var fX1 = innerRadius * Math.cos(fRad1 * twopi);
		var fY1 = innerRadius * Math.sin(fRad1 * twopi);
		var fX2 = innerRadius * Math.cos(fRad1 * twopi);
		var fY2 = innerRadius * Math.sin(fRad1 * twopi);
		var fX4 = innerRadius * Math.cos(fRad2 * twopi);
		var fY4 = innerRadius * Math.sin(fRad2 * twopi);
		var fX3 = innerRadius * Math.cos(fRad2 * twopi);
		var fY3 = innerRadius * Math.sin(fRad2 * twopi);

		var v1 = new THREE.Vector3( fX1, fY1, 0 );
		var v2 = new THREE.Vector3( fX2, fY2, 0 );
		var v3 = new THREE.Vector3( fX3, fY3, 0 );
		var v4 = new THREE.Vector3( fX4, fY4, 0 );
		this.vertices.push(new THREE.Vertex(v1));
		this.vertices.push(new THREE.Vertex(v2));
		this.vertices.push(new THREE.Vertex(v3));
		this.vertices.push(new THREE.Vertex(v4));
	}

	for(i =0;i<iVer;i++){
		this.faces.push(new THREE.Face3( i * 4, i * 4 + 1, i * 4 + 2 ));
		this.faces.push(new THREE.Face3( i * 4, i * 4 + 2, i * 4 + 3 ));
		this.faceVertexUvs[0].push{[
			new THREE.UV(0,1),
			new THREE.UV(1,1),
			new THREE.UV(1,0)
			]};
		this.faceVertexUvs[0].push{[
			new THREE.UV(0,1),
			new THREE.UV(1,0),
			new THREE.UV(0,0)
			]};
	}

	this.computeCentroids();
	this.computeFaceNormals();

	this.boundingSphere = {radius:outerRadius};

};

Saturn.Rings.prototype = new THREE.Geometry();
Saturn.Rings.prototype.constructor = Saturn.Rings;