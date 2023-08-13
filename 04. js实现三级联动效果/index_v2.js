// 渲染省会列表
// <option value="xx">xxx</option>
// 选好了省会之后，展示省会之下的城市
// 城市选好后，展示城市之下的学校。

// 1.选择要使用的DOM元素
var provinceDOM = document.getElementById('province');
var cityDOM = document.getElementById('city');
var schoolDOM = document.getElementById('school');


// 1. 渲染省市列表
// <option value="省标号">省名称</option>
// 放到provence select元素中
// 遍历对象 for-in

function renderOptionMap (obj, dom) {
  for (var prop in obj) {
    var optionDOM = document.createElement('option');
    optionDOM.value = prop;
    optionDOM.innerText = obj[prop];
    dom.appendChild(optionDOM);
  }
}


function renderOptionArray (arr, dom) { 
  for (var i = 0; i < arr.length; i++) {
    var optionDOM = document.createElement('option');
    optionDOM.innerText = arr[i];
    dom.appendChild(optionDOM);
  }
}


renderOptionMap(province, provinceDOM)

// 有了省名称和省编号，查找对应省相关的城市。
// 当选择（变化）
provinceDOM.onchange = function () {
  // 清空数据
  cityDOM.innerHTML = '';
  // 省序号
  var p = provinceDOM.value;
  // 渲染城市列表
  // 城市列表的集合
  var cityObj = city[p];
  // 城市为空，什么都不做
  if (cityObj == undefined) {
    return;
  }
  // 遍历，渲染
  renderOptionMap(cityObj, cityDOM);
  
  cityDOM.onchange();
}

// 城市变化
cityDOM.onchange = function () {
  schoolDOM.innerHTML = '';
  // 渲染选择城市下的大学
  // 拿到当前选择城市的编号
  var c = cityDOM.value;
  // 获取编号下面的大学
  var schoolArr = allschool[c];
  // 遍历，渲染
  renderOptionArray(schoolArr, schoolDOM);
}
