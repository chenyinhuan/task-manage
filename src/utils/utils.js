/**
 * 该方法用于将有父子关系的数组转换成树形结构的数组
 * 接收一个具有父子关系的数组作为参数
 * 返回一个树形结构的数组
 */
function translateDataToTree(data) {
	//没有父节点的数据
	let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null)

	//有父节点的数据
	let children = data.filter(value => value.parentId !== 'undefined' && value.parentId != null)

	//定义转换方法的具体实现
	let translator = (parents, children) => {
		//遍历父节点数据
		parents.forEach((parent) => {
			//遍历子节点数据
			children.forEach((current, index) => {
				//此时找到父节点对应的一个子节点
				if (current.parentId === parent.deptId) {
					//对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
					let temp = JSON.parse(JSON.stringify(children))
					//让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
					temp.splice(index, 1)
					//让当前子节点作为唯一的父节点，去递归查找其对应的子节点
					translator([current], temp)
					//把找到子节点放入父节点的children属性中
					typeof parent.children !== 'undefined' ? parent.children.push(current) : parent
						.children = [current]
				}
			})
		})
	}

	//调用转换方法
	translator(parents, children)

	//返回最终的结果
	return parents
}
const gather = {
	dealingwithadult: (data) => {
		let result = [];
		if (!Array.isArray(data)) {
			return result;
		}
		//没有父节点的数据
		let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null || value
			.parentId ==
			0)

		//有父节点的数据
		let children = data.filter(value => value.parentId !== 'undefined' && value.parentId != null && value
			.parentId != 0)
		//定义转换方法的具体实现
		let translator = (parents, children) => {
			//遍历父节点数据
			parents.forEach((parent) => {
				//遍历子节点数据
				children.forEach((current, index) => {
					//此时找到父节点对应的一个子节点
					if (current.parentId === parent.deptId) {
						//对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
						let temp = JSON.parse(JSON.stringify(children))
						//让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
						temp.splice(index, 1)
						//让当前子节点作为唯一的父节点，去递归查找其对应的子节点
						translator([current], temp)
						//把找到子节点放入父节点的children属性中
						typeof parent.children !== 'undefined' ? parent.children.push(
							current) : parent.children = [
							current
						]
					}
				})
			})
		}

		//调用转换方法
		translator(parents, children)

		//返回最终的结果
		return parents
	},
	dealingwithMenu: (data) => {
		let result = [];
		if (!Array.isArray(data)) {
			return result;
		}
		//没有父节点的数据
		let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null || value
			.parentId ==
			0)

		//有父节点的数据
		let children = data.filter(value => value.parentId !== 'undefined' && value.parentId != null && value
			.parentId != 0)
		//定义转换方法的具体实现
		let translator = (parents, children) => {
			//遍历父节点数据
			parents.forEach((parent) => {
				//遍历子节点数据
				children.forEach((current, index) => {
					//此时找到父节点对应的一个子节点
					if (current.parentId === parent.menuId) {
						//对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
						let temp = JSON.parse(JSON.stringify(children))
						//让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
						temp.splice(index, 1)
						//让当前子节点作为唯一的父节点，去递归查找其对应的子节点
						translator([current], temp)
						//把找到子节点放入父节点的children属性中
						typeof parent.children !== 'undefined' ? parent.children.push(
							current) : parent.children = [
							current
						]
					}
				})
			})
		}

		//调用转换方法
		translator(parents, children)

		//返回最终的结果
		return parents
	},
	transformDeptUser: (data) => {
		let arr = [];
		for (let i = 0; i < data.length; i++) {
			let item = data[i];
			arr.push(item)
			if (item.deptUsersVOS) {
				for (let j = 0; j < item.deptUsersVOS.length; j++) {
					let citem = item.deptUsersVOS[j];
					citem.parentId = citem.deptId;
					citem.name = citem.username;
					arr.push(citem)
				}
			}
		}
		return arr;
	},
	dealingDeptUser: (testdata) => {
		let data = JSON.parse(JSON.stringify(testdata));
		console.log(data)
		let result = [];
		if (!Array.isArray(data)) {
			return result;
		}
		//没有父节点的数据
		let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null || value
			.parentId == 0)

		//有父节点的数据
		let children = data.filter(value => value.parentId !== 'undefined' && value.parentId != null && value
			.parentId != 0)
		//定义转换方法的具体实现
		let translator = (parents, children) => {
			//遍历父节点数据
			parents.forEach((parent) => {
				//遍历子节点数据
				children.forEach((current, index) => {
					//此时找到父节点对应的一个子节点
					if (current.parentId === parent.deptId) {
						//对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
						let temp = JSON.parse(JSON.stringify(children))
						//让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
						temp.splice(index, 1)
						//让当前子节点作为唯一的父节点，去递归查找其对应的子节点
						translator([current], temp)
						//把找到子节点放入父节点的children属性中
						typeof parent.children !== 'undefined' ? parent.children.push(
							current) : parent.children = [current]
					}
				})
			})
		}
		translator(parents, children)

		//返回最终的结果
		return parents
	},
	deepFind: (arr, condition, children) => {
	    // 即将返回的数组
	    let main = []
	
	    // 用try方案方便直接中止所有递归的程序
	    try {
	      // 开始轮询
	      (function poll(arr, level) {
	        // 如果传入非数组
	        if (!Array.isArray(arr)) return
	
	        // 遍历数组
	        for (let i = 0; i < arr.length; i++) {
	          // 获取当前项
	          const item = arr[i]
	
	          // 先占位预设值
	          main[level] = item
	
	          // 检验是否已经找到了
	          const isFind = condition && condition(item, i, level) || false
	
	          // 如果已经找到了
	          if (isFind) {
	            // 直接抛出错误中断所有轮询
	            throw Error
	
	            // 如果存在children，那么深入递归
	          } else if (children && item[children] && item[children].length) {
	            poll(item[children], level + 1)
	
	            // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
	          } else if (i === arr.length - 1) {
	            // 删除占位预设值
	            main.length = main.length - 1
	          }
	        }
	      })(arr, 0)
	      // 使用try/catch是为了中止所有轮询中的任务
	    } catch (err) {}
	
	    // 返回最终数组
	    return main
	  }
}
export default gather;
