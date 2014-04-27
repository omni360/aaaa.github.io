draw2d.shape.Gateway=function(){
    draw2d.VectorFigure.call(this);
    this.setDimension(65, 65);
}
;
draw2d.shape.Gateway.prototype=new draw2d.VectorFigure;
draw2d.shape.Gateway.prototype.type="draw2d.shape.Gateway";
draw2d.shape.Gateway.prototype.setWorkflow=function(param){
    draw2d.VectorFigure.prototype.setWorkflow.call(this,param);
    if(param!=null&&this.port==null){
	h1 = this.height / 4;
	h2 = this.height / 2 + h1;
	w1 = this.width / 4;
	w2 = this.width / 2 + w1;

	this.port = new Array();	

	this.port[0]=new draw2d.MyOutputPort();
	this.port[0].setWorkflow(param);
	this.port[0].setBackgroundColor(new draw2d.Color(115,115,245));
	this.port[0].setColor(null);
	this.addPort(this.port[0], w1, h1);

	this.port[1]=new draw2d.MyOutputPort();
	this.port[1].setWorkflow(param);
	this.port[1].setBackgroundColor(new draw2d.Color(115,115,245));
	this.port[1].setColor(null);
	this.addPort(this.port[1], w2, h1);

	this.port[2]=new draw2d.MyOutputPort();
	this.port[2].setWorkflow(param);
	this.port[2].setBackgroundColor(new draw2d.Color(115,115,245));
	this.port[2].setColor(null);
	this.addPort(this.port[2], w2, h2);

	this.port[3]=new draw2d.MyOutputPort();
	this.port[3].setWorkflow(param);
	this.port[3].setBackgroundColor(new draw2d.Color(115,115,245));
	this.port[3].setColor(null);
	this.addPort(this.port[3], w1, h2);
    }
}
;
draw2d.shape.Gateway.prototype.createHTMLElement=function(){
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
}
;
draw2d.shape.Gateway.prototype.setDimension=function(w,h){
    draw2d.VectorFigure.prototype.setDimension.call(this,w,h);
    if(this.port!=null){
	h1 = this.height / 4;
	h2 = this.height / 2 + h1;
	w1 = this.width / 4;
	w2 = this.width / 2 + w1;

	this.port[0].setPosition(w1, h1);
	this.port[1].setPosition(w2, h1);
	this.port[2].setPosition(w2, h2);
	this.port[3].setPosition(w1, h2);
    }
}
;
draw2d.shape.Gateway.prototype.paint=function(){
    draw2d.VectorFigure.prototype.paint.call(this);
    oldColor = this.graphics.color;
    xyz = this;
    w = this.getWidth();
    h = this.getHeight();

    h3 = h * .4;
    w3 = w * .4;

    h6 = h3/2;
    w6 = w3/2;

    this.graphics.color = "#FFFFFF";
    this.graphics.fillPolygon([0,w/2,w,w/2,0], [h/2,h,h/2,0,h/2]);
    this.graphics.color = oldColor;
    this.graphics.drawPolygon([0,w/2,w,w/2,0], [h/2,h,h/2,0,h/2]);

    this.graphics.fillRect( w/2 - w6/4, h6, w6/2,  h - h3 );
    this.graphics.fillRect( w6, h/2 - h6/4, w - w3, h6/2 );

    this.graphics.paint();
}
;
