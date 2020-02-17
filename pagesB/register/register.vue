<template>
	<view>
		<!-- <h1>登录页</h1> -->
		<view class="header">
			<view class="header_image"><image src="../../static/register/icon.png" mode=""></image></view>
			<view class="header_font">拓普数据</view>
		</view>
		<!-- 登录按钮 -->
		<!-- #ifdef MP-WEIXIN -->
		<button class="getinor_data" open-type="getUserInfo" @getuserinfo="getUserInfo_data">
			<image src="../../static/register/wx_icon.png" mode=""></image>
			登录
		</button>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<button class="getinor_data" open-type="getUserInfo" @tap="getUserInfo_data">
			<image src="../../static/register/wx_icon.png" mode=""></image>
			登录
		</button>
		<!-- #endif -->
		<!-- 游客模式 -->
		<view class="yk_data" @tap="getUserInfo_yk()"><view class="">游客模式</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 手机号码	
			phone: '',
			//  获取验证码哪里的文字
			gain: '获取验证码',
			//  用户输入的验证码
			verification: '',
			//  用来记时间的定时器
			setinter: '',
			code:{},
		};
	},
	onLoad() {
		this.code_updara().then(dd =>{
			// console.log(dd)
			this.code = dd;
		})
	},
	methods: {
		// 调用code
		code_updara(){
			return new Promise((rejk, res) => {
				uni.login({
					success: function(e) {
						rejk(e);
					}
				});
			});
		},
		/* 游客登录*/
		getUserInfo_yk() {
			var userinfo = { avatarUrl: '../../static/My/logo.jpg', nickName: '游客' ,user_pone_Br:true};
			this.$store.commit('userinfoMutations', userinfo)
			uni.switchTab({
				url: '../../pages/My/My'
			})
			uni.setStorage({ /* 存在本地方便 以后取*/   /* 用户权限*/
				key: 'is_program_user',
				data: 1,
				success: (e) => {}
			})
			return false;
		},

		//登录
		getUserInfo_data(e) {
			let  code = this.code;
			// #ifdef MP-WEIXIN
				this.$store.dispatch({type:'userinfo_actions',e,code})
			// #endif
			// #ifdef APP-PLUS
			// #endif
		},
		
		// 用户点击登录之后调用的接口
		register() {
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					console.log('用户昵称为：' + infoRes.userInfo.nickName);
					console.log(infoRes);
				}
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
// 游客模式
.yk_data {
	padding-top: 40upx;
	display: flex;
	justify-content: center;
	view {
		width: 500upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		background: rgba(245, 246, 248, 1);
		border-radius: 4upx;
		font-size: 30upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}
}
// 微信登录
.getinor_data {
	width: 500upx;
	height: 80upx;
	font-size: 30upx;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	background: linear-gradient(225deg, rgba(249, 120, 89, 1) 0%, rgba(240, 142, 45, 1) 100%);
	border-radius: 4px;
	image {
		width: 34upx;
		height: 30upx;
		margin-right: 20upx;
	}
}
.header {
	// border: 1px solid red;
	text-align: center;
	margin-top: 16.5vh;
	margin-bottom: 33vh;
	image {
		width: 150upx;
		height: 150upx;
	}
	.header_font {
		font-size: 40upx;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 56upx;
	}
}
</style>
