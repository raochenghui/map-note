const map = new AMap.Map("container", {
  viewMode: "2D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
  zoom: 11, // 初始化地图层级
  center: [116.397428, 39.90923], // 初始化地图中心点
});

// 1. 地图中心点和缩放层级

const getCenterAndZoom = () => {
  const zoom = map.getZoom();
  const center = map.getCenter();
  console.log("zoom:", zoom, "center:", center);
};

// map.on("zoomend", getCenterAndZoom);
// map.on("moveend", getCenterAndZoom);

// 设置缩放层级
const setZoom = (zoom) => {
  //zoom范围[11,18]
  map.setZoom(zoom);
};

// 设置地图中心
const setCenter = (center) => {
  // center =  [lng,lat]
  map.setCenter(center);
};

// 设置地图中心和缩放层级
const setZoomAndCenter = (zoom, center) => {
  map.setZoomAndCenter(zoom, center); //同时设置地图层级与中心点
};

// 2. 行政区
// 在引入密钥之前先引入安全密码，才会生效
const getCity = () => {
  map.getCity(function (info) {
    console.log("info", info);
  });
};

const setCity = (val) => {
  map.setCity(val); //可以是cityname、adcode、citycode
};

// map.on("zoomend", getCity);
// map.on("moveend", getCity);

// 3. 显示范围
const getBounds = () => {
  // 只能获取东北和西南坐标
  const bounds = map.getBounds();
  console.log("bounds", bounds);
  return bounds;
};

// getBounds();

//限制地图显示范围
const lockMapBounds = () => {
  const bounds = map.getBounds();
  map.setLimitBounds(bounds);
};

//取消地图显示限制
const unlockMapBounds = () => {
  map.clearLimitBounds();
};
