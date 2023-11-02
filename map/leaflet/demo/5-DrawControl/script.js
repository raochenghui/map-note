// 地图配置
const options = {
  center: [39.908815, 116.397471], // 中心点坐标
  minZoom: 4, // 缩放控制
  maxZoom: 18,
  attributionControl: false, //右下角贡献
  zoomControl: false, // 缩放控件
  scrollWheelZoom: true, // 鼠标控制缩放
  dragging: true, // 是否允许鼠标拖拽地图移动
  scale: 16, // 初始缩放比例,
};

// 使用 id 为 map 的 div 容器初始化地图
const map = L.map("map", options);

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

// // 编辑和修改
// const editableLayers = new L.FeatureGroup();
// map.addLayer(editableLayers);

// const drawOptions = {
//   draw: {},
//   edit: {
//     featureGroup: editableLayers,
//     edit: true,
//   },
// };

//添加绘制图层
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
//添加绘制控件
var drawControl = new L.Control.Draw({
  draw: {
    //绘制线
    polyline: true,
    //绘制多边形
    polygon: true,
    //绘制矩形
    rectangle: true,
    //绘制圆
    circle: true,
    //绘制标注
    marker: true,
    //绘制圆形标注
    circlemarker: true,
  },
  edit: {
    //绘制图层
    featureGroup: drawnItems,
    //图形编辑控件
    edit: true,
    //图形删除控件
    remove: true,
  },
});
//添加绘制控件
map.addControl(drawControl);
//绘制事件
map.on(L.Draw.Event.CREATED, function (e) {
  //获取标注的类型
  var type = e.layerType,
    //获取绘制图层
    drawlayer = e.layer;
  console.log("e", e);
  if (type === "marker") {
    //显示Popup
    drawlayer.bindPopup("A popup!");
  }
  //绘制图形添加显示
  drawnItems.addLayer(drawlayer);
});

console.log("on", L.Draw.Event);

map.on(L.Draw.Event.EDITED, function (e) {
  console.log("Edited " + " layers");
});
