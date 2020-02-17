<template>
	<view>
		<!-- 关于我们 -->
		<view class="image_"><image src="../../../static/My/logo.jpg" mode=""></image></view>

		<text space="nbsp" class="conten">
			{{strin_data}}拓普电影数据小程序是拓普咨询专为影视人搭载的一 款小程序数据产品，包含了影片票房、影院票房数据、排 片数据、舆情数据、影院院线、城市票仓地域数据、行业报告咨询等，随时查看您关注的电影信息。
		</text>
		
		<view class="bottom_data">
			当前V2.0版本
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			strin_data: '       '
		};
	},
	methods: {}
};
</script>

<style lang="less">
page {
	background: rgba(255, 255, 255, 1);
}
.image_ {
	padding: 121upx 253upx 137upx 253upx;

	image {
		width: 244upx;
		height: 244upx;
	}
}
.conten {
	display: inline-block;
	
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(199, 197, 200, 1);
	padding: 0 50upx;
}
.bottom_data{
	width: 750upx;
	font-size:26upx;
	display: flex;
	justify-content: center;
	font-weight:400;
	color:rgba(199,197,200,1);
	position: fixed;
	bottom:140upx;
}
</style>
