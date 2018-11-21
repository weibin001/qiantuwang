/**********可以尝试把swiper封装到一起*************/
(function($){
	$.roll = function(dom){
		this.index = 0,	//当前索引
		this.len = 0,		//长度
		this.imgArr = null,//图片
		this.btnArr = null,//按钮
		this.container = null,	//容器
		/************绑定函数***********/
		this.bind = function(){		//可参照隔壁swiper.js
			this.imgArr = $(dom).find('.flex-container').find('.flex-box');
			this.btnArr = $(dom).find('.roll-btn');
			this.container = $(dom).children('.flex-container')
			this.len = this.imgArr.length / 4;
			this.btnArr.eq(0).click(()=>{
				this.index--;
				this.animation();
			});
			this.btnArr.eq(1).click(()=>{
				this.index++;
				this.animation();
			});
		},
		/*************过渡动画**********/
		this.animation = function(){
			if( this.index == 0 ){ this.btnArr.removeClass('disable'); this.btnArr.eq(0).addClass('disable'); }
			else if( this.index == this.len - 1 ) { this.btnArr.removeClass('disable'); this.btnArr.eq(1).addClass('disable'); }
			this.container.css({'margin-left': `${this.index*(-100)}%`});
		}
	}
})(jQuery)
