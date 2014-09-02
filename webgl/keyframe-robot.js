/* 
* @Author: omni360
* @Date:   2014-09-01 20:19:30
* @Last Modified by:   omni360
* @Last Modified time: 2014-09-02 21:33:09
*/
//构造函数
RobotApp = function()
{
	Sim.App.call(this);
}

// 继承Sim.app
RobotApp.prototype = new Sim.App();

//我们的自定义初始化函数
RobotApp.prototype.init = function(param){
	//调用父类初始化场景，相机，渲染器等
	Sim.App.prototype.init.call(this,param);

	//创建平行光照亮机器人
	var light = new THREE.DirectionalLight( 0xeeeeff, 1 );
	light.position.set(0,0,1);
	this.scene.add(light);

	this.camera.position.set(0,2.333,8);

	//创建机器人并且添加到我们的sim
	var robot = new Robot();
	robot.init();
	this.addObject(robot);

	//渲染机器人y轴
	this.root.rotation.y = Math.PI / 4;
	this.robot = robot;
	this.animating = false;
	this.robot.subscribe("complete",this,this.onAnimationComplete);
}

RobotApp.prototype.update = function(){
	this.root.rotation.y += 0.005;
	Sim.App.prototype.update.call(this);
}
RobotApp.prototype.handleMouseUp = function(x,y){
	this.animating = !this.animating;
	this.robot.animate(this.animating);
}
RobotApp.prototype.onAnimationComplete = function(){
	this.animating = false;
}
RobotApp.aniamteion_time = 1111;
//robot 类
Robot = function(){
	Sim.Object.call(this);
}
Robot.prototype = new Sim.Object();

Robot.prototype.init = function(){
	//创建装在机器人的群组
	var bodygroup = new THREE.Object3D;
	//把对象反馈给框架
	this.setObject3D(bodygroup);
	var that = this;
	//机器人模型来自-htpp://www.turbosquid.com/fullpreview/index.cfm/47363
	//已获得授权
	var url='./models/robot_cartoon_02/robot_cartoon_02.dae';
	var loader = new Sim.ColladaLoader;
	loader.load(url,function(data){
		that.handleLoaded(data)
	});
}

Robot.prototype.handleLoaded = function(data){
	if(data){
		var model = data.scene;
		//这个模型使用的单位是厘米,而我们工作单位是米,所以要进行转换
		model.scale.set(.01,.01,.01);

		this.object3D.add(model);

		//遍历模型寻找带有名称的各个部分。
		var that = this;
		THREE.SceneUtils.traverseHierarchy(model,function(n){that.traverseCallback(n);});
		this.createAnimation();
	}
}

Robot.prototype.traverseCallback = function(n)
{
	//找到需要发生动画效果的各个部分
	switch (n.name)
	{
		case 'jambe_G' :
			this.left_leg = n;
			break;
		case 'jambe_D' :
			this.right_leg = n;
			break;
		case 'head_container' :
			this.head = n;
			break;
		case 'clef' :
			this.key = n;
			break;
		default :
			break;
	}
}
Robot.prototype.createAnimation = function(){
	this.animator = new Sim.KeyFrameAnimator;
	this.animator.init({
		interps:
		[
			{keys:Robot.bodyRotationKeys,values:Robot.bodyRotationValues,target:this.object3D.rotation},
			    { keys:Robot.headRotationKeys, values:Robot.headRotationValues, target:this.head.rotation }, 
			    { keys:Robot.keyRotationKeys, values:Robot.keyRotationValues, target:this.key.rotation }, 
			    { keys:Robot.leftLegRotationKeys, values:Robot.leftLegRotationValues, target:this.left_leg.rotation }, 
			    { keys:Robot.rightLegRotationKeys, values:Robot.rightLegRotationValues, target:this.right_leg.rotation },
		],
		loop:true,
		duration:RobotApp.aniamteion_time
	});
	this.animator.subscribe("complete",this,this.onAnimationComplete);
	this.addChild(this.animator);
}

Robot.prototype.animate = function(on){
	if(on){
		this.animator.start();
	}
	else{
		this.animator.stop();
	}
}
Robot.prototype.onAnimationComplete = function(){
	this.publish("complete");
}
Robot.headRotationKeys = [0, .25, .5, .75, 1];
Robot.headRotationValues = [ { z: 0 }, 
                                { z: -Math.PI / 96 },
                                { z: 0 },
                                { z: Math.PI / 96 },
                                { z: 0 },
                                ];

Robot.bodyRotationKeys = [0, .25, .5, .75, 1];
Robot.bodyRotationValues = [ { x: 0 }, 
                                { x: -Math.PI / 48 },
                                { x: 0 },
                                { x: Math.PI / 48 },
                                { x: 0 },
                                ];

Robot.keyRotationKeys = [0, .25, .5, .75, 1];
Robot.keyRotationValues = [ { x: 0 }, 
                                { x: Math.PI / 4 },
                                { x: Math.PI / 2 },
                                { x: Math.PI * 3 / 4 },
                                { x: Math.PI },
                                ];

Robot.leftLegRotationKeys = [0, .25, .5, .75, 1];
Robot.leftLegRotationValues = [ { z: 0 }, 
                                { z: Math.PI / 6},
                                { z: 0 },
                                { z: 0 },
                                { z: 0 },
                                ];

Robot.rightLegRotationKeys = [0, .25, .5, .75, 1];
Robot.rightLegRotationValues = [ { z: 0 }, 
                                { z: 0 },
                                { z: 0 },
                                { z: Math.PI / 6},
                                { z: 0 },
                                ];
