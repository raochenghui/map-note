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

// Marker
const marker = L.marker([39.908685, 116.397613], {
  // icon 会使用默认图标
  opacity: 0.8,
  zIndexOffset: 99,
  draggable: true,
  autoPan: true,
}).addTo(map);

const myIcon = L.icon({
  iconUrl: "../../img/car.png",
  iconSize: [74, 50],
  iconAnchor: [37, 25], // 一般设置为iconSize的一半
  // 图标 "tip" 的坐标（相对于其左上角）。图标将被对齐，使该点位于标记的地理位置。如果指定了尺寸，默认为居中，也可以在CSS中设置负的边距。
  // shadowUrl: "my-icon-shadow.png",
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94],
});

L.marker([39.908922, 116.402472], { icon: myIcon }).addTo(map);

const myDivIcon = L.divIcon({
  html: '<div class="my-div-icon"><span>hello</span></div>',
  className: "my-icon",
});

L.marker([39.918922, 116.412472], { icon: myDivIcon }).addTo(map);

// Polyline
const line1 = [
  [39.9133485, 116.39243235],
  [39.92276094, 116.39184785],
  [39.92294022, 116.40166574],
  [39.9133485, 116.40236709],
  [39.9135278, 116.39886071],
];
const line2 = [
  [39.90734182, 116.39114673],
  [39.90707285, 116.37431614],
  [39.93262026, 116.37279632],
  [39.93306838, 116.37992599],
  [39.93324763, 116.38635439],
  [39.93297876, 116.40388638],
  [39.93109664, 116.40669151],
  [39.92697373, 116.40622402],
  [39.92571888, 116.40657467],
  [39.92509145, 116.40680843],
  [39.92491218, 116.40715907],
  [39.92464328, 116.40774347],
  [39.92455362, 116.40809411],
];

const routeLine1 = L.polyline(line1, {
  weight: 4,
  color: "#FF7474",
}).addTo(map);

// 相同经纬度，后画的线会覆盖新画的，可以实现轨迹效果
const routeLine2 = L.polyline(line2, {
  weight: 6,
  color: "#5185FF",
}).addTo(map);

const realRouteLine2 = L.polyline(line2, {
  weight: 4,
  color: "#fff",
  dashArray: "20",
  dashOffset: "-",
}).addTo(map);

// Polygon

// 从一个 LatLng 点的数组中创建一个红色的多边形
let latlngs = [
  [39.94057, 116.396888],
  [39.939827, 116.396242],
  [39.933447, 116.396322],
  [39.9332, 116.408682],
  [39.94057, 116.40852],
];

let latlngs2 = [
  // 外环
  [
    [39.928182, 116.393899],
    [39.92812, 116.399634],
    [39.923288, 116.399796],
    [39.923288, 116.393899],
  ],

  //内环
  [
    [39.930226, 116.393091],
    [39.929111, 116.401411],
    [39.921863, 116.401169],
    [39.921678, 116.390506],
  ],
];

var polygon = L.polygon([latlngs, latlngs2], {
  color: "#FF9D00",
  weight: 2,
  opacity: 0.8,
  // fillColor: "",
}).addTo(map);

// 将地图放大到多边形的位置
// map.fitBounds(polygon.getBounds());

// Circle

// 圆心
const circleCenter = [39.91319573, 116.41236019];

L.circle(circleCenter, { radius: 200, color: "red" }).addTo(map);

L.circleMarker(circleCenter, { weight: 1, radius: 10, color: "black" }).addTo(
  map
);

// setTimeout(() => {
//   map.panTo([39.929111, 116.401411], {
//     // 注意：如果经纬度距离太远，动画时间太长，有可能会出现时间上的一片灰色屏幕
//     animate: true,
//     duration: 2, // 动画执行时间，也就是animate：true,才会触发
//   });
// }, 2000);

// setTimeout(() => {
//   /**
//    * @param latlng // 平移点
//    * @param zoom // 平移之后的地图缩放程度。
//    * @param options // 平移配置项 动画时间等
//    */
//   map.flyTo([30.540655, 104.078794], 18, {
//     duration: 2,
//   });
// }, 2000);

// setTimeout(() => {
//   map.fitBounds(latlngs, {
//     animate: true,
//     duration: 2,
//   });
// }, 2000);

// setTimeout(() => {
//   map.flyToBounds(latlngs, {
//     animate: true,
//     duration: 2,
//   });
// }, 2000);
