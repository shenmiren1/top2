<template>
	<view class="headder">
		<!-- 用户 信息展示 -->
		<view class="header">
			<view class="header_dt">
				<image :src="userinfo.avatarUrl" mode=""></image>
				<view class="header_data">
					<view class="header_name">{{ userinfo.nickName }}</view>
					<view class="header_js" @tap="role_click">
						<text  v-if="!userinfo.role_name_Br">您还没有选择自己的角色</text>
						<text  v-if="userinfo.role_name_Br">更换角色</text>
					</view>
					<view class="header_selet_js"  @tap="role_click" >
						<text v-if="!userinfo.role_name_Br">选择角色</text>
						<text v-if="userinfo.role_name_Br" >{{userinfo.role_name == null ? '请选择角色' : userinfo.role_name}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 用户 信息展示 -->

		<!-- 图标 -->
		<view class="icon_navito">
			<block v-for="(item, index) in icon_data" :key="index"  @tap="icon_navito_click(index)">
					<view class="icon_navito_data" @tap="icon_navito_click(index)">
						<image :src="item.src" mode=""></image>
						<view>{{ item.text }}</view>
					</view>
			</block>
		</view>
		<!-- 图标 -->

		<!-- 底部选择 -->
		<view @tap="center_help_click(item)" :class="['center_help', index == 0 ? 'center_help_active' : '']" v-if="userinfo.is_program_user == 0 ? index != 0 : true"  v-for="(item, index) in center_help_data" :key="index">
			<view class="" >{{ item }}</view>
			<image src="../../static/dy_particulars/next1.png" mode=""></image>
		</view>
		<!-- 底部选择 -->
		<!-- 退出登录 -->
		<view class="quit_register" @tap="useinfo_dl">
			<view v-if=" userinfo.user_pone_Br ">退出登录</view>
			<view v-if="!userinfo.user_pone_Br">登录</view>
		</view>
		<!-- 退出登录 -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	onShareAppMessage(){},
	data() {
		return {
			center_help_data: ['绑定账号', '帮助文档', '意见反馈', '关于'],
			icon_data: [
				{ src: '../../static/My/office.png', text: '中国票房', url: '../Home/Home' },
				{ src: '../../static/home/cinema.png', text: '影院院线', url: '../Home/Home' },
				{ src: '../../static/home/marketing.png', text: '营销宣传', url: '../Home/Home' },
				{ src: '../../static/My/map.png', text: '影院地图', url: '../Home/Home' }
			]
		};
	},
	computed: {
		...mapState({ userinfo: 'userinfo' })
	},
	onTabItemTap(e) {
		
	},
	onLoad() {
		uni.getSetting({
			success: res => {
				//这里打印res 得到authSetting数组里scope 三条相关信息都是true 如果拒绝授权 res.authSetting['scope.userInfo'] == false 下面再次调起授权
				if (res.authSetting['scope.userInfo'] == false || res.authSetting['scope.userInfo'] == undefined) {
					uni.showModal({
						title: '授权',
						content: '是否授权微信登录？',
						success: (e)=> {
							console.log(e);
							if (e.confirm) {
								uni.navigateTo({
									url:'/pagesB/register/register'
								})
							}else {
							}
							
						}
						
					});
				}else {
				}
			}
		});
	},
	methods: {
		role_click(){
			var Br = this.userinfo.role_name_Br;
			if (!Br) {
				uni.showToast({
					title:'请先登录',
					duration:1000,
					icon:'none'
				})
				return false;
			}
			
			
			
			uni.navigateTo({
				url:'./seletRole/seletRole'
			})
		},
		/* 跳转 */
		icon_navito_click(index){
			if(index == 0){
				uni.switchTab({
					url:'/pages/Home/Home'
				})
			}else if(index == 1){
				uni.navigateTo({
					url:'/pagesA/cinema-chain/cinema-chain'
				})
			}else if(index == 2){
				uni.navigateTo({
					url:'/pagesA/publicity/publicity'
				})
			}else if(index == 3){
				// uni.switchTab({
				// 	url:'/pages/showman/showman'
				// })
				uni.showToast({
					icon:'none',
					title:'即将上线，敬请期待'
				})
			}
		},
		/* 中间按钮 */
		center_help_click(item){
			var Br = this.userinfo.role_name_Br;
			if (!Br) {
				uni.showToast({
					title:'请先登录',
					duration:1000,
					icon:'none'
				})
				return false;
			}
			let is_program_user = this.userinfo.is_program_user;
			/* 绑定账号
				帮助文档
				意见反馈
				关于 */
			if(item == '绑定账号'){
				/* 证明是游客 */
				if(is_program_user == undefined){
					uni.navigateTo({
						url: '../../pagesB/register/register'
					})
				}else if(is_program_user == 1){
					/* 小程序用户 */
					uni.navigateTo({
						url: '/pagesB/register/register_phone/register_phone'
					})
					
				}
			}else if(item == '帮助文档' ){
				uni.navigateTo({
					url:'./helpTxt/helpTxt'
				})
			}else if(item == '意见反馈' ){
				uni.navigateTo({
					url:'./feedback/feedback'
				})
			}else if(item == '关于' ){
				uni.navigateTo({
					url:'./AboutUs/AboutUs'
				})
			}
		},
		/* 登录按钮 */
		useinfo_dl() {
			var Br = this.userinfo.user_pone_Br;
			if (!Br) {
				/* 登录 */
				uni.navigateTo({
					url: '../../pagesB/register/register'
				});
			} else {
				/* 注销 */
				uni.removeStorage({
					key:'sid',
					success:(res)=>{
						console.log(res);
					}
				})
				
				this.$store.commit('userinfoMutations',{
					avatarUrl: '../../static/My/logo.jpg',
					nickName: '暂未登录',
					user_pone_Br:false
				})
				uni.showToast({
					title:'退出成功',
					icon:'none'
					
				})
			}
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f5f5f5;
}
/* 退出登录 */
.quit_register {
	width: 750upx;
	height: 94upx;
	margin-top: 10upx;
	background-color: #ffffff;
	view {
		width: 750upx;
		height: 94upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 34upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}
}
/* 退出登录 */
/* 帮助 文档   意见反馈    关于 */
.center_help_active {
	margin-top: 10upx;
}
.center_help {
	width: 750upx;
	height: 104upx;
	border-bottom: 1px solid #f5f5f5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: rgba(255, 255, 255, 1);

	&:last-child {
		border-bottom: 0px solid #f5f5f5;
	}
	view {
		font-size: 28upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		padding-left: 32upx;
		color: rgba(51, 51, 51, 1);
	}
	image {
		width: 16upx;
		height: 26upx;
		margin-right: 32upx;
	}
}

// icon
.icon_navito {
	width: 750upx;
	height: 144upx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 2px 4px 0px rgba(245, 245, 245, 1);
	display: flex;
	.icon_navito_data {
		width: 750 / 4upx;
		height: 144upx;
		text-align: center;
		padding-top: 35upx;
		box-sizing: border-box;
		image {
			width: 42upx;
			height: 42upx;
		}
		view {
			text-align: center;
			font-size: 20upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(74, 74, 74, 1);
		}
	}
}
// icon

// 头部用户信息
.header {
	width: 750upx;
	height: 224upx;

	background: rgba(74, 74, 74, 1);
	.header_dt {
		width: 750upx;
		height: 224upx;
		padding-top: 40upx;
		box-sizing: border-box;
		display: flex;
		image {
			width: 144upx;
			height: 144upx;
			margin: 40upx 30upx;
			margin-top: 0;
		}
		.header_data {
			view {
				margin-top: 10upx;
			}
			.header_name {
				font-size: 30upx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
			}
			.header_js {
				// width:286upx;
				height:37upx;
				font-size: 26upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}
			.header_selet_js {
				min-width: 126upx;
				height: 34upx;
				font-size: 20upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				border-radius: 17upx;
				
				border: 1px solid rgba(255, 255, 255, 1);
			}
		}
	}
}
</style>
