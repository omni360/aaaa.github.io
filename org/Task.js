draw2d.shape.Task=function(name){
    draw2d.VectorFigure.call(this);
    this.setName(name);
    this.setDimension(90,70);
}
;
draw2d.shape.Task.prototype=new draw2d.VectorFigure;
draw2d.shape.Task.prototype.type="draw2d.shape.Task";

draw2d.shape.Task.prototype.setName=function(name){
    this.label.innerHTML=name;
};

draw2d.shape.Task.prototype.createHTMLElement=function(){
    var item=draw2d.Figure.prototype.createHTMLElement.call(this);
    this.label=document.createElement("div");
    this.label.style.width="100%";
    this.label.style.height="20px";
    this.label.style.position="absolute";
    this.label.style.textAlign="center";
    this.label.style.top="0px";
    this.label.style.left="0px";
    this.label.style.fontSize="8pt";
    return item;
};

draw2d.shape.Task.prototype.setWorkflow=function(param){
    draw2d.VectorFigure.prototype.setWorkflow.call(this,param);
    if(param!=null && this.port==null){
	this.port = new Array();
	this.port[0]=new draw2d.MyOutputPort();
	this.port[0].setWorkflow(param);
	this.port[0].setBackgroundColor(new draw2d.Color(115,115,245));
	this.port[0].setColor(null);
	this.addPort(this.port[0],0,this.height/2);

	this.port[1]=new draw2d.MyOutputPort();
	this.port[1].setWorkflow(param);
	this.port[1].setBackgroundColor(new draw2d.Color(115,115,245));
	this.port[1].setColor(null);
	this.addPort(this.port[1],this.width,this.height/2);

	this.port[2]=new draw2d.MyOutputPort();
	this.port[2].setWorkflow(param);
	this.port[2].setBackgroundColor(new draw2d.Color(115,115,245));
	this.port[2].setColor(null);
	this.addPort(this.port[2],this.width/2,0);

	this.port[3]=new draw2d.MyOutputPort();
	this.port[3].setWorkflow(param);
	this.port[3].setBackgroundColor(new draw2d.Color(115,115,245));
	this.port[3].setColor(null);
	this.addPort(this.port[3],this.width/2,this.height);
    }
}
;
draw2d.shape.Task.prototype.createHTMLElement=function(){
    var item=draw2d.Figure.prototype.createHTMLElement.call(this);
    this.label=document.createElement("div");
    this.label.style.width="100%";
    this.label.style.height="20px";
    this.label.style.position="absolute";
    this.label.style.textAlign="center";
    this.label.style.top="0px";
    this.label.style.left="0px";
    this.label.style.fontSize="12pt";
    return item;
};

draw2d.shape.Task.prototype.onDoubleClick=function(w,h){
    var newName = prompt('Name : ', this.label.innerHTML );

    if( newName != null ) {
	this.setName( newName );
    }

}

draw2d.shape.Task.prototype.setDimension=function(w,h){
    draw2d.VectorFigure.prototype.setDimension.call(this,w,h);
    if(this.port!=null){
	this.port[0].setPosition(0,this.height/2);
	this.port[1].setPosition(this.width,this.height/2);
	this.port[2].setPosition(this.width/2,0);
	this.port[3].setPosition(this.width/2,this.height);
    }
}
;
draw2d.shape.Task.prototype.paint=function(){
    draw2d.VectorFigure.prototype.paint.call(this);
    var textWidth = parseInt(this.label.style.height);

    oldColor = this.graphics.color;
    xyz = this;

    this.graphics.color = "#FFFFCC";
    this.graphics.fillRect(0,0,this.getWidth(),this.getHeight() );
    this.graphics.color = oldColor;
    this.graphics.drawRect(0,0,this.getWidth(),this.getHeight() );

    this.graphics.paint();

    this.label.style.top=(this.getHeight() / 2 - textWidth/2)+"px";
    this.html.appendChild(this.label);
}
;

draw2d.shape.Task.prototype.getContextMenu=function(){
    var menu=new draw2d.Menu();
    var oThis=this;
    menu.appendMenuItem(new draw2d.MenuItem("Go to process page",null,function(){
	var taskName = oThis.label.innerHTML;
	taskName = taskName.replace(/ /g, "_");
	var url = wgServer + wgScript + "?title=" + taskName; 
	window.location = url;
    }
					   ));
    menu.appendMenuItem(new draw2d.MenuItem("Edit",null,function(){
	var taskName = oThis.label.innerHTML;
	taskName = taskName.replace(/ /g, "_");
	var url = wgServer + wgScript + "?title=" + taskName + "&action=formedit"; 
	window.location = url;
    }
					   ));

    menu.appendMenuItem(new draw2d.MenuItem("Delete",null,function(){
	workflow.getCommandStack().execute(new draw2d.CommandDelete(oThis));
	draw2d.ToolGeneric.prototype.execute.call(this);
    }
					   ));
    return menu;
}
;
