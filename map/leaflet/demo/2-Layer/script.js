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

// L.tileLayer(
//   "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
//   { subdomains: "1234" }
// ).addTo(map);

L.control
  .scale({
    maxWidth: 200, //控件的最大宽度，单位是像素。宽度是动态设置的，以显示圆形值（如100、200、500）。
    metric: true, //是否显示公制比例线（米/公里）。
    imperial: false, //是否显示英制比例线（英里/英尺）。
    updateWhenIdle: true, // 如果为 true, 控件在 移动结束时被更新，否则它总是最新的( move 时更新)。
    position: "bottomright",
  })
  .addTo(map);

const baseLayers = {
  // 可以自定义键名
  "<span style='color: #4c2f2f;'>高德地图</span>": L.tileLayer(
    "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    { subdomains: "1234" },
    {
      maxZoom: 18,
      attribution: "高德地图", //地图右下角，贡献
    }
  ),
  // 首次地图加载图层
  TencentMap: L.tileLayer(
    "http://rt0.map.gtimg.com/realtimerender?z={z}&x={x}&y={-y}&type=vector&style=0",
    {
      maxZoom: 18,
      attribution: "腾讯地图",
    }
  ).addTo(map),
  JieJinMap: L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "街景地图",
  }),
};

const park1 = L.marker([40.014812, 116.3941]).bindPopup("北京奥林匹克公园"),
  park2 = L.marker([39.94377, 116.482534]).bindPopup("朝阳公园"),
  park3 = L.marker([39.88181, 116.410928]).bindPopup("天坛公园"),
  park4 = L.marker([39.916401, 116.319569]).bindPopup("玉渊潭公园");

const park = L.layerGroup([park1, park2, park3, park4]).addTo(map);

const college1 = L.marker([39.992591, 116.3107]).bindPopup("北京大学"),
  college2 = L.marker([40.003323, 116.323043]).bindPopup("清华大学"),
  college3 = L.marker([39.990166, 116.359142]).bindPopup("北京科技大学"),
  college4 = L.marker([39.970342, 116.312981]).bindPopup("中国人民大学");

const college = L.layerGroup([college1, college2, college3, college4]);

const overLayers = {
  park: park,
  college: college,
};

// 注意使用本地js时,图层控件上的图是没有的,需要下载下来,图片地址请看leaflet.css搜索url
L.control
  .layers(baseLayers, overLayers, {
    position: "topleft",
    collapsed: true,
  })
  .addTo(map);

map.on("baselayerchange", function (eventLayer) {
  // 当 Overlay 图层切换时触发
  console.log("Baselayer changed:", eventLayer);
});
