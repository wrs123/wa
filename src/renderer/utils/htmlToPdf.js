/* eslint-disable */
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

/**
 * @param  ele          要生成 pdf 的DOM元素（容器）
 * @param  padfName     PDF文件生成后的文件名字
 * */
function downloadPDF(ele, pdfName, callback){

  let eleW = ele.offsetWidth;// 获得该容器的宽
  let eleH = ele.offsetHeight;// 获得该容器的高
  let eleOffsetTop = ele.offsetTop;  // 获得该容器到文档顶部的距离
  let eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离

  var canvas = document.createElement("canvas");
  var opts = {
    scale: 10, //设置可以解决导出模糊问题
    dpi: 500,
    // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
    useCORS:true  //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
  }

  canvas.width = eleW * 8;    // 将画布宽&&高放大两倍
  canvas.height = eleH * 8;

  //设置画布属性
  var context = canvas.getContext("2d");

  context.scale(5, 5);
  var abs = 0;


  let win_in = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
  let win_out = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

  if(win_out>win_in){
    // abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
    abs = (win_out - win_in)/2;    // 获得滚动条宽度的一半
    // console.log(a, '新abs');
  }
  canvas.width = eleW * 2;    // 将画布宽&&高放大两倍
  canvas.height = eleH * 2;

  var context = canvas.getContext("2d");
  context.scale(2, 2);
  context.translate(-eleOffsetLeft -abs, -eleOffsetTop);
  // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
  // translate的时候，要把这个差值去掉

  // html2canvas(element).then( (canvas)=>{ //报错
  // html2canvas(element[0]).then( (canvas)=>{
  html2canvas( ele, {
    dpi: 300,
    // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
    useCORS:true  //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
  } ).then( (canvas)=>{
    var contentWidth = canvas.width
    var contentHeight = canvas.height

    console.log('contentWidth', contentWidth)
    console.log('contentHeight', contentHeight)
    // 将canvas转为base64图片
    var pageData = canvas.toDataURL('image/jpeg', 1.0)

    // 设置pdf的尺寸，pdf要使用pt单位 已知 1pt/1px = 0.75   pt = (px/scale)* 0.75
    // 2为上面的scale 缩放了2倍
    var pdfX = (contentWidth + 10) / 2 * 0.75
    var pdfY = (contentHeight + 500) / 2 * 0.75 // 500为底部留白

    // 设置内容图片的尺寸，img是pt单位
    var imgX = pdfX;
    var imgY = (contentHeight / 2 * 0.75); //内容图片这里不需要留白的距离

    // 初始化jspdf 第一个参数方向：默认''时为纵向，第二个参数设置pdf内容图片使用的长度单位为pt，第三个参数为PDF的大小，单位是pt
    var PDF = new JsPDF('', 'pt', [pdfX, pdfY])

    // 将内容图片添加到pdf中，因为内容宽高和pdf宽高一样，就只需要一页，位置就是 0,0
    PDF.addImage(pageData, 'jpeg', 0, 0, imgX, imgY)
    PDF.save('扫描报告.pdf')
    callback()
  })
}
export default {
  downloadPDF
}


