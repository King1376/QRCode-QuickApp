console.log(QRCode, "QRCode");
const dom = document.getElementById("canvas");
const logo = document.getElementById("qr-logo")
var src = "";
QRCode.toDataURL("http://www.apple.com", {
  errorCorrectionLevel: "M", //容错率L（低）H(高)
  margin: 2, //二维码内边距，默认为4。单位px
  height: 200, //二维码高度
  width: 200, //二维码宽度
  scale: 1,
  canvas: dom,
  color: {
    dark: "#7CCD7C", // 二维码背景颜色
    light: "#ffffff", // 二维码前景颜色
  },
  image: {
    src: logo,
    dx: 70,
    dy: 70,
    dWidth: 60,
    dHeight: 60,
  },
}).then((res) => {
  src = res;
//   const img = document.getElementById("qr-img");
//   img.setAttribute("src", src);
//   console.log(src, "src");
});

// QRCode.toCanvas("http://www.apple.com", {
//   errorCorrectionLevel: "M", //容错率L（低）H(高)
//   margin: 1, //二维码内边距，默认为4。单位px
//   height: 200, //二维码高度
//   width: 200, //二维码宽度
//   scale: 1,
//   canvas: dom,
//   color: {
//     dark: "#7CCD7C", // 二维码背景颜色
//     // light: '#000' // 二维码前景颜色
//   },
// })
