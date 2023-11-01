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

var markers = new L.MarkerClusterGroup({
  // spiderfyOnMaxZoom: false,
  // showCoverageOnHover: false,
  // zoomToBoundsOnClick: true,
  iconCreateFunction: function (cluster) {
    var childCount = cluster.getChildCount();

    var c = " marker-cluster-";
    if (childCount < 5) {
      c += "small";
    } else if (childCount < 100) {
      c += "medium";
    } else {
      c += "large";
    }

    return new L.DivIcon({
      html: "<div><span>" + childCount + "</span></div>",
      className: "marker-cluster" + c,
      iconSize: new L.Point(40, 40),
    });
  },
  spiderfyShapePositions: function (count, centerPt) {
    var distanceFromCenter = 35,
      markerDistance = 45,
      lineLength = markerDistance * (count - 1),
      lineStart = centerPt.y - lineLength / 2,
      res = [],
      i;

    res.length = count;

    for (i = count - 1; i >= 0; i--) {
      res[i] = new Point(
        centerPt.x + distanceFromCenter,
        lineStart + markerDistance * i
      );
    }

    return res;
  },
});
var markersList = [];

function getRandomLatLng(map) {
  var bounds = map.getBounds(),
    southWest = bounds.getSouthWest(),
    northEast = bounds.getNorthEast(),
    lngSpan = northEast.lng - southWest.lng,
    latSpan = northEast.lat - southWest.lat;

  return new L.LatLng(
    southWest.lat + latSpan * Math.random(),
    southWest.lng + lngSpan * Math.random()
  );
}

function populate() {
  for (var i = 0; i < 100; i++) {
    var m = new L.Marker(getRandomLatLng(map), { draggable: false });
    markersList.push(m);
    markers.addLayer(m);
  }
  return false;
}

populate();

map.addLayer(markers);
