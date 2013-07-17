/**
 * 
 */
//var mapgathering;
//initialize();
$root = $('html,body');

function GupMapper(identifier){

	this.identifier;
	if(identifier===undefined){
		this.identifier='a';
	}else{
		this.identifier=identifier;
	}
	this.template;
	this.data;
	this.outDataDiv;
	this.markers = [];
	this.infowindow;
	this.maxperpage=200;
	this.currentPosition=0;
	$root.animate({
		scrollTop: 0
	}, 1300);
}

GupMapper.prototype={
		setTemplate: function (template){
			this.template=$(template).html();
		},
		setData: function(data){
			this.data=data;
		},
		setOutDataDiv: function(outdiv){
			this.outDataDiv=outdiv;
		},
		setIdDiv: function (idDiv){
			this.idDiv =idDiv;
		},
		setPerPage: function(num){
			this.maxperpage=num;
		},
		getDetails: function(num){
			return this.data[num];
		},
		getOffset: function(index){
			var idDiv = this.identifier+index;
//			console.log(idDiv);
			var offset = $("#"+idDiv).offset();
			if(offset !== undefined){
				return offset.top;
			}else{
				return 0;
			}
		},
		clean: function(){
			for(var i=0; i<this.markers.length; i++){
				Window.map.removeLayer(this.markers[i]);
				this.markers[i]=undefined;
			}
			$( this.outDataDiv ).html("");
		}
};

 