// 获取scene参数
const getSceneParams = (scene, splitKey = '=') => {
	let params = {}
	if (!scene) {
		return params
	}
	decodeURIComponent(scene).split('&').forEach((sceneInfo) => {
		let sceneInfoArr = sceneInfo.split(splitKey)
		params[sceneInfoArr[0]] = sceneInfoArr[1]
	})
	return params
}

// 名字星星
export const secretName = (name) => {
	function isNormal(str) {
		return /[\u4e00-\u9fa5\u0000-\u00ff\uff00-\uffff]/.test(str)
	}
	if (!name) {
		return '***'
	} else if (name.length === 1 || name.length === 2) {
		let str = isNormal(name.slice(0, 1))
			? name.slice(0, 1)
			: name.slice(0, 2)
		return str + '**'
	} else {
		let start = isNormal(name.slice(0, 1))
			? name.slice(0, 1)
			: name.slice(0, 2)
		let end = isNormal(name.slice(-1))
			? name.slice(-1)
			: name.slice(-2)
		return start + '***' + end
	}
}

// 微信工具
const wxUtils = {
	isUseFlow() {
		return new Promise(resolve => {
			this.getNetworkType().then(type => {
				resolve(!!~['2g', '3g', '4g', '5g'].indexOf(type))
			})
		})
	},
	// 网络
	getNetworkType() {
		return new Promise(resolve => {
			uni.getNetworkType({
				success: res => {
					resolve(res.networkType)
				}
			})
		})
	},
	// 获取注册参数
	getRegisterData(detail) {
		return new Promise((resolve) => {
			uni.login({
				success: res => {
					resolve({
						jsCode: res.code,
						nickName: detail.userInfo.nickName,
						headImg: detail.userInfo.avatarUrl,
						gender: detail.userInfo.gender,
						encryptedData: detail.encryptedData,
						iv: detail.iv,
						signature: detail.signature
					})
				}
			})
		})
	},
	getJsCode() {
		return new Promise(resolve => {
			uni.login({
				success: res => {
					resolve(res.code)
				}
			})
		})
	},
	// 保存图片
	saveImage: function() {
		const save = (path) => {
			uni.saveImageToPhotosAlbum({
				filePath: path,
				success: function(res) {
					uni.showToast({
						title: '保存成功',
					})
				},
				fail: function(res) {
					console.log(res)
				}
			})
		}

		// 下载图片 获取临时路径
		uni.downloadFile({
			url: url,
			success: function(response) {
				// 获取当前的授权权限信息
				uni.getSetting({
					success: function(res) {
						// 如果没有授权
						if (!res.authSetting['scope.writePhotosAlbum']) {
							// 提示授权
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								// 接受授权
								success() {
									save(response.tempFilePath)
								},
								// 被拒绝 发出提示
								fail() {
									uni.showModal({
										title: '提示',
										content: '若不授权保存至相册，则无法保存图片只相册；点击授权可以去设置打开授权功能；若点击不授权，后期需要在删除该小程序后重新搜索才可以授权。',
										success: function(res) {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							})
						} else {
							// 已经授权
							save(response.tempFilePath)
						}
					}
				})
			},
			fail: function(res) {
				console.log(res)
			}
		})
	},
	// 拉起支付
	doPayMemt: function(data) {
		return new Promise((resolve, reject) => {
			uni.requestPayment({
				nonceStr: data.nonceStr,
				package: data.package,
				signType: data.signType,
				paySign: data.sign,
				timeStamp: data.timeStamp,
				success: res => {
					resolve({
						isPay: true
					})
				},
				fail: res => {
					resolve({
						isPay: false,
						message: res
					})
				}
			})
		})
	}
}


/* 合并对象 */
function merge() {
	let result = {};

	function assignValue(val, key) {
		if (typeof result[key] === 'object' && typeof val === 'object') {
			result[key] = merge(result[key], val)
		} else {
			result[key] = val
		}
	}
	for (let i = 0, l = arguments.length; i < l; i++) {
		let obj = arguments[i]
		for (let k in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, k)) {
				assignValue(obj[k], k)
			}
		}
	}
	return result
}

/* JSON Copy */
function cloneObj(o) {
	return JSON.parse(JSON.stringify(o))
}

/* 读取对象属性 */
function readObjInfo(obj, routes) {
	let data = cloneObj(obj)
	for (var i = 0, l = routes.length; i < l; i++) {
		data = data[routes[i]]
	}
	return data
}

/* 图片上传 */
/* 图片上传 */
function uploadMultImg(api, head, imgsText) {
	let promiseList = imgsText.split(',').map(item => {
		return new Promise((resolve) => {
			api(item)
			.then(res => {
				resolve(res)
			})
			.catch(e => {
				resolve('')
			})
		})
	})
	return Promise.all(promiseList).then(result => {
		return result.filter(item => item).map(item => {
			let src = ''
			try{
				src =  head + JSON.parse(item).data
			} catch(e){
				src = ''
			}
			return src
		}).join(',')
	}).catch(e => {
		return ''
	})
}
function isVideo(url) {
	const array = url.split('.')
	const suffix = array[array.length - 1]
	if (!suffix) {
		return false
	}
	return !!~['mp4','flv','avi','rm','rmvb'].indexOf(suffix)
}

const systemInfo = uni.getSystemInfoSync()
const MIN_WIDTH = systemInfo.screenWidth * systemInfo.pixelRatio
function addQiniuImgParams(url, mode = 2, width = MIN_WIDTH, height) {
	let newUrl = `${url}?imageView2/${mode}/w/${Math.ceil(width)}`
	if (height) {
		newUrl += `/h/${Math.ceil(height)}`
	}
	return newUrl
}


module.exports = {
	wxUtils,
	uploadMultImg,
	getSceneParams,
	merge,
	readObjInfo,
	cloneObj,
	isVideo,
	secretName,
	addQiniuImgParams
}
