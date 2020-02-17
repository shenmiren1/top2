<template>
	<view>
		<view class="title">
			请绑定拓普数据库手机号，获取更多权限
		</view>
		
		
		<view class="center">
			<view class="center_phone">
				<image src="../../../static/register/cellphone.png" mode=""></image>
				<input type="text" v-model="phone" value="" placeholder="请输入手机号" />
			</view>
			<view class="center_hint">
				<view>提示：您当前手机号未注册，请点击申请使用。</view>
			</view>
			<view class="center_verification">
				<image src="../../../static/register/verification_.code.png" mode=""></image>
				<input type="text" v-model="phone_code" placeholder="请输入验证码" />
				<view class="center_gain" @tap="hqgain">{{ gain }}</view>
			</view>
		</view>
		
		
		<!-- 按钮 -->
		
		<view class="but" @tap="phobe_accomplish">

			<view class="accomplish ">
				完 成
			</view>
		</view>
		<view class="but" @tap="probation_click">
			<view class="probation ">
				申请试用
			</view>
		</view>
		<view class="but">
			<view class="skip " @tap="phobe_skip">
				跳 过
			</view>
		</view>
		
	</view>
</template>

<script>
import {mapState} from 'vuex'
	export default {
		data() {
			return {
				phone_code:'', /* 输入的验证码*/
				gain: '获取验证码',
				phone:'', /* 用户输入的手机号*/
				setinter:'', /* d定时器*/
				setinter_Br:false, /*  加锁*/
			}
		},
		computed:{
			// wxUserMessage
			...mapState(['userinfo'])
		},
		methods: {
			/* 跳过 */
			async phobe_skip(){
				uni.switchTab({
					url:'../../../pages/My/My'
				})
				uni.showToast({
					title:'登录成功',
					icon:'none',
					duration:1000
				})
			},
			/* 点击完成 */
			async phobe_accomplish(){
				let telSl = /^\d{6}$/;
				let phone = this.phone
				let phone_code = this.phone_code;
				var userinfo = this.userinfo;
				
				
				
				// console.log(userinfo.unionId,userinfo.openId,userinfo.sid);
				if ( phone.length == 0 &&   phone_code.length == 0) {
					uni.showToast({
						title:'请输入手机号或者验证码',
						icon:'none'
					})
					return false;
				}
				
				let data = {
					phone,
					code:phone_code,
					unionId:userinfo.unionId,
					openId:userinfo.openId,
					sid:userinfo.sid,
					status:1
				}
				if (telSl.test(phone_code)) {
					let {data:res}   = await this.$http.get({url:'/topprogram/bind-phone',data})
					console.log(res);
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:2000
						})
						uni.setStorage({ /* 存在本地方便 以后取*/   /* 用户权限*/
							key: 'is_program_user',
							data: res.data.is_program_user,
							success: (e) => {}
						})
						uni.setStorage({ /* 存在本地方便 以后取*/
							key: 'sid',
							data: res.data.sid,
							success: (e) => {}
						})
					res.data['user_pone_Br'] = true;
					this.$store.commit('userinfoMutations',res.data)
					uni.switchTab({
						url: '/pages/My/My'
					});
				}else {
					
					uni.showToast({
						title:'请输入正确的验证码',
						icon:'none',
						duration:1000
					})
				}
				
			}, 
			// 获取短信
			async hqgain() {
				if (this.setinter_Br) {
					uni.showToast({
						title: '请勿重复点击',
						icon:'none'
					});
					return false
				}
				let telSl = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
				var inputStr = this.phone;
				//  这里之前还的判断 手机(及号码是否合法
				if (!(telSl.test(inputStr))) {
					uni.showToast({
						title:'请输入正确的手机号码',
						icon:'none'
					})
				}else{
					
					let data = {
						username:inputStr
					}
					let url  = '/topprogram/get-sendsms'
					let {data:res} =  await this.$http.get({url,data})
					// console.log(res);
					// if (res.msg == '发送成功') {
					
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if (res.succ != 1) {
						return false
					}
					let  t = 60;
					this.gain = `剩余${t}`
					this.setinter = setInterval( () => {
						t--
						this.setinter_Br = true;
						this.gain = `剩余${t}`
						if (t == 0) {
							clearInterval(this.setinter)
							this.gain = `获取验证码`
							this.setinter_Br = false;
						}
					},1000)
				}
				
			},
			/* 申请使用 */
			probation_click(){
				uni.navigateTo({
					url:'../../../pages/report/webregister/webregister'
				})
			}
		}
	}
</script>

<style lang="less">
	.but{
		margin-bottom:40upx;
		display:flex;
		justify-content:center;
		&:last-child{
			margin-bottom:0upx;
			view{
				background:rgba(245,246,248,1);
				color: #000000;
			}
		}
		view{
			width:500upx;
			height:80upx;
			background:linear-gradient(225deg,rgba(249,120,89,1) 0%,rgba(240,142,45,1) 100%);
			border-radius:4px;
			display: flex;
			justify-content: center;align-items: center;
			font-size:30upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
	}
	.center {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 254 / 1219 * 100vh ;
		.center_phone {
			// text-align: center;
			// width: 100%;
			position: relative;
			image {
				width: 30upx;
				height: 38upx;
				position: absolute;
				top: 6upx;
			}
			input {
				box-sizing: border-box;
				// border: 1px solid red;
				border-bottom: 1px solid rgba(183, 183, 183, 1);
				width: 500upx;
				padding-left: 70upx;
				font-size: 24upx;
				font-weight: 400;
				color: rgba(183, 183, 183, 1);
			}
		}
		.center_hint {
			width: 294upx;
			height: 20upx;
			font-size:14upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(246,140,60,1);
			line-height: 20upx;
		}
		.center_verification {
			position: relative;
			margin-top: 35upx;
			image {
				width: 30upx;
				height: 38upx;
				position: absolute;
				top: 6upx;
			}
			input {
				box-sizing: border-box;
				// border: 1px solid red;
				border-bottom: 1px solid rgba(183, 183, 183, 1);
				width: 500upx;
				padding-left: 70upx;
				font-size: 24upx;
				font-weight: 400;
				color: rgba(183, 183, 183, 1);
			}
			.center_gain {
				font-size: 22upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(245, 166, 35, 1);
				line-height: 30upx;
				position: absolute;
				top: 8upx;
				right: 0;
				z-index: 1000;
			}
		}
	}
.title{
	font-size:28upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(0,0,0,1);
	margin-top: 154 / 1219 * 100vh ;
	margin-bottom: 157 / 1219 * 100vh ;
	display: flex;
	justify-content: center;
}
</style>
