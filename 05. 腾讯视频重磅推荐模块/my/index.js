// 选择图片容器
var imgs = document.getElementById('imgs');
// 选择侧边导航栏容器
var sideBar = document.getElementById('side-bar');

// 存储我们创建的图片元素（a)
var imgsDom = [];
// 存储我们创建的导航元素（a）
var navDom = [];

// 根据data数组，生成对应的图片以及侧边栏
function generateImgAndNav () {
  for (var i = 0; i < data.length; i++) {
    var item = data[i]
    // 创建图片（a)
    var tagA = document.createElement('a');
    tagA.setAttribute('href', '#');
    tagA.style.backgroundColor = item.bg;
    tagA.style.backgroundImage = 'url(' + item.img + ')';
    imgs.appendChild(tagA);
    imgsDom.push(tagA);

    // 创建导航（a）
    var tagNav = document.createElement('a');
    tagNav.setAttribute('class', 'nav');
    tagNav.setAttribute('href', '#');
    tagNav.setAttribute('title', item.title + ':' + item.desc);
    tagNav.innerHTML = '<span>' + item.title + '</span> ' + item.desc;
    sideBar.appendChild(tagNav);
    navDom.push(tagNav)
  }
}

function activateByIndex (newIndex) {
  // 1. 把原来活跃的图片和导航取消
  imgsDom[activeIndex].setAttribute('class', "")
  navDom[activeIndex].setAttribute('class', "")
  activeIndex = newIndex
  // 2. 把新的导航和图片展示
  imgsDom[activeIndex].setAttribute('class', "active")
  navDom[activeIndex].setAttribute('class', "active")
}

generateImgAndNav()


// 记录当前活跃的图片和导航（active);
var activeIndex = 0
activateByIndex(activeIndex)

function initMouseEvent () {
  for (var i = 0; i < data.length; i++) {
    // 这里使用了闭包自执行函数，传入参数i
    navDom[i].onmouseenter = (function (index) {
      return function (e) {
        console.log('onmouseenter', e, index);
        clearInterval(timer)
        activateByIndex(index)
      }
    })(i)

    navDom[i].onmouseleave = function () {
      timer = startMoveInterval()
    }
  }
}

function move () {
  var newIndex = (activeIndex + 1) % data.length
  activateByIndex(newIndex)
}

function startMoveInterval () {
  var time = 1000
  var timer = setInterval(move, time)
  return timer
}

var timer = startMoveInterval()

initMouseEvent()