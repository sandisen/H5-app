
mui.init({
	  pullRefresh : {
	    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up : {
	      contentnomore:"没有更多数据了",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
	      contentrefresh : "正在加载...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
	      callback :pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	  }
  });
  
  mui.plusReady(function(){
  	

  	if (mui.os.stream) {
    //创建桌面快捷方式
    if (mui.isFunction(plus.navigator.createShortcut)) {
        plus.navigator.createShortcut({
            name: "News",
            icon: "imgs/icon.jpg"
        }); //注意换成自己的名字和图标
    }
}
  	
  	
  	
  	//Tab切换,找到容器组件
	mui(".mui-bar-tab").on('tap','.mui-tab-item',function(e){
		$('.container-div').css({"display":"none"});
		$('.container-div').eq($(this).index()).css({"display":"block"});
		mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,0);//100毫秒滚动到顶
	});
	
		//调取照相机
document.getElementById("camare-action").addEventListener('tap',function(){getCamera()});

//监听网络状态
document.addEventListener( "netchange", onNetChange, false );
//轮播图数据请求
mui.ajax('http://c.m.163.com/nc/article/headline/T1348647853363/0-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985286&sign=%2BY9lXIDh3W7j69unWYNEiSG3So2sMceBy%2B%2FiFf2ZfHh48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',{

	dataType:'json',
	type:'get',
	timeout:10000,
	success:function(data){   
		dataAnalyze(data);
	},
	error:function(error){
		console.log("数据返回失败");
		alert("网络无连接");

		}
});
	
//列表数据请求
	mui.ajax('http://c.m.163.com/nc/article/headline/T1348647853363/30-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',{
		dataType:'json',
		type:'get',
		timeout:10000,
		success:function(data){
			listDataAnalyze(data);
		},
		error:function(error){
			console.log("列表返回失败");
			alert("网络无连接");
		}
});
	
//视听请求
	mui.ajax('http://c.3g.163.com/nc/video/home/10-10.html',{
		dataType:'josn',
		type:'get',
		timeout:10000,
		success:function(data){
			var jsonData = $.parseJSON(data);
			viedioData(jsonData);
		},
		error:function(){
			alert("网络无连接");
		}
	
	});
//plusReady闭标签
 })
//轮播图数据
function dataAnalyze(data){
	var arr = data.T1348647853363[0].ads;
		var finalList = null;
		for(var i = 0; i<arr.length;i++){
			//轮播图标签结构
           finalList = '<div class="mui-slider-item"><a href="#"><img src='+arr[i].imgsrc+'><p class="mui-slider-title">'+arr[i].title+'</p> </a></div>'
           //插入slider-img标签里面
           $("#slider-img").append(finalList);
           //插入轮播标记
           $("#slider-indicator").append('<div class="mui-indicator" id="indicatorSlide"></div>')
           //插入完成必须初始化，否则图片不能滚动
			mui('.mui-slider').slider({
				  interval:0//自动轮播周期，若为0则不自动播放，默认为0；
				});
		}
}

//用来处理列表数据的函数
function listDataAnalyze(data){
	var arrayObj = data.T1348647853363;
	for(var i = 0; i<arrayObj.length;i++){
		finalList = '<li class="mui-table-view-cell mui-media list-cell"><a href="#"><img class="mui-media-object mui-pull-left" src='+arrayObj[i].img+'><div class="mui-media-body">'+arrayObj[i].title+'<p class="mui-ellipsis">'+arrayObj[i].digest+'</p></div></a></li>';
		$("#tableView-List").append(finalList);
	}
	$(document).on('tap','.list-cell',function(){
		mui.openWindow({
			url:"detail.html",
			id:"detail",
			show:{
			  	autoShow: true, //页面loaded事件发生后自动显示，默认为true
			    aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
			    duration: 200 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			},
			//自定义参数处理页面间传值
			 extras:{
	       	listName:arrayObj[$(this).index()].id
	    }
		})
	})
}
  		
//用来处理视听页面数据
function viedioData(data){
	var finalist = null;
	var arr = data.videoList;
	for(var i = 0;i<arr.length;i++){
		finalist = '<div class="viedio-container"><strong class="viedio_title">'+data.videoList[i].title+'</strong><span class="viedio_subtitle">'+data.videoList[i].description+'</span><video class="play-video"controls poster='+arr[i].cover+' ><source src='+data.videoList[i].mp4_url+'></source><source src="myvideo.ogv" type="video/ogg"></source><source src="myvideo.webm" type="video/webm"></source><object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf"><param name="movie" value="myvideo.swf" /><param name="flashvars" value="autostart=true&amp;file=myvideo.swf" /></object>当前浏览器不支持 video直接播放，点击这里下载视频： <a href="myvideo.webm">下载视频</a></video></div>';
		$('#container-div-index3').append(finalist);
	}
}

//调用相机函数
 function getCamera() {
 	var cmr = plus.camera.getCamera();
		var path = null;
		cmr.captureImage( function( path ){
//		//路径转换
		plus.io.resolveLocalFileSystemURL(path,function(entry){
			//转换为本地路径
			var localUrl = entry.toLocalURL();
			//修改图片路径
			document.getElementById("camare-action").src = localUrl;
		});
		},function( error ) {alert( "图片选择失败");},{filename:"doc/camera/",index:1});
 }
 
 //监听网络状态
 function onNetChange() {
	var nt = plus.networkinfo.getCurrentType();
	switch ( nt ) {
		case plus.networkinfo.CONNECTION_ETHERNET:
		case plus.networkinfo.CONNECTION_WIFI:
		alert("已经连接wifi"); 
		break; 
		case plus.networkinfo.CONNECTION_CELL2G:
		case plus.networkinfo.CONNECTION_CELL3G:
		alert("已经连接3G网络")
		case plus.networkinfo.CONNECTION_CELL4G:
		alert("已经连接蜂窝网络");  
		break; 
		default:
		alert("无网络连接"); 
		break;
	}
}
  		
  		
  		
  		 //上拉加载更多刷新函数
  	function pullfresh() {
   //列表数据请求
		mui.ajax('http://c.m.163.com/nc/article/headline/T1348647853363/30-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',{
			dataType:'json',
			type:'get',
			timeout:10000,
			success:function(data){
				listDataAnalyze(data);
				//注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
				mui('#refreshContainer').pullRefresh().endPullupToRefresh();//结束刷新
			},
			error:function(error){
				console.log("列表返回失败");
				alert("网络无连接");
			}
	});
}