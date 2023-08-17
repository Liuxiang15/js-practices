// 选择图片容器
var imgs = document.getElementById('imgs');
// 选择侧边导航栏容器
var sideBar = document.getElementById('side-bar');

// 根据data数组，生成对应的图片以及侧边栏

for (var i = 0; i < data.length; i++) { 
    var item = data[i]
    // 创建图片（a)
    var tagA = document.createElement('a');
      tagA.setAttribute('href', '#');
      tagA.style.backgroundColor = item.bg;
      tagA.style.backgroundImage = 'url('+ item.img +')';
      imgs.appendChild(tagA);

    // 创建导航（a）
    var tagNav = document.createElement('a');
      tagNav.setAttribute('class', 'nav');
      tagNav.setAttribute('href', '#');
      tagNav.setAttribute('title',item.title + ':' + item.desc);
      tagNav.innerHTML = '<span>'+ item.title +'</span> ' + item.desc;
      sideBar.appendChild(tagNav); 
}