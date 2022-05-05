import QRCode from './build/qrcode.js'
console.log(QRCode, "QRCode");
const dom = document.getElementById("canvas");
const logo = document.getElementById("qr-logo")
var src = "";
// QRCode.toDataURL(dom, "http://www.apple.com", {
//   errorCorrectionLevel: "L", //容错率L（低）H(高)
//   margin: 2, //二维码内边距，默认为4。单位px
//   height: 200, //二维码高度
//   width: 200, //二维码宽度
//   scale: 1,
//   color: {
//     dark: "#7CCD7C", // 二维码背景颜色
//     light: "#ffffff", // 二维码前景颜色
//   },
//   image: {
//     logo: logo,
//     dx: 70,
//     dy: 70,
//     dWidth: 60,
//     dHeight: 60,
//   },
// }).then((res) => {
//   src = res;
// //   const img = document.getElementById("qr-img");
// //   img.setAttribute("src", src);
//   console.log(src, "src");
// });

QRCode.toCanvas(dom, "hai哈喽啊123456789987654321就立刻感觉好结果2       56346", {
  errorCorrectionLevel: "L", //容错率L（低）H(高)
  margin: 3, //二维码内边距，默认为4。单位px
  height: 200, //二维码高度
  width: 200, //二维码宽度
  scale: 1,
  border: {
      width: 15,
      // color: "yellowgreen",
      radius: 20,
  },
  color: {
    dark: "#7CCD7C", // 二维码背景颜色
    light: "#ffffff", // 二维码前景颜色
  },
  image: {
    logo: logo,
    shape: 'roundd',
    lineWidth: 5
  },
})
