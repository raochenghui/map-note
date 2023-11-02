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

// 经纬度
let latlng = L.latLng(39.908685, 116.397613);

latlng = L.latLng([39.908685, 116.397613]);

latlng = L.latLng({ lat: 39.908685, lng: 116.397613 });

const latlng2 = L.latLng(39.908922, 116.402472);

// equals 判断俩个经纬度在误差范围内是否相等。
/**
 第二个参数它接受的第二个参数是一个可选的精度值，用于比较经纬度点之间的差异。
 这个精度值是以地球上的度数单位来表示的。
 具体来说，这个精度值是一个小数，表示角度的度数。默认情况下，精度值是1.0e-9，也就是0.000000001度。
这个值足够小，可以认为是“几乎相等”的阈值。
 如果两个经纬度的纬度和经度之间的差值都小于等于这个精度值，那么它们就被认为是相等的。
 */
console.log(latlng2.equals(latlng)); // false
console.log(latlng2.equals(latlng, 0.01)); // true

// toString
console.log(latlng2.toString()); // LatLng(39.908922, 116.402472)

// distanceTo 计算俩个点之间的距离，单位m
console.log(latlng2.distanceTo(latlng)); // 415.28013622438715
