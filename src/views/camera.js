/**
 * 调用摄像头
 * @params {Object} options 参数如下：
 *         video  {DOM} video元素
 *         width  {Number} 画布宽度
 *         height  {Number} 画布高度
 *         onShoot  {Function} 录像回调函数
 *         onError  {Function} error回调函数
 * 调用：
 *         new Camera(options);
 */
class Camera {
  constructor(options) {
    this.video = options.video
    this.width = options.width || 640
    this.height = options.height || 480
    this.onError = options.onError
    this.onShoot = options.onShoot
    this.isPlay = false
    this.mediaRecorder = null
    this.render()
  }

  init() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia //获取媒体对象
    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
      )
    })()
    console.log(this.video)
    // this.video.autoplay = 'ture'
    this.canvasDom = document.createElement('canvas')
    // this.canvasDom.width = this.width
    // this.canvasDom.height = this.height
    this.canvasDom.style.display = 'none'
    document.querySelector('body').appendChild(this.canvasDom)
  }

  // 检查摄像头是否可用
  canCameraUse() {
    return navigator.getUserMedia && window.URL
  }
  // 获取录像流到video中
  shoot() {
    let self = this
    let video = self.video
    console.log(video)
    if (self.canCameraUse) {
      navigator.getUserMedia(
        { video: true },
        (stream) => {
          this.isPlay = true
          video.srcObject = stream //chrome 108以上
        },
        function (error) {
          self.onError && self.onError(error)
        },
      )
    }
  }
  //检测环境摄像头
  enumDevices() {
    return navigator.mediaDevices.enumerateDevices()
  }
  // 将录像绘制到canvas
  drawVideo() {
    let canvasDom = this.canvasDom
    let ctx = canvasDom.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvasDom.width, canvasDom.height)
    ctx.drawImage(this.video, 0, 0, canvasDom.width, canvasDom.height)
  }

  // 录像事件绑定
  addShootEvent() {
    let self = this
    let video = self.video
    // 正在录像
    video.addEventListener(
      'play',
      function () {
        function animation() {
          self.drawVideo()
          self.onShoot && self.onShoot()
          window.requestAnimationFrame(animation)
        }
      },
      false,
    )
  }

  // 将录像成图片
  snapshot(cb, imageType = 'png') {
    let self = this
    let video = self.video
    let canvas = self.canvasDom
    console.log(canvas.width, canvas.height)
    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    let imageSrc = canvas.toDataURL('image/' + imageType)
    cb && cb(imageSrc)
  }

  // 开始
  play() {
    return new Promise((resolve, reject) => {
      if (!this.isPlay) reject(new DOMException('影像获取异常！'))
      this.mediaRecorder = new MediaRecorder(this.video.srcObject, {
        // mimeType: 'video/webm;codecs=vp9',
        mimeType: 'video/webm;codecs=h264',
      })
      this.mediaRecorder.ondataavailable = function (e) {
        console.log(e)
        let url = URL.createObjectURL(e.data)
        console.log(url)
        window.open(url)
      }
      resolve(this.mediaRecorder)
    })
  }
  // start() {}
  // //分割影像
  // cut() {
  //   a = this.mediaRecorder.requestData()
  //   console.log(a)
  // }

  // 停止录像
  pause() {
    this.video.pause()
  }

  render() {
    this.init()
    this.shoot()
    // this.drawVideo()
    // this.addShootEvent()
  }
}
export default Camera
