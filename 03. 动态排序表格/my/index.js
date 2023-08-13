(function () { 
  var tbody = document.querySelector('tbody') // tbody 获取之后，在追加元素及查找复选框的时候进行使用
  var checkAll = document.querySelector('.checkAll')   // 全选按钮获取
  var checkOneList = tbody.querySelectorAll('[type="checkbox"]')   // 单选按钮集合获取

  // 排序相关
  var ths = document.querySelectorAll('th')   // th集合
  var curOrder = {} // 当前排序方式，默认升序

  /* 程序入口函数 */
  var init = function () {
    initEvent()
  }

  function initEvent () {
    checkAll.addEventListener('click', checkAllEvent)
    checkOneList.forEach(function (node) {
      node.addEventListener('click', checkOneEvent)
    })
    
    ths.forEach(function (node, index) { 
      // 全选按钮不绑定
      if (index === 0) return
      // 初始化排序顺序
      curOrder[ths[index].innerText] = 'asc' // 默认升序
      node.addEventListener('click', onThsClick.bind(node, index))
    })
  }

  /* 全选按钮事件 */
  function checkAllEvent () { 
    var checked = checkAll.checked
    for (var i = 0; i < checkOneList.length; i++) {
      checkOneList[i].checked = checked
    }
  }

  /* 单选按钮事件 */
  function checkOneEvent () { 
    var checkedNum = 0
    for (var i = 0; i < checkOneList.length; i++) {
      checkOneList[i].checked && checkedNum++
    }
    checkAll.checked = checkedNum === checkOneList.length
  }

  /* 表头点击事件 */
  function onThsClick (index) { 
    var rows = tbody.querySelectorAll('tr')     // 所有的行的集合
    // 1、先转化为数组，才会有排序方法！！！
    var sortedRows = Array.prototype.slice.call(rows)
    // 2、进行排序得到新的数组
    const strCompNames = ['姓名', '职位']
    const numCompNames = ['编号', '年龄']
    const titleName = ths[index].innerText
    sortedRows.sort(function (a, b) { 
      if (strCompNames.includes(titleName)) {
        return a.children[index].innerText.localeCompare(b.children[index].innerText)
      } else if (numCompNames.includes(titleName)) {
        return Number(a.children[index].innerText) -Number( b.children[index].innerText)
      }
    })
    // 3、遍历新的数组，使用appendChild方法进行每一个节点的添加
    if (curOrder[titleName] === "asc") {
      sortedRows.forEach(function (node) { 
        tbody.appendChild(node)
      })
    } else {
      sortedRows.reverse().forEach(function (node) { 
        tbody.appendChild(node)
      })
    }
 
    // 4、更新排序方式
    curOrder[titleName] = curOrder[titleName] === 'asc' ? 'desc' : 'asc'
    
  }

  init()
})()