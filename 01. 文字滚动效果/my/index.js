const ul = document.querySelector('ul');
const lis = document.querySelectorAll('li');
const lisLength = lis.length;
let count = 1
const onceTime = 2000
const onceScrollTime = 1000

// 初始化：一开始做什么
var list = document.querySelector('.list');
// 1. 将列表中的第一个元素，克隆到列表的最后一个
function cloneFirstItem() {
var firstItem = list.children[0];
var newItem = firstItem.cloneNode(true);
list.appendChild(newItem);
}
cloneFirstItem();

async function scroll (time) {
    return new Promise((resolve, reject) => {
        const outTimer = setTimeout(() => {
            ul.scrollTop += 1
            if (ul.scrollTop === 120) {
                ul.scrollTop = 0
            }
            resolve(outTimer)
         }, time)
    })
}
setInterval(async () => {
    for (let i = 0; i < 30; i++){
        const timer = await scroll(onceScrollTime / 30)
        clearTimeout(timer)
    }
    count++;
}, onceTime)