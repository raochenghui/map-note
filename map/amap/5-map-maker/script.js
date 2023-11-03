const map = new AMap.Map("container", {
  viewMode: "2D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
  zoom: 11, // 初始化地图层级
  center: [116.397428, 39.90923], // 初始化地图中心点
});

// 以 icon URL 的形式创建一个途经点
var viaMarker = new AMap.Marker({
  position: new AMap.LngLat(116.38, 39.92),
  // 将一张图片的地址设置为 icon
  icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
  // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
  offset: new AMap.Pixel(-13, -30),
});

// 创建一个 Icon
var startIcon = new AMap.Icon({
  // 图标尺寸
  size: new AMap.Size(25, 34),
  // 图标的取图地址
  image: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
  // 图标所用图片大小
  imageSize: new AMap.Size(135, 40),
  // 图标取图偏移量
  imageOffset: new AMap.Pixel(-9, -3),
});

// 将 icon 传入 marker
var startMarker = new AMap.Marker({
  position: new AMap.LngLat(116.35, 39.89),
  icon: startIcon,
  offset: new AMap.Pixel(-13, -30),
});

// 创建一个 icon
var endIcon = new AMap.Icon({
  size: new AMap.Size(25, 34),
  image: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
  imageSize: new AMap.Size(135, 40),
  imageOffset: new AMap.Pixel(-95, -3),
});

// 将 icon 传入 marker
var endMarker = new AMap.Marker({
  position: new AMap.LngLat(116.45, 39.93),
  icon: endIcon,
  offset: new AMap.Pixel(-13, -30),
});

var starIcon = new AMap.Icon({
  size: new AMap.Size(24, 24),
  image: "../../../images/2.png",
  // imageSize: new AMap.Size(24, 24),
});

var starMarker = new AMap.Marker({
  position: new AMap.LngLat(116.397452, 39.90919),
  icon: starIcon,
  offset: new AMap.Pixel(-12, -12), // 一般设置为size的一半，居中
});

// 点标记显示内容，HTML要素字符串
var markerContent =
  "" +
  '<div class="custom-content-marker">' +
  '   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">' +
  '   <div class="close-btn" onclick="clearMarker()">X</div>' +
  "</div>";

var htmlMarker = new AMap.Marker({
  position: new AMap.LngLat(116.399452, 39.99919),
  // 将 html 传给 content
  content: markerContent,
  // 以 icon 的 [center bottom] 为原点
  offset: new AMap.Pixel(-13, -30),
});

// 清除 marker
function clearMarker() {
  map.remove(htmlMarker);
}

// 将 markers 添加到地图
map.add([viaMarker, startMarker, endMarker, starMarker, htmlMarker]);
