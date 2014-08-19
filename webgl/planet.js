/* 
* @Author: omni360
* @Date:   2014-08-19 20:44:45
* @Last Modified by:   omni360
* @Last Modified time: 2014-08-19 21:03:00
*/
//自定义行星类
Planet = function(){
	Sim.Object.call(this);

}

Planet.prototype = new Sim.Object();
Planet.prototype.init = function(param){
	//创建一个轨道组来模拟行星轨道，这是行星组的最高层级
	var planetOrbitGroup = new THREE.Object3D();

	//传递行星轨道给框架
	this.setObject3D(planetOrbitGroup);

	//创建一个包含行星和云的网格。
	var planetGroup = new THREE.Object3D();
	var distance = param.distance || 0;
	var distsquared = distance * distance;
	planetGroup.position.set(Math.sqrt(distsquared/2),0,-Math.sqrt(distsquared/2));
	planetOrbitGroup.add(planetGroup);

	this.planetGroup = planetGroup;
	var size = param.size || 1;
	this.planetGroup.scale.set(size,size,size);

	var map = param.map;
	this.createGlobe(map);

	this.animateOrbit = param.animateOrbit;
	this.period = param.period;
	this.revolutionSpeed = param.revolutionSpeed ? param.revolutionSpeed : Planet.REVOLUTION_Y;
}
Planet.prototype.createGlobe = function(map){
	//创建行星纹理
	var geometry = new THREE.SphereGeometry( 1,32,32);
	var texture = THREE.ImageUtils.loadTexture(map);
	var material = new THREE.MeshPhongMaterial( {map:texture,ambient:0x333333} );
	var globeMesh = new THREE.Mesh(geometry,material);

	//增加到我们的群组中
	this.planetGroup.add(globeMesh);

	//保存它
	this.globeMesh = globeMesh;
}
Planet.prototype.update = function(){
	//模拟轨道
	if(this.animateOrbit){
		this.object3D.rotation.y += this.revolutionSpeed / this.period;

	}
	Sim.Object.prototype.update.call(this);
}
Planet.REVOLUTION_Y = 0.003;
