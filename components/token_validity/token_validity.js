import Vue from 'vue'
/* 检查token 值 是否过期 
	过期 或者 没有 直接返回1 
	未过期 为清除本地 返回本地储存的is_program_user
 
 */
function token_validity() {
	return new Promise((ra,re) =>{
		const sid = uni.getStorageSync('sid');
		const is_program_user = uni.getStorageSync('is_program_user');
		if (sid) {
			uni.request({
				url:'https://db.topcdb.com/topprogram/check-login',
				data:{
					sid
				},
				success:({data:res})=>{
					if (res.status != 200) {
					
						ra(1)
					} else {
						ra(is_program_user);
					}
				}
			})
		} else {
			ra(1)
		}
	})
}
export default  {
	validity:token_validity
}
