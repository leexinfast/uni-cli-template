//供应商类型
const shopType = function(val) {
	let type = ''
	switch (val) {
		case 0:
			type = '批发'
			break;
		case 1:
			type = '商户'
			break;
		case 2:
			type = '厂家'
			break;

	}
	
return type
}
const goodsStock=function(val){
	let str=''
	switch(val){
		case 0:
		str='现货'
		break;
		case 1:
		str='订货'
		break;
	}
	return str
}
export {
    shopType,
	goodsStock
}