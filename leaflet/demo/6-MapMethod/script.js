// 地图配置
const options = {
  center: [39.908815, 116.397471], // 中心点坐标
  minZoom: 4, // 缩放控制
  maxZoom: 14,
  attributionControl: false, //右下角贡献
  zoomControl: false, // 缩放控件
  scrollWheelZoom: true, // 鼠标控制缩放
  dragging: true, // 是否允许鼠标拖拽地图移动
  scale: 16, // 初始缩放比例,
};

// 使用 id 为 map 的 div 容器初始化地图
const map = L.map("map", {
  ...options,
});

// 定义中国的边界坐标
var chinaBounds = L.latLngBounds(
  L.latLng(3.199263, 73.53236), // 中国西南角的坐标
  L.latLng(53.642034, 135.613031) // 中国东北角的坐标
);

// 设置地图的最大边界为中国边界
map.setMaxBounds(chinaBounds);

// TODO: 如果将所有配置抽离出来,必须加这一行,否则地图加载不出来
map.setView(options.center, options.scale);

L.tileLayer(
  "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
  { subdomains: "1234" }
).addTo(map);

L.control
  .scale({
    maxWidth: 200, //控件的最大宽度，单位是像素。宽度是动态设置的，以显示圆形值（如100、200、500）。
    metric: true, //是否显示公制比例线（米/公里）。
    imperial: false, //是否显示英制比例线（英里/英尺）。
    updateWhenIdle: true, // 如果为 true, 控件在 移动结束时被更新，否则它总是最新的( move 时更新)。
    position: "bottomright",
  })
  .addTo(map);

L.control.zoom().addTo(map);

setTimeout(() => {
  map.panTo([39.929111, 116.401411], {
    // 注意：如果经纬度距离太远，动画时间太长，有可能会出现时间上的一片灰色屏幕
    animate: true,
    duration: 2, // 动画执行时间，也就是animate：true,才会触发
  });
}, 2000);

setTimeout(() => {
  /**
   * @param latlng // 平移点
   * @param zoom // 平移之后的地图缩放程度。
   * @param options // 平移配置项 动画时间等
   */
  map.flyTo([30.540655, 104.078794], 18, {
    duration: 2,
  });
}, 2000);

setTimeout(() => {
  map.fitBounds(latlngs, {
    animate: true,
    duration: 2,
  });
}, 2000);

setTimeout(() => {
  map.flyToBounds(latlngs, {
    animate: true,
    duration: 2,
  });
}, 2000);

var popup = L.popup({
  autoClose: false,
  closeButton: false,
})
  .setLatLng([39.854586, 116.491992])
  .setContent("<p>Hello world!<br />This is a nice popup.</p>")
  .openOn(map);

var popup = L.tooltip({
  permanent: true,
})
  .setLatLng([39.854586, 116.491992])
  .setContent("<p>Hello world!<br />This is a nice popup.</p>")
  .openOn(map);
