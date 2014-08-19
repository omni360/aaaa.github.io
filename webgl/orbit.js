/* 
* @Author: omni360
* @Date:   2014-08-19 20:05:12
* @Last Modified by:   omni360
* @Last Modified time: 2014-08-19 22:01:03
*/

//自定义一个轨道类
Orbit = function(){
	Sim.Object.call(this);

}

Orbit.prototype = new Sim.Object();
Orbit.prototype.init = function(distance){
	//创建一个空的集合体对象用于装在线的顶点数据
	var geometry = new THREE.Geometry();

	//创建圆周
/*	with radius == distance
*/
	var i,len = 60,twopi = 2*Math.PI;
	for(i=0;i<=Orbit.N_SEGMENTS;i++){
		var x = distance * Math.cos(i / Orbit.N_SEGMENTS * twopi);
		var z = distance * Math.sin(i / Orbit.N_SEGMENTS * twopi);
		var vertex = new THREE.Vertex(new THREE.Vector3( x, 0, z ));
		geometry.vertices.push(vertex);

	}

	material = THREE.LineBasicMaterial( {color:0xffffff,opacity:.5,linewidth:2} );

	//创建线
	var line = new THREE.Line( geometry, material );

	//把对象反馈给框架
	this.setObject3D(line);

}

Orbit.N_SEGMENTS = 120;