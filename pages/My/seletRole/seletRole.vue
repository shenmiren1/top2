<template>
	<view>
		<view class="icon_data">
			<view class="icon_data_wai" v-for="(item,index) in role_daat" :key="index">
				<view @tap="rloe_click(item)" class=""  :class="[item_data == item ? 'active' : '' ]">
					{{item}}
				</view>
			</view>
		</view>
		
		<view class="commit">
			<view @tap="commit_data">
				确定
			</view>
		</view>
	</view>
</template>

<script> 
import {mapState} from 'vuex'
	export default {
		data() {
			return {
				role_daat:['影城经理','层院线人员','影投影院','发行地网','宣传营销','投资出品','广告赞助','商务运营','电影主创','新闻媒体','证券金融','数据分析','产品技术','其他电影从业者','电影爱好者'],
				item_data:''
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		onLoad() {
			let userinfo = this.userinfo;
			if (userinfo.role_name != undefined && userinfo.role_name != '') {
				this.item_data = userinfo.role_name
			}
		},
		methods: {
			 rloe_click(item){
				this.item_data = item;
			},
			async commit_data(){
				let item = this.item_data ;
				let userType = await this.detection_validity()
				var unionId = this.userinfo.unionId
				let {data:res} = await this.$http.get({
					url:'/topprogram/bind-role',
					data:{
						unionId,
						role:item,
						userType
					}
				})
				uni.showToast({
					title:res.msg,
					icon:'none'
				})
				let data = Object.assign({},this.userinfo);
				data.role_name = item;
				data.role_name_Br = true;
				this.$store.commit('userinfoMutations',data)
				if (res.status == 200) {
					setTimeout(()=>{
						uni.switchTab({
							url:'../My'
						})
					},1000)
				}
			}
		}
	}
</script>

<style lang="less">
	.commit{
		width: 750upx;
		height:70upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 100upx;
		view{
			width:600upx;
			height:70upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background:rgba(240,142,45,1);
			border-radius:35upx;
			font-size:26upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1)
		}
	}
	.icon_data{
		display: flex;
		flex-wrap: wrap;
		
		.icon_data_wai{
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top:66upx;
			&:nth-child(1),&:nth-child(2){
				margin-top: 10upx;
			}
			.active{
				color:rgba(255,255,255,1);
				background:rgba(240,142,45,1);
			}
			view{
				width:240upx;
				height:60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background:rgba(238,238,238,1);
				border-radius:36upx;
				font-size:26upx;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
		}
		
	}
</style>
