const Utils = require('./utils')

function clearCanvas (ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (!canvas.style) canvas.style = {}
  canvas.height = size
  canvas.width = size
  canvas.style.height = size + 'px'
  canvas.style.width = size + 'px'
}

function getCanvasElement () {
  try {
    return document.createElement('canvas')
  } catch (e) {
    throw new Error('You need to specify a canvas element')
  }
}

exports.render = function render (qrData, canvas, options) {
  let opts = options
  let canvasEl = canvas

  if (!canvas || !canvas.getContext) {
    throw new Error('You need to specify a canvas element')
  }

  opts = Utils.getOptions(opts)
  const size = Utils.getImageWidth(qrData.modules.size, opts)

  const ctx = canvasEl.getContext('2d')
  const image = ctx.createImageData(size, size)
  Utils.qrToImageData(image.data, qrData, opts)

  clearCanvas(ctx, canvasEl, size)
  ctx.putImageData(image, 0, 0)

  if(opts.border) {
    const radius = opts.border.radius || 10
    ctx.strokeStyle = opts.border.color;
    ctx.lineWidth = opts.border.width;
    // ctx.strokeRect(0, 0, size, size);
    canvasRoundRect(ctx, 0, 0, size, size, radius)
  }

  if (opts.image && opts.image.logo) {
    const radius = Math.floor(size/12)
    const logo = opts.image.logo
    drawLogoToCanvas(ctx, logo, size, radius, opts)
  }
  

  return canvasEl
}

 function canvasRoundRect(ctx, x, y, w, h, r) {
  const minSize = Math.min(w, h);
  if (r > minSize / 2) {
    r = minSize / 2;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.clip()
  ctx.stroke()
};

function drawLogoToCanvas(ctx, image, qrCodeSize, r, opts) {
  const width = 2 * r;
  const x = Math.floor(qrCodeSize / 2)
  const dx = x - r
  ctx.beginPath();
  ctx.fillStyle = "#ffffff"
  ctx.arc(x, x, r + 5, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(x, x, r, 0, 2 * Math.PI)
  ctx.clip()
  ctx.stroke();
  ctx.drawImage(image, dx, dx, width, width);
  ctx.restore()
  ctx.closePath();
};

exports.renderToDataURL = function renderToDataURL (qrData, canvas, options) {
  let opts = options
  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!opts) opts = {}

  const canvasEl = exports.render(qrData, canvas, opts)

  const type = opts.type || 'image/png'
  const rendererOpts = opts.rendererOpts || {}

  return canvasEl.toDataURL(type, rendererOpts.quality)
}
