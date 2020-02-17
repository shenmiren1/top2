<template>
	<view>
		<view class="tabone">
			·黄金场的划分
		</view>
		<view class="tantow">
			黄金场，18:00-21:00（不含21:00）开始放映的场次。
		</view>
		
		<view class="tabone">
			·引进模式划分
		</view>
		<view class="tantow">
			<view class="">
				国产片：国产片+合拍片；
			</view> 
			<view class="">
				进口片：分账片+买断片（指标受限制）+香港买断片（指 标不受限制）。
			</view>
		</view>
		
		
		
		<view class="tabone">
			
			·城市级别（票仓）依据
		</view>
		<view class="tantow">
			城市级别主要参考2018第一财经中国城市商业魅力评估得 出的中国城市分级名单得出，其中的新一线城市归入二线 城市。省直管县归入五线城市。市代管县市并入该地级市。
		</view>
		
		
		<view class="tabone">
			·票房更新频次
		</view>
		<view class="tantow">
			实时票房每小时更新，历史票房每天在09:30、14:30和 18:30更新。
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style  lang="less">
	page{
		background:rgba(245,245,245,1);
	}
	.tabone{
		font-size:30upx;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(0,0,0,1);
		margin-top: 40upx;
		margin-left: 40upx;
		&:nth-child(1){
			margin-top: 80upx;
		}
	}
	
	.tantow{
		font-size:26upx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:#999999;
		margin-top: 20upx;
		margin-left: 40upx;
	}
</style>
