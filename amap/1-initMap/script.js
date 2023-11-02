// const map = new AMap.Map("container", {
//   viewMode: "2D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
//   zoom: 11, // 初始化地图层级
//   center: [116.397428, 39.90923], // 初始化地图中心点
// });

// ⚠️：请尽量不要进行地图的重新创建和销毁，如果有图层的隐藏和显示需求，请使用图层的 show/hide 方法。
var map = null;

function createMap() {
  map = new AMap.Map("container", {
    zoom: 11,
  });
  log.success("创建地图成功");
}

function destroyMap() {
  map && map.destroy();
  log.info("地图已销毁");
}

//初始化地图
createMap();

// 地图加载完成事件监听
map.on("complete", function (e) {
  console.log("map", "地图加载完成");
});

//绑定创建、销毁事件
document.querySelector("#create-btn").onclick = createMap;
document.querySelector("#destroy-btn").onclick = destroyMap;
