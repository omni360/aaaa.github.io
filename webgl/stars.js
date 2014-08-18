/* 
* @Author: omni360
* @Date:   2014-08-15 11:24:29
* @Last Modified by:   omni360
* @Last Modified time: 2014-08-15 13:54:59
*/

//coustom Stars class
Stars = function(){
	Sim.Object.call(this);
}

Stars.prototype = new Sim.Object();

Stars.prototype.init = function(minDistance)
{
	//create a group to hold our stars particles
	var starsGroup = new THREE.Object3D();
	var i;
	var starsGeometry = new THREE.Geometry();

	//create random particle locations
	for(i=0;i<Stars.NVERTICES;i++){
		var vector = new THREE.Vector3( (Math.random() * 2 -1) * minDistance, (Math.random() * 2 - 1) *minDistance, (Math.random() * 2 - 1) * minDistance );
		if (vactor.length() < minDistance) {
			vector = vector.setLength(minDistance);
		}
		starsGeometry.vertices.push(new THREE.Vertex(vector));
	}	

	//create a range of size and colors for the stars
	var starsMaterials = [];
	for(i = 0; i<Stars.NMATERIALS;i++){
		starsMaterials.push(new THREE.ParticleBasicMaterial( {color:0x101010 * (i + 1),size:i % 2 + 1,sizeAttenuation:false} ));
	}
	//create serveral particle systems spread around in a circle, cover the sky
	for(i = 0; i <Stars.NPARTICLESYSTEMS;i++) {
		var stars = THREE.ParticleSystem( starsGeometry, starsMaterials[i % Stars.NMATERIALS]);
		stars.rotation.y = i/(Math.PI * 2);
		starsGroup.add(stars);
	}
	//tell the framework about our object
	this.setObject3D(starsGroup);
}

Stars.NVERTICES = 667;
Stars.NMATERIALS = 8;
Stars.NPARTICLESYSTEMS = 24;
