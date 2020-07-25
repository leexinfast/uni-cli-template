<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
    @import "style/base/app.scss";
    @import "style/iconfont/iconfont.css";
    @import "/wxcomponents/vant-weapp/common/index.css";
</style>
