<script>
export default {
	onLaunch: function() {
		// console.log('App Show');

		/* 如果本地有 token那么就直接进行下一步 
		  如果没有就判断用户是否 允许授权 允许的话 就静默登录
		  */

		const sid = uni.getStorageSync('sid');
		if (sid) {
			this.$store.dispatch('repetition_userinfo', sid);
		}else {
		}
	},
	onShow: function() {},
	onHide: function() {
		// console.log('App Hide');
	},
	
};
</script>

<style lang="less">
// 地图的 一件分析 地区 选择
// 地区选择
.city_xuan {
	height: 80upx;
	line-height: 80upx;
	display: flex;
	margin: 10upx 0 10upx 0;
	background-color: #fff;

	view {
		width: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #4a4a4a;
	}
	.active {
		color: #f08e2d;
	}
}
// 地图的 一件分析 地区 选择

/*每个页面公共css */
.more {
	// position: relative;
	position: fixed;
	top: 0;
	// width: 100%;
	height: 100%;
	// background-color: red;
	.more_header {
		height: 2000upx;
		background-color: rgba(0, 0, 0, 0.2);
		position: fixed;
		// opacity: 0.2;
	}
	// bottom: 0;
	.more_index {
		// height: 100%;
		height: 450upx;
		position: fixed;
		bottom: 0;
		// bottom: 0;
		// bottom: 0;
		width: 100%;
		background-color: #fff;

		.more_index_header {
			display: flex;
			justify-content: flex-end;
			padding: 20upx;
			font-size: 28upx;
			box-sizing: border-box;
			border-bottom: 1px solid #ccc;
		}
		.more_index_data {
			// color: red;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 20upx 20upx;
			padding-bottom: 100upx;
			view {
				width: 28%;
				border: 1px solid #f28f2d;
				margin: 20upx 20upx 20upx 0;
				background-color: #fff;
				padding: 10upx 0;
				margin-top: 5px;
				text-align: center;
				color: #000;
				font-size: 28upx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			// x选中 样式
			.active {
				background-color: #f28f2d;
				color: #fff;
			}
			// 选中样式结束
		}
	}
}
</style>
