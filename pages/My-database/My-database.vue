<template>
	<view>
		<!-- <h1>我的数据库</h1>  影片      -->

		<!-- / 头部导航 -->
		<scroll-view scroll-x="true" class="scroll-view_H">
			<!-- class=" " -->
			<view :id="item.id" v-bind:class="[item.id == scroll_id ? 'uni-bg-red' : '']" @tap="scroll_view" v-for="item in titleDate" :key="item.id">{{ item.name }}</view>
		</scroll-view>
		<view class="addSj" @tap="bannerSH">
			<view class="">创建目标影片组</view>
			<image src="../../static/my_sj/jia.png" mode=""></image>
		</view>
		<!-- 弹出层 -->
		<view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
			<view class="uni-bannerHeader" @tap="uni_bannerHidden"><image src="../../static/my_sj/cancelCopy.png" mode="" /></view>
			<view class="uni_bannerCenter">
				<view class="barnerHeader">添加目标影片</view>
				<view class="barnerHeaderx">（仅能选择一部影片）</view>
				<view class="barnerSum">
					<view class="barnerInput"><input type="text" value="" @input="filmValue" v-model="filmName" /></view>
					<view class="barnerModel">
						<view class="barnerModel_typeface">
							<view>{{ filmName }}</view>
							<view @tap="delentFilm"><image src="../../static/my_sj/cancelCopy.png" mode=""></image></view>
						</view>
					</view>
					<view class="beingAbout">
						<view id="1" @tap="show" v-bind:class="[showNumber == 1 ? 'showAbout' : '']">正在上映</view>
						<view id="2" @tap="show" v-bind:class="['beingAboutTow', showNumber == 2 ? 'showAbout' : '']">即将上映</view>
					</view>

					<!-- 正在上映 -->
					<view class="" :hidden="!(showNumber == 1)">
						<label class="checkbox">
							<view :class="['showing', item.checked ? 'showcolor' : '']" v-for="item in showing" :key="item.id">
								<checkbox @tap="checolor(item.id)" @tvalue="wxr" class="checkbox" :checked="item.checked" />
								<view>{{ item.name }}</view>
								<view>{{ item.type }}</view>
								<view>{{ item.time }}</view>
								<view>相似度{{ item.similarity }}</view>
							</view>
						</label>
					</view>
					<!-- 即将上映 -->
					<view class="" :hidden="!(showNumber == 2)">
						<label class="checkbox">
							<view :class="['showing', item.checked ? 'showcolor' : '']" v-for="item in aboutShowing" :key="item.id">
								<checkbox @tap="checolor(item.id)" :checked="item.checked" value="wxr" class="checkbox" />
								<view>{{ item.name }}</view>
								<view>{{ item.type }}</view>
								<view>{{ item.time }}</view>
								<view>相似度{{ item.similarity }}</view>
							</view>
						</label>
					</view>
				</view>
			</view>

			<!-- <view style="padding:50upx 0; padding-bottom:68upx;">
			
			</view> -->
			<!--  目标设置 -->
			<view class="bottomTarget">
				<view class="TargetHeader">无名之辈-目标设置</view>
				<!--  目标设置 -->
				<view class="Targetcenter">
					<view class="targetcenter_header">首映日目标场次</view>
					<view>
						<view><input type="text" value="" placeholder="请输入场次" /></view>
						<view class="targetcenter_bottom">场</view>
					</view>
				</view>
				<view class="Targetcenter">
					<view class="targetcenter_header">累计票房预期</view>
					<view>
						<view><input type="text" value="" placeholder="请输入累计票房" /></view>
						<view class="targetcenter_bottom">万</view>
					</view>
				</view>
				<!-- 随机推荐 -->
				<view class="TargetBottom" v-for="(item,i) in  randomTj " :key="i">
					<view>{{item.name}}</view>
					<view>{{item.release}}</view>
					<view>{{item.session}}</view>
				</view>
			</view>
			<!--  确定 取值  -->
			<view  class="confirmButton">
				<view class="confirm">
					确定
				</view>
			</view>
				<view class="reminder">
					<view class="">
						确认按钮始终显示，未输入影片时提示必须填
					</view>
				</view>
		</view>
		<view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
		<!--  添加之后的数据 -->
		<view class="filmGroup" v-for="item in filmGroup" :key="item.id">
			<view class="filmGroup_name">
				{{item.name}}
			</view>
			<view class="filmGroup_office">
				<view>
					<view>
						累计票房
					</view>
					<view>
						{{item.mani}}亿
					</view>
				</view>
				<view class="filmGroup_office_today">
					<view>
					 今日排场
					</view>
					<view>
						{{item.session}}万
					</view>
				</view>
			</view>
			<view class="modificationData">
				<view  class="modificationData_compile">
					<image src="../../static/my_sj/modification.png" mode=""/>
				</view>
				<view class="modificationData_delete" @tap="modificationData_delete(item.id)">
					<image src="../../static/my_sj/delent.png" mode=""/>
				</view>
				<view class="modificationData_unfold" @tap="unfold(item.id)">
					<image :src="'../../static/my_sj/' + item.unfold_src" mode=""/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onShareAppMessage(){},
	created() {
		this.title();
	},
	data() {
		return {
			titleDate: [
				{ id: 0, name: '影片' },
				{ id: 1, name: '影院' },
				{ id: 2, name: '影投' },
				{ id: 3, name: '院线' },
				{ id: 4, name: '城市' },
				{ id: 5, name: '省份' },
				{ id: 6, name: '大区' }
			],
			scroll_id: 0,
			// 控制卡片的开关
			bannerShow: false,
			//分组名称
			filmName: '大侦探皮卡丘',
			// 正在上映数据存放
			showing: [
				{ id: 0, name: '疯狂外星人', type: '科幻', time: '2019-02-25', similarity: '99%', checked: false },
				{ id: 1, name: '疯狂外星人', type: '科幻', time: '2019-02-25', similarity: '99%', checked: false },
				{ id: 2, name: '疯狂外星人', type: '科幻', time: '2019-02-25', similarity: '99%', checked: false }
			],
			showNumber: 1,
			// 即将上映
			aboutShowing: [
				{ id: 0, name: '西红柿首付', type: '科幻', time: '2019-02-25', similarity: '99%', checked: false },
				{ id: 1, name: '西红柿首付', type: '科幻', time: '2019-02-25', similarity: '99%', checked: false },
				{ id: 2, name: '西红柿首付', type: '科幻', time: '2019-02-25', similarity: '99%', checked: false }
			],
			randomTj:[
				{name:'反贪风暴4',release:'首映日场次',session:'3,0000'},
				{name:'小猪4',release:'首映日场次',session:'2000'}
			],
			// 用户添加之后的数据 
			filmGroup:[
				{id:'0',name:'大侦探皮卡丘',mani:'14.46',session:'4.46',unfold_src:'next1.png'},
				{id:'1',name:'大侦探皮卡丘',mani:'14.46',session:'4.46',unfold_src:'next1.png'},
				{id:'2',name:'大侦探皮卡丘',mani:'14.46',session:'4.46',unfold_src:'next1.png'},
			]
		};
	},
	methods: {
		//  点击删除 影片组
		
		//  展开添加的影片组
		unfold(id) {
			// console.log(id);
			let arr = this.filmGroup;
			arr.map(item =>{
				// console.log(item);
				if(item.id == id ){
					if (item.unfold_src == 'next1.png') {
						console.log(item);
						item.unfold_src = 'next.png'
					}else {
						item.unfold_src = 'next1.png'
					}
				}
			})
			 this.filmGroup = arr
		},
		//  分装 选择checked 的内容/
		checkedFun(data, id) {
			let arr = data;
			arr.forEach(item => {
				// 判断当前点击的id 进行修改 当前的checked 值
				if (item.id == id) {
					if (item.checked) {
						item.checked = false;
					} else {
						item.checked = true;
					}
				}
			});
			data = arr;
		},
		//  点击当前 选择框 则选择框后边的内容 全部加颜色
		checolor(id) {
			// console.log('点击了');
			if (this.showNumber == 1) {
				this.checkedFun(this.showing, id);
			} else {
				this.checkedFun(this.aboutShowing, id);
			}
		},
		//  tab 切换 正在上映
		show(e) {
			console.log(e.target.id);
			if (e.target.id == 1) {
				this.showNumber = e.target.id;
				console.log(this.showNumber);
			} else {
				this.showNumber = e.target.id;
				console.log(this.showNumber);
			}
		},
		//  里边进行判断 限制字数
		changeInput(e) {
			console.log(e);
			console.log('输入了内容');
		},
		delentFilm() {
			this.filmName = '';
		},
		scroll_view(e) {
			// console.log(e);
			this.scroll_id = e.target.id;
		},
		// 修改标题
		title() {
			uni.setNavigationBarTitle({
				title: '我的数据库'
			});
		},
		// 点击当前创建影片按钮 弹出 卡片
		bannerSH() {
			this.bannerShow = true;
		},
		// ? 点击× 关闭当前弹出框
		uni_bannerHidden() {
			this.bannerShow = false;
			//  关闭时 清楚卡片中的所有选中
			let arr = this.showing;
			let ary = this.aboutShowing;
			arr.forEach(item => {
				item.checked = false;
			});
			ary.forEach(item => {
				item.checked = false;
			});
			this.showing = arr;
			this.aboutShowing = ary;
		},
		// 不知道判断输入多少字不
		filmValue(e) {
			// console.log(e);
			// console.log('改变了')
			// if () {
			//
			// }
		}
	}
};
</script>

<style lang="less">
page,
body {
	background-color: #f5f5f5;
}
body {
	background-color: #f5f5f5;
}

// 导航样式
.scroll-view_H {
	white-space: nowrap;
	height: 60upx;
	padding: 0 30upx;
	background-color: #fff;
	view {
		text-align: center;
		font-size: 32upx;
		display: inline-block;
		box-sizing: border-box;
		width: 80upx;
		margin-right: 60upx;
		height: 90%;
		line-height: 193%;
		// overflow: hidden;
	}
}
// 点击当前的样式
.uni-bg-red {
	color: red;
	border-bottom: 1px solid red;
}
// 创建影片组
.addSj {
	// width: 100%;
	height: 60upx;
	background-color: #fff;
	margin-top: ;
	// color:  red;
	margin: 17upx 10upx 0 10upx;
	display: flex;
	justify-content: center;
	view {
		padding-top: 10upx;
		text-align: center;
		font-size: 26upx;
	}
	image {
		padding-top: 10upx;
		width: 40upx;
		height: 40upx;
	}
}
/* 遮罩层 */
.uni-mask {
	background: rgba(0, 0, 0, 0.3);
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 9998;
}

/* 弹出层形式的广告 */
.uni-banner {
	// width: 80%;
	width: 646upx;
	height: 954upx;
	position: fixed;
	left: 50%;
	top: 50%;
	background: #fff;
	border-radius: 10upx;
	z-index: 9999;
	transform: translate(-50%, -50%);
	.uni-bannerHeader {
		display: flex;
		justify-content: flex-end;
		margin-right: 24upx;
		margin-top: 24upx;
		image {
			width: 24upx;
			height: 24upx;
		}
	}
}
//  弹出框内容设置
.uni_bannerCenter {
	// 头部标题
	.barnerHeader {
		text-align: center;
		font-size: 26upx;
		font-weight: 500;
		// color:#FF000000;
	}
	//  头部下小文字提示
	.barnerHeaderx {
		text-align: center;
		font-size: 14upx;
		color: orange;
		margin-top: 4upx;
	}
	.barnerSum {
		.barnerInput {
			display: flex;
			justify-content: center;
			input {
				width:132upx;
				height:30upx;
				font-size:22upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(74,74,74,1);
				line-height:30upx;
				
				margin-top: 24upx;
				width: 453upx;
				// height: 50upx;
				background: rgba(255, 255, 255, 1);
				font-size: 22upx;
				border-radius: 2px;
				border: 1px solid rgba(88, 88, 88, 1);
				// margin-left: 28upxpx;
				box-sizing: border-box;
				padding-left: 28upx;
				padding-bottom: 2upx;
			}
		}
		.barnerModel {
			display: flex;
			justify-content: center;

			// height: 50upx;
			// border: 1px solid red;

			.barnerModel_typeface {
				height:28upx;
				font-size:20upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(0,0,0,1);
				line-height:28upx;
				
				
				width: 453upx;
				margin: 26upx 0 14upx 30upx;
				margin-left: 0;
				font-size: 20upx;
				display: flex;
				justify-content: space-between;
				image {
					width: 24upx;
					height: 24upx;
				}
			}
		}
		.beingAbout {
			padding-left: 96upx;
			display: flex;
			// justify-content:center;
			font-size: 20upx;
			color: #ccc;
			padding-bottom: 26upx;
			.beingAboutTow {
				margin-left: 30upx;
			}
			.showAbout {
				width:114upx;
				height:36upx;
				text-align: center;
				border-radius:2px;
				border:2px solid rgba(240,142,45,1);
			}
		}
		.showing {
			// color: red;
			display: flex;
			margin: 0upx 47upx 0upx 59upx;
			padding-left: 38upx;
			font-size: 18upx;
			width:450upx;
			font-size:18upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(0,0,0,1);
			line-height:25upx;
			.checkbox {
				width: 16upx;
				height: 16upx;
				transform: scale(0.5);
				// padding: 0 13upx 0 0 ;
			}
			view {
				padding-left: 25upx;
			}
		}
		//  选择最后一个 下边加边框
		.showing:last-child {
			// color: red;
			padding-bottom: 51upx;
			border-bottom: 1px solid #ff979797;
			// margin: 0 59upx;
		}
		//  选择第二个 加 边边框
		.showing:nth-child(2) {
			border-right: 1px solid red;
			// padding: 17upx 0 ;
			padding-top: 17upx;
			padding-bottom: 17upx;
		}
		//  点击当前输入框 改变 整个字体的颜色
		.showcolor {
			width:450upx;
			font-size:18upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(240,142,45,1);
			line-height:25upx;
		}
	}
}
//  目标设置
.bottomTarget {
	// padding-top: 38upx;
	padding: 38upx 96upx 0 96upx;
	// 标题
	.TargetHeader {
		padding-bottom: 32upx;
		height:37upx;
		font-size:26upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(0,0,0,1);
		line-height:37upx;
		text-align: center;
	}
	.Targetcenter {
		display: flex;
		justify-content: space-around;
		font-size: 22upx;
		padding-bottom: 18upx;
		
		.targetcenter_header {
			box-sizing: border-box;
			padding-top: 16upx;
			width:132upx;
			height:30upx;
			font-size:22upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(0,0,0,1);
			line-height:30upx;
		}
		view {
			display: flex;
			view {
				input {
					width: 254upx;
					height: 36upx;
					background: rgba(255, 255, 255, 1);
					border-radius: 2px;
					box-sizing: border-box;
					padding-left: 20upx;
					border: 2px solid rgba(88, 88, 88, 1);
					font-size: 16upx;
				}
			}
			.targetcenter_bottom {
				box-sizing: border-box;
				padding-top: 16upx;
				padding-left: 11upx;
			}
		}
	}
}
// 随机推荐
.TargetBottom{
	display: flex;
	margin-top: 28upx;
	height:30upx;
	font-size:22upx;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(74,74,74,1);
	line-height:30upx;
	
		view{
			    width: 33%;
		}
	}
	.confirmButton{
		display: flex;
		justify-content: center;
		margin-top: 27upx;
			.confirm {
					width:56upx;
				height:40upx;
				font-size:28upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(255,255,255,1);
				line-height:40upx;
				text-align: center;
				width:190upx;
				height:50upx;
				background:linear-gradient(225deg,rgba(249,120,89,1) 0%,rgba(240,142,45,1) 100%);
				border-radius:2px;
			}
		}
			.reminder{
				display: flex;
				justify-content: center;
				view {
					width:210upx;
					height:14upx;
					font-size:10upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(240,142,45,1);
					line-height:14upx;
				}
			}
//  添加影片组完毕之后的数据 
.filmGroup{
	display: flex;
	justify-content: space-between;
	width:750upx;
	height:60upx;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 4upx 0px rgba(219,217,220,1);
	align-items: center;
	margin-top: 10upx;
	//  创建的影片名字
	.filmGroup_name{
		width:144upx;
		height:33upx;
		font-size:24upx;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(74,74,74,1);
		line-height:33upx;
	}
	// l累计票房 今日排场 
	 .filmGroup_office{
		 display: flex;
		font-size:18upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(73,73,73,1);
		line-height:25upx;
		.filmGroup_office_today {
			margin-left: 57upx;
		}
	 }
	//  修改数据按钮
	.modificationData{
		display: flex;
		// justify-content: 
		view {
			image {
				width: 26upx;
				height: 26upx;
				margin-right: 22upx;
			}
		}
	}
	
}		
</style>
