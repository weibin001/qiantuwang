$.swiper = {
	index:0,		//当前索引
	timer:null,		//计时器
	len:0,			//轮播图片数量
	imgArr:null,		//轮播图片数组
	btnArr:null,		//前后按钮数组
	tabArr:null,		//标签数组
	/****开始轮播以及对轮播dom节点获取*****/
	startplay:function(id,container,box){	//容器id，轮播图片的盒子img-container，图片盒子img-box   
		let _self=this;			//将swiper对象的this绑定到_self局部变量，避免下面dom调用时this指向发生改变或者使用es6箭头函数
		this.imgArr = $(id).find(container).find(box);
		this.btnArr = $(id).children('a');		//find()会查询所有后代a标签
		this.tabArr = $(id).find('ul').find('li');
		this.len = this.imgArr.length;
		this.startTimer();
		/**********鼠标悬浮时暂停计时器 jq自带异步函数（第①个fun表示悬停，第②个fun表示移除）**********/
		$(id).hover(()=>{
			this.stopTimer();
		},()=>{
			this.startTimer();
		})
		/*********悬停时已经关闭计时器，点击切换图片时不需要再次关闭计时器*********/
		this.btnArr.eq(0).click(()=>{ this.prePic(); });
		this.btnArr.eq(1).click(()=>{ this.nextPic(); });
		/**************点击标签跳转到相应图片*************/
		this.tabArr.each((index,data)=>{	//data表示dom元素 因为使用箭头函数 this没有改变还是指向swiper对象，所以不能使用this 
			$(data).on('click',(event)=>{
				let e = event || window.event; 		//适配各个版本浏览器
//				console.log($(e.target).attr('data-tab'));
				this.index = $(e.target).attr('data-tab');
				this.animation();					//调用过渡效果，出现切换
			})
		})
	},
	/************过渡动画************/
	animation:function(){
		if( this.index > this.len-1 ){ this.index = 0; }		//轮播图超过总数索引值返回第一个
		else if( this.index < 0){ this.index = this.len-1 }		//轮播索引小于0返回最后一个
		this.imgArr.css({'opacity':'0'});						//设置所有的图片盒子透明度为0
		this.imgArr.eq(this.index).css({'opacity':'1'});		//当前索引的图片盒子显示
		this.tabArr.removeClass('active');						//移除li样式
		this.tabArr.eq(this.index).addClass('active');			//当前索引的标签添加样式
	},
	/************启动计时器************/
	startTimer:function(){
		this.timer = setInterval(()=>{		//es6箭头函数 this指向不会改变
			this.index++;
			this.animation();
		},2500)
	},
	/************停止计时器************/
	stopTimer:function(){
		clearInterval(this.timer);
	},
	/**************下一张*************/
	nextPic:function(){
		this.index++;
		this.animation();
	},
	/**************上一张*************/
	prePic:function(){
		this.index--;
		this.animation();
	}
};

