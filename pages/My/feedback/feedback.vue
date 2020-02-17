<template>
	<view>
		<view class="" :hidden="!succeed_Br">
			<image class="hi_logo" src="../../../static/My/hi.png" mode=""></image>
			<textarea
				value=""
				placeholder-style="color:rgba(195,192,196,1);"
				v-model="input_data"
				:maxlength="200"
				placeholder="请在这里写下您的建议和意见，我们收到后会尽快联系 您（字数不超过200字）。\n \r您也可以拨打电话或添加微信联系客服为您解决。 155-0129-3666。"
			/>
			<view class="contne">上传图片</view>
			<view class="up_sh" @tap="commit_image_data">
				<image v-if="up_sh_image == ''" src="../../../static/My/up.png" mode=""></image>
				<image v-if="up_sh_image != ''" :src="up_sh_image" mode=""></image>
			</view>
			
			<view class="commit_tj"><view class="" @tap="commit_form">提交</view></view>
		</view>
		
		
		<view class="succeed" :hidden="succeed_Br">
			<image class="succeed_alert"  src="../../../static/My/succeed_alert.png" mode=""></image>
			
			<view class="succeed_icon">
				<image src="../../../static/My/succeed_icon.png" mode=""></image>
				
			</view>
			<view class="succeed_icon_text">
				提交成功！
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			input_data: '',
			up_sh_image: '',
			succeed_Br:true,
		};
	},
	computed: {
		...mapState(['userinfo'])
	},
	methods: {
		/* 提交表单 */
		async commit_form() {
			let base64 = this.base64;
			let input_data = this.input_data;
			input_data = input_data.replace(/\s+/g, '');
			if (input_data.length == 0 ) {
				let title = '';
				if (input_data.length == 0) {
					title = '请输入问题';
				}
				uni.showToast({
					title,
					icon: 'none',
					duration: 1000
				});
				
			} else {
				let userinfo = this.userinfo;
				let id = userinfo.id;
				if (id == undefined || id == null) {
					id = '';
				}
				let program_id = userinfo.program_id;
				let user_name = userinfo.name;
				if (user_name == undefined || user_name == null) {
					user_name = '';
				}
				let program_user_name = userinfo.nickName;
				let up_sh_image = this.up_sh_image;
				let res_Br = {};
				if (up_sh_image != '') {
					
					let { data: res } = await this.$http.upFile({
						url: '/topprogram/set-demand',
						filePath: up_sh_image,
						formData: {
							information: input_data + '',
							user_id: id + '',
							program_id: program_id + '',
							user_name: user_name + '',
							program_user_name: program_user_name + ''
						}
					});
					res_Br = JSON.parse(res);
				}else {
					 let { data: res } = await this.$http.post({
						 url:'/topprogram/set-demand',
						 contentType:"application/x-www-form-urlencoded",
						data:{
							information: input_data + '',
							user_id: id + '',
							program_id: program_id + '',
							user_name: user_name + '',
							program_user_name: program_user_name + ''
						}
					})
					
					res_Br = res
				}
				if (res_Br.status == 200) {
					this.succeed_Br = false;
					setTimeout(() => {
						uni.switchTab({
							url: '../My'
						});
					}, 2500);
				}
			}
		},
		/* 上传图片   和预览*/
		commit_image_data() {
			let str = this.up_sh_image;
			let that = this;

			if (str == '') {
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success: ({ tempFilePaths: path }) => {
						this.up_sh_image = path[0];
						uni.showToast({
							title: '上传成功，请提交',
							icon: 'none'
						});
					},
					fail: res => {
						uni.showToast({
							title: '上传失败',
							icon: 'none'
						});
					}
				});
			} else {
				uni.previewImage({
					current: 0,
					urls: [str]
				});
			}
		}
	}
};
</script>

<style lang="less">
/* 提交成功显示 */
.succeed{
	width: 750upx;
	height: 100vh;
	background-color: #FFFFFF;
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	
	.succeed_alert{
		width: 670upx;
		height: 42vh;
		padding: 10vh  40upx 0   40upx;
	}
	.succeed_icon{
		width: 750upx;
		display: flex;
		justify-content: center;
		padding-top: 10vh;
		image{
			width: 100upx;
			height: 100upx;
		}
	}
	.succeed_icon_text{
		width: 750upx;
		display: flex;
		justify-content: center;
		font-size:26upx;
		font-weight:400;
		color:rgba(0,0,0,1);
		padding-top: 20upx;
		padding-left: 10upx;
		box-sizing: border-box;
	}
}
	
	
	
.commit_tj {
	width: 750upx;
	height: 70upx;
	margin-top: 64upx;
	display: flex;
	justify-content: center;
	align-items: center;
	view {
		width: 600upx;
		height: 70upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(240, 142, 45, 1);
		border-radius: 35upx;
		font-size: 26upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}
}
.hi_logo {
	width: 657upx;
	height: 463upx;
	margin: 49upx 54upx 11upx 39upx;
}
.up_sh {
	width: 100upx;
	height: 100upx;
	background: rgba(245, 246, 248, 1);
	border: 1upx solid rgba(195, 192, 196, 1);
	margin-left: 40upx;
	image {
		width: 100upx;
		height: 100upx;
		background: rgba(245, 246, 248, 1);
		border: 1upx solid rgba(195, 192, 196, 1);
	}
}
.contne {
	font-size: 24upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(0, 0, 0, 1);
	margin-left: 40upx;
	margin-top: 30upx;
	margin-bottom: 20upx;
}
textarea {
	width: 670upx;
	height: 300upx;
	background: rgba(245, 246, 248, 1);
	border-radius: 8upx;
	margin: 0 40upx;
	padding: 30upx 23upx 0 23upx;
	font-size: 24upx;
	box-sizing: border-box;
}
</style>
