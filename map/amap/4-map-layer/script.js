const map = new AMap.Map("container", {
  viewMode: "2D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
  zoom: 11, // 初始化地图层级
  center: [116.397428, 39.90923], // 初始化地图中心点
  layers: [
    AMap.createDefaultLayer(), // 标准图层
    new AMap.TileLayer.Traffic({
      zIndex: 10, // 堆叠顺序
      zooms: [7, 22], // 缩放层级
      opacity: 0.6, // 透明度
    }), // 实时路况图层
    new AMap.TileLayer.Satellite(), // 卫星图层
    // 路网
    new AMap.TileLayer.RoadNet(),
  ],
});
