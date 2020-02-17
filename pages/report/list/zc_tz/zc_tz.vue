<template>
	<view>
		<view class="header">
			<image src="../../../../static/home/zc.png" mode=""></image>
			<view class="one">做 &nbsp;您 &nbsp;贴 &nbsp;身 &nbsp;的&nbsp; 数 &nbsp;据 &nbsp;管 &nbsp;家</view>
			<view class="header_center">拓普数据(PC版)是拓普咨询整合专业权威的票房及消费人群数据，为电影投资、制作、发行、放映等全产业链客户提供贴身的数据服务。</view>
			<view class="header_center">点击下方注册链接，申请拓普智库(PC版)试用账号，或通过以下方式直接联系我们。</view>
			<view class="header_center tow">
				<view>叶先生 ： 手机 : 13581645588</view>
				<view>微信：ykf900226</view>
			</view>
		</view>
		<image @tap="tz" class="image_bottom" src="../../../../static/home/go_zc.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			tz(){
				uni.redirectTo({
				    url: '../../webregister/webregister'
				});
			}
		}
	}
</script>

<style lang="less">
	.image_bottom{
		width: 750upx;
		height: 15vh;
	}
	.header{
		
		display: flex;
		justify-content: center;
		flex-wrap:wrap;
		height: 85vh;
		width: 750upx;
		background-color: #3A3A3A;
		color:#fff;
		.one{
			font-weight: 700;
		}
		.tow{
			display:flex;
			flex-wrap:wrap;
			view{
				width: 100%;
				display: flex;
				justify-content: center;
			}
			view:nth-child(2){
				justify-content: flex-end;
				padding-right: 110upx;

			}
		}
		.header_center{
			padding: 0 100upx;
			font-size: 30upx;
		}
		image{
			width: 400upx;
			height: 200upx;
			padding-top: 40upx;
		}
		view{
			width: 100%;
			display: flex;
			justify-content: center;
			
		}
	}
</style>
