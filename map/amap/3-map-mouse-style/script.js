const map = new AMap.Map("container", {
  viewMode: "2D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
  zoom: 11, // 初始化地图层级
  center: [116.397428, 39.90923], // 初始化地图中心点
});

//使用CSS默认样式定义地图上的鼠标样式
map.setDefaultCursor("pointer");

/**
 *
 * @param {*} target
 * default
 * pointer
 * move
 * crosshair
 */
//自定义鼠标样式图标
function switchCursor(target) {
  var value = target.value;
  map.setDefaultCursor(value);
}
