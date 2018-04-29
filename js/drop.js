// 拖放文件的事件的一个小套路写法
const holder = document.getElementById('id-drag-image')
holder.ondragover = () => {
  return false;
}
holder.ondragleave = holder.ondragend = () => {
  return false;
}

holder.ondrop = (e) => {
  e.preventDefault()
  console.log('e.dataTransfer.files', e.dataTransfer.files);
  return false;
}

// 一个比较详细点的例子
/* 放下目标节点时触发事件 */
document.body.addEventListener("dragover", function( event ) {
  // 阻止默认动作
  event.preventDefault();
}, false);
document.body.addEventListener("dragend", function( event ) {
  // 阻止默认动作
  event.preventDefault();
}, false);

document.body.addEventListener("drop", function( event ) {
  // 阻止默认动作（如打开一些元素的链接）
  event.preventDefault();
  // 移动拖动的元素到所选择的放置目标节点
  var files = event.dataTransfer.files
  // console.log("files", files)
  let file = files[0];
  console.log("file", file);
  // console.log('file type 是', file.type);
  if (file.type == "image/png") {

    // 是 png 加载热力图
    let imageReader = new FileReader();
    imageReader.addEventListener("loadend", function() {
      console.log('imageReader.result', imageReader.result);
    });

    let objectURL = URL.createObjectURL(file);
    // let img = new Image();
    // img.onload = function () {
    //   let {matrix, max} = PNG.graypng2matrix(img)
    //   console.log('matrix[0]', matrix[0]);
    // }
    // img.src = objectURL;

  } else if (file.type == "text/xml") {
    var oFReader = new FileReader();
    oFReader.onload = function (oFREvent) {
      console.log('oFREvent', oFREvent);
      console.log("FileReader", oFREvent.target.result);
    }
    oFReader.readAsText(file);
  } else {
    // ...
  }
}, false);
