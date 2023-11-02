Leaflet 是一个开源并且对移动端友好的交互式地图 JavaScript 库。 它大小仅仅只有 42 KB of JS, 并且拥有绝大部分开发者所需要的所有地图特性 。
Leaflet 简单、高效并且易用。 它可以高效的运行在桌面和移动平台, 拥有着大量的 扩展插件、 优秀的文档、简单易用的 API 和完善的案例, 以及可读性较好的 源码 。

官方文档：[https://leafletjs.cn/reference.html](https://leafletjs.cn/reference.html)

工具：
取点：[https://lbs.qq.com/getPoint/#S](https://lbs.qq.com/getPoint/#S)
阿里云数据可视化平台：点、线、圆等
[https://datav.aliyun.com/portal/school/atlas/area_generator#10.22/116.495275/39.906305](https://datav.aliyun.com/portal/school/atlas/area_generator#10.22/116.495275/39.906305)
leaflet示例：[http://develop.smaryun.com:81/API/JS/IGSInterfaceDemoForLeaflet/index.htm](http://develop.smaryun.com:81/API/JS/IGSInterfaceDemoForLeaflet/index.htm)

## 基础地图
### 地图-Map
基础使用

- 引入`leaflet.js`和`leaflet.css`。
- 创建地图id容器，并给容器指定宽高（**必须**）。
- 初始化地图。
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>leaflet基础使用</title>
    <!-- leaflet的样式 -->
    <link rel="stylesheet" href="../leaflet/leaflet_1.9.3.css" />
    <!-- 自己的样式 -->
    <link rel="stylesheet" href="style.css" />
    <!-- leaflet.js -->
    <script src="../leaflet/leaflet_1.9.3.js"></script>
  </head>
  <body>
    <div id="map"></div>
  </body>
  <!-- 自己的js -->
  <script src="./script.js"></script>
</html>
```
`style.css`
```css
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

/* 地图容器必须要有高度和宽度才会显示 */
#map {
    width: 100%;
    height: 100%;
}
```
`script.js`
```javascript
// 使用 id 为 map 的 div 容器初始化地图，同时指定地图的中心点和缩放级别
var map = L.map("map", {
  center: [39.908815, 116.397471],
  zoom: 13,
});

```
此时你的页面是这个样子的，一片灰色的，那是因为没有瓦片的原因。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27330390/1691473178767-43fe5137-d871-49f6-98a3-27afbce84dcb.png#averageHue=%23dddddd&clientId=ue6551dc5-5447-4&from=paste&height=263&id=u8f50a6af&originHeight=923&originWidth=1920&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=10216&status=done&style=none&taskId=u8e05c57e-4556-4ce4-82e5-a5cc02b888c&title=&width=547)
### 瓦片-TileLayer
用于在地图上加载和显示瓦片图层。 
官方使用示例
```javascript
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
  foo: "bar",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
```
设置完地图瓦片是这样的。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27330390/1691473839775-4be4366d-a592-461a-9ed7-d856bcc9782f.png#averageHue=%23e1ddcd&clientId=ue6551dc5-5447-4&from=paste&height=567&id=u8adeeefe&originHeight=850&originWidth=1919&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=709122&status=done&style=none&taskId=uf31666da-9e1a-44c1-9e79-c08f4891d58&title=&width=1279.3333333333333)
> 如果还是灰色的请查看网络，是否能请求地图资源

URL 模板
表现为以下方式:
```javascript
'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
```
这是一个典型的瓦片地图服务的 URL 模板，用于获取地图瓦片图像。让我们逐个解释每个占位符的含义：

-  `{s}`: 这通常用来表示子域（subdomain），在一些瓦片服务中，使用多个子域可以帮助在并发访问时分散服务器负载。例如，你可能会看到类似于 `a`, `b`, `c` 的子域被用来表示不同的瓦片服务器。 
-  `somedomain.com`: 这是瓦片服务的主域名。 
-  `blabla`: 这部分可能包含特定于服务商的路径信息，通常是一些标识或版本信息。 
-  `{z}`: 这是缩放级别（Zoom Level）的占位符。在指定缩放级别下，地图被分成一系列的瓦片，这个占位符会被替换为实际的缩放级别。 
-  `{x}`: 这是横向坐标的占位符。在指定缩放级别下，地图被分成一系列的瓦片，这个占位符会被替换为实际的横向坐标。 
-  `{y}`: 这是纵向坐标的占位符。在指定缩放级别下，地图被分成一系列的瓦片，这个占位符会被替换为实际的纵向坐标。 
-  `{r}`: 这是一些额外的参数，可能用来控制缓存或其他行为。 
   - {r} 可以用来在URL中添加 "@2x" 以加载视网膜瓦片。

综合起来，通过替换上述占位符，你可以获得具体缩放级别、位置的地图瓦片的 URL 地址，从而加载并显示地图数据。例如，一个具体的瓦片 URL 可能是：
```

https://tile.openstreetmap.org/13/6742/3104.png?bar
```
> 可以查看网络请求


### 图层-Layers
图层控件使用户能够在不同的基础图层之间进行切换，并打开/关闭覆盖物图层 (请看 [详细示例](http://leafletjs.com/examples/layers-control/))。
leaflet图层有俩种类别：

- baseLayers: 互斥的图层（在地图上同一时间只能有一个图层可见），比如tile layers
- oberLayers: 在base layer之上放置的其他东西

列如：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27330390/1691480902394-3fdb3cc8-1a5d-4579-8b9f-551a7e95061f.png#averageHue=%23cfe9e2&clientId=u45a596c8-d029-4&from=paste&height=421&id=u55ffc6c4&originHeight=631&originWidth=1919&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1961371&status=done&style=none&taskId=u0f08532f-0b50-4a06-b865-19ee9dc3ae6&title=&width=1279.3333333333333)
js代码：
```javascript
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

```
### LatLng 经纬度
代表一个具有一定经纬度的地理点。
leaflet中所有操作都是对经纬度进行操作，所以我们需要提供符合要求的经纬度
使用示例：
```javascript
// 经纬度
let latlng = L.latLng(39.908685, 116.397613);

latlng = L.latLng([39.908685, 116.397613]);

latlng = L.latLng({ lat: 39.908685, lng: 116.397613 });
```
**Properties 属性**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **lat** | Number | 纬度（度） |
| **lng** | Number | 经度（度） |
| **alt** | Number | 海拔高度，以米为单位（可选） |

使用示例：
```javascript
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

// distanceTo // 计算俩个点之间的距离
console.log(latlng2.distanceTo(latlng));
```
### Marker 标记
L.Marker 用于在地图上显示可点击/可拖动的图标。
**使用示例**
```javascript
// Marker
const marker = L.marker([39.908685, 116.397613], {
  // icon 会使用默认图标
  opacity: 0.8,
  zIndexOffset: 99,
  draggable: true,
  autoPan: true,
}).addTo(map);
```
参考链接：[https://leafletjs.cn/reference.html#marker](https://leafletjs.cn/reference.html#marker)

### Icon 图标
代表创建标记时提供的一个图标。
**使用示例**
```javascript
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
```

### DivIcon 自定义图标
代表一个轻量级的标记图标，使用一个简单的 <div> 元素而不是图片。继承自 Icon ，但忽略了 iconUrl 和 shadow 选项。
**使用示例**
```javascript
const myDivIcon = L.divIcon({
  html: "<div><span>hello</span></div>", // 自定义
  className: "my-icon",
});

L.marker([39.908922, 116.402472], { icon: myDivIcon }).addTo(map);

```
默认情况下，它有一个 'leaflet-div-icon' CSS类，并被设计成一个带有阴影的白色小方块。

### Polyline 折线
一个用于在地图上绘制折线覆盖物的类。
**使用示例：**
```javascript
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
```
### Methods 方法
| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| **setLatLngs**(<LatLng[]> _latlngs_) | this | 用给定的地理点数组替换多段折线中的所有点。 |
| **addLatLng**(<LatLng
> _latlng_, <LatLng[]> _latlngs?_) | this | 将一个给定的点添加到折线上。默认情况下，如果是多段折线，会添加到折线的第一个环上，但是可以通过传递一个特定的环作为LatLng数组来重写（你可以提前用 getLatLngs访问）。 |

> 实现实际轨迹就是使用`addLaLng`方法，在你更新下一个轨迹点时，然后将点添加到轨迹折线上

### Polygon 多边形
一个用于在地图上绘制多边形覆盖物的类。
> 请注意，您在创建多边形时传递的最后一个点不应该和第一个相同 - 最好过滤掉这些点。

**使用示例**
```javascript
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
map.fitBounds(polygon.getBounds());

```
### Circle 圆形
一个用于在地图上绘制圆形覆盖物的类。
这是一个近似值，在接近两极时开始与真实的圆相背离（由于投影失真）。
**使用示例：**
```javascript
const circleCenter = [39.91319573, 116.41236019];

L.circle(circleCenter, { radius: 200, color: "red" }).addTo(map);

L.circleMarker(circleCenter, { weight: 1, radius: 10, color: "black" }).addTo(
  map
);
```
### Popup 弹出窗口
用于在地图的某些位置打开弹出窗口。使用 `Map.openPopup`打开弹出窗口，同时确保一次只打开一个弹出窗口（推荐使用），或者使用 `Map.addLayer`打开任意多个。

如果您只想将弹出窗口（popup）绑定到标记（marker）单击然后打开它，这其实很简单：
```javascript
marker.bindPopup(`html`,{options}).openPopup();
```
这是在地图上打开弹出窗口的更复杂的方法：
```javascript
var popup = L.popup()
  .setLatLng([39.854586, 116.491992])
  .setContent('<p>Hello world!
This is a nice popup.</p>') // 自定义html
  .openOn(map);
```
> 注意：如果添加弹出窗口时地图移动了，关闭autoPan配置
> `autoPan`: 如果你不想让地图做平移动画，把它设置为 false，以适应打开的 Popup。

### Tooltip 工具提示
用于在地图图层顶部显示小文本
### 使用示例

```javascript
marker.bindTooltip("my tooltip text").openTooltip();
```
关于工具提示（tootip）偏移，Leaflet 在计算工具提示偏移时考虑了两个选项：

- 工具提示（tooltip）的 offset 选项：它默认为 [0,0]，并且它只针对于一个工具提示。添加正 x 偏移以将工具提示向右移动，并添加正 y 偏移以将其移动到底部，负数将移动到左侧和顶部。
- Icon 的 tooltipAnchor 选项：只适用于 Marker。你如果你使用一个自定义的图标，应该调整这个值。

## 地图方法
### 缩放
缩放控件

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| **zoomInText** | String | '<span aria-hidden="true">+</span>' | 设置在 'zoom in' 按钮上的文字。 |
| **zoomInTitle** | String | 'Zoom in' | 设置在 'zoom in' 按钮上的标题。 |
| **zoomOutText** | String | '<span aria-hidden="true">&#x2212;</span>' | 设置在 'zoom out' 按钮上的文字。 |
| **zoomOutTitle** | String | 'Zoom out' | 设置在 'zoom out' 按钮上的标题。 |

```javascript
L.control.zoom().addTo(map)
```
获取地图当前缩放层级
```javascript
// 监听地图缩放结束事件
map.on('zoomend', () => {
	// 获取层级 
	map.getZoom()
});
```
### 

### 平移
平移有两种：

- 平移到一个点。
   - panTo：将地图平移到一个指定的中心点。
   - flyTo：执行一个平滑的平移-缩放动画（先缩放在平移再缩放），移动缩放地图范围至指定的地理中心和级别。
- 平移到一个范围，比如网格之类的。
   - fitBounds：将地图的视图设置在给定的矩形地理范围内,地图会自动计算最大缩放级别和中心点。
   - flyToBounds：设置地图的视图，并且它具有像 flyTo 一样的平滑动画，但需要一个像 fitBounds 一样的边界参数。
- 平移像素
   - panBy：将地图平移一定数量的像素（动画）

使用示例：
```javascript

map.panTo([30.540655, 104.078794], {
  // 注意：如果经纬度距离太远，动画时间太长，有可能会出现时间上的一片灰色屏幕
  animate: true,
  duration: 2, // 动画执行时间，也就是animate：true,才会触发
});

/**
 * @param latlng // 平移点
 * @param zoom // 平移之后的地图缩放程度。
 * @param options // 平移配置项 动画时间等
 */
map.flyTo([30.540655, 104.078794], 18, {
  duration: 2,
});


let latlngs = [
  [39.94057, 116.396888],
  [39.939827, 116.396242],
  [39.933447, 116.396322],
  [39.9332, 116.408682],
  [39.94057, 116.40852],
];

map.fitBounds(latlngs, {
  animate: true,
  duration: 2,
});

map.flyToBounds(latlngs, {
  animate: true,
  duration: 2,
});

```
### 限制地图的拖动范围
maxBounds: 当这个选项被设置后，地图将被限制在指定的地理边界内， 当用户平移将地图拖动到视图以外的范围时会出现弹回的效果， 并且也不允许缩小视图到指定范围以外的区域（这取决于地图的尺寸）. 要动态设置此限制，请使用 `setMaxBounds`方法。
`latLngBounds`: 定义矩形的俩个斜角
```javascript

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
var corner1 =  L.latLng(-90, -180); //设置左上角经纬度
var corner2 = L.latLng(90, 180);	//设置右下点经纬度
var bounds = L.latLngBounds(corner1, corner2); //构建视图限制范,定义矩形的俩个

const map = L.map("map", {
  ...options,
  maxBounds: bounds
});



// 定义边界坐标
var chinaBounds = L.latLngBounds(
  L.latLng(18.0, 73.0), 
  L.latLng(53.6, 135.0) 
);

// 设置地图的最大边界为中国边界
map.setMaxBounds(chinaBounds);

```

### 在地图可视范围生成随机点位
```javascript
// 传入当前地图实例
function getRandomLatLng(map) {
  var bounds = map.getBounds(),
    southWest = bounds.getSouthWest(),
    northEast = bounds.getNorthEast(),
    lngSpan = northEast.lng - southWest.lng,
    latSpan = northEast.lat - southWest.lat;

  return new L.LatLng(
    southWest.lat + latSpan * Math.random(),
    southWest.lng + lngSpan * Math.random());
}
```
## 热力图
热力图插件：[Leaflet.heat](https://github.com/Leaflet/Leaflet.heat/tree/gh-pages)
使用实例：
下载地址：[leaflet.heat.js(github)](https://github.com/Leaflet/Leaflet.heat/blob/gh-pages/dist/leaflet-heat.js) [leaflet.heat.js(cdn)](https://cdn.bootcdn.net/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js) 
```javascript
// 引入插件
// 本地文件
<script src="leaflet-heat.js"></script>
// cdn在线地址
<script src="https://cdn.bootcdn.net/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js"></script>





var latLngs = [];

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
    latLngs.push(getRandomLatLng(map));
  }
  return false;
}

populate();

const heat = L.heatLayer(latLngs, {
  radius: 25,
}).addTo(map);

```
**L.heatLayer(latlngs,options):**
**options：**

- **minOpacity** 
   - the minimum opacity the heat will start at 
   - 加热开始时的最小不透明度
- **maxZoom** 
   - zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
   - 点达到最大强度的缩放级别（强度随缩放而缩放），默认情况下等于贴图的最大缩放
- **max** 
   - maximum point intensity, 1.0 by default
   - 最大点强度，默认为1.0
- **radius** 
   - radius of each "point" of the heatmap, 25 by default
   - 热图中每个“点”的半径，默认为25
- **blur** 
   - amount of blur, 15 by default
   - 模糊量，默认为15
- **gradient** 
   - color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
   - 颜色渐变配置，例如｛0.4:“蓝色”，0.65:“石灰”，1:“红色”｝
- **pane** 
   - Map pane where the heat will be drawn. Defaults to 'overlayPane'.
   - 绘制热量的地图窗格。默认为“overlayPane”
- **latlngs**
   - Each point in the input array can be either an array like [50.5, 30.5, 0.5], or a [Leaflet LatLng object](http://leafletjs.com/reference.html#latlng).
   - Optional third argument in each LatLng point (altitude) represents point intensity. Unless max option is specified, intensity should range between 0.0 and 1.0.
   - 输入数组中的每个点可以是类似[50.5、30.5、0.5]的数组，也可以是Leaflet LatLng对象。 每个LatLng点（海拔）中的可选第三个参数表示点强度。除非指定了“最大”选项，否则强度应介于0.0和1.0之间。

**methods：**

- **setOptions(options)**
   - Sets new heatmap options and redraws it.
   - 设置新的热图选项并重新绘制
- **addLatLng(latlng)**
   - Adds a new point to the heatmap and redraws it.
   - 在热图中添加新点并重新绘制
- **setLatLngs(latlngs)**
   - Resets heatmap data and redraws it.
   - 在热图中添加新点并重新绘制
- **redraw()**
   - Redraws the heatmap.
   - 重新绘制热图。


## 点位聚合-markercluster
### 示例
```javascript
var markers = new L.MarkerClusterGroup();
var markersList = [];

function getRandomLatLng(map) {
  var bounds = map.getBounds(),
    southWest = bounds.getSouthWest(),
    northEast = bounds.getNorthEast(),
    lngSpan = northEast.lng - southWest.lng,
    latSpan = northEast.lat - southWest.lat;

  return new L.LatLng(
    southWest.lat + latSpan * Math.random(),
    southWest.lng + lngSpan * Math.random());
}

function populate() {
  for (var i = 0; i < 100; i++) {
    var m = new L.Marker(getRandomLatLng(map), { draggable: false });
    markersList.push(m);
    markers.addLayer(m);
  }
  return false;
}

populate()

map.addLayer(markers)
```
### Options
[https://github.com/Leaflet/Leaflet.markercluster#defaults](https://github.com/Leaflet/Leaflet.markercluster#defaults)
**默认启用（布尔选项）：**

- **showCoverageOnHover**
   - When you mouse over a cluster it shows the bounds of its markers.
   - 当您将鼠标悬停在群集上时，它会显示其标记的边界。
- **zoomToBoundsOnClick**
   - When you click a cluster we zoom to its bounds.
   - 当您单击一个集群时，我们会缩放到其边界。
- **spiderfyOnMaxZoom**
   - When you click a cluster at the bottom zoom level we spiderfy it so you can see all of its markers. (_Note: the spiderfy occurs at the current zoom level if all items within the cluster are still clustered at the maximum zoom level or at zoom specified by disableClusteringAtZoom option_)
   - 当您单击底部缩放级别的集群时，我们会对其进行蜘蛛化，以便您可以看到其所有标记。 （注意：如果集群内的所有项目仍以最大缩放级别或通过disableClusteringAtZoom选项指定的缩放进行聚类，则spiderfy会在当前缩放级别发生）
- **removeOutsideVisibleBounds**
   - Clusters and markers too far from the viewport are removed from the map for performance.
   - 为了提高性能，将从地图中删除距离视口太远的簇和标记。
- **animate**
   - Smoothly split / merge cluster children when zooming and spiderfying. If L.DomUtil.TRANSITION is false, this option has no effect (no animation is possible).
   - 缩放和蜘蛛化时平滑地拆分/合并集群子级。如果 L.DomUtil.TRANSITION 为 false，则此选项无效（不可能有动画）

**其他配置选项：**

- **animateAddingMarkers**
   - If set to true (and animate option is also true) then adding individual markers to the MarkerClusterGroup after it has been added to the map will add the marker and animate it into the cluster. Defaults to false as this gives better performance when bulk adding markers. addLayers does not support this, only addLayer with individual Markers.
   - 如果设置为 true（且动画选项也为 true），则在将单个标记添加到地图后将其添加到 MarkerClusterGroup 将添加标记并将其动画化到群集中。默认为 false，因为这可以在批量添加标记时提供更好的性能。 addLayers 不支持此功能，仅支持带有单独标记的 addLayer。
- **disableClusteringAtZoom**
   - If set, at this zoom level and below, markers will not be clustered. This defaults to disabled. [See Example](https://leaflet.github.io/Leaflet.markercluster/example/marker-clustering-realworld-maxzoom.388.html). Note: you may be interested in disabling spiderfyOnMaxZoom option when using disableClusteringAtZoom.
   - 设置后，在此缩放级别及以下，标记将不会聚集。这默认为禁用。参见示例。注意：您可能有兴趣在使用时禁用 SpiderfyOnMaxZoom 选项
- **maxClusterRadius**
   - The maximum radius that a cluster will cover from the central marker (in pixels). Default 80. Decreasing will make more, smaller clusters. You can also use a function that accepts the current map zoom and returns the maximum cluster radius in pixels.
   - 簇从中心标记覆盖的最大半径（以像素为单位）。默认值 80。减少会产生更多、更小的簇。您还可以使用接受当前地图缩放并返回最大簇半径（以像素为单位）的函数。
- **polygonOptions**
   - Options to pass when creating the L.Polygon(points, options) to show the bounds of a cluster. Defaults to empty, which lets Leaflet use the [default Path options](http://leafletjs.com/reference.html#path-options).
   - 创建 L.Polygon(points, options) 时传递的选项以显示簇的边界。默认为空，这让 Leaflet 使用默认的路径选项。
- **singleMarkerMode**
   - If set to true, overrides the icon for all added markers to make them appear as a 1 size cluster. Note: the markers are not replaced by cluster objects, only their icon is replaced. Hence they still react to normal events, and option disableClusteringAtZoom does not restore their previous icon (see [#391](https://github.com/Leaflet/Leaflet.markercluster/issues/391)).
   - 如果设置为 true，则覆盖所有添加的标记的图标，使它们显示为 1 大小的簇。注意：标记不会被簇对象替换，仅替换其图标。因此，它们仍然对正常事件做出反应，并且选项disableClusteringAtZoom不会恢复它们以前的图标（参见＃391）。 SpiderLegPolylineOptions：允许您指定 PolylineOptions 来设计蜘蛛腿的样式。默认情况下，它们是 {weight: 1.5, color: '#222', opacity: 0.5 }。
- **spiderLegPolylineOptions**
   - Allows you to specify [PolylineOptions](http://leafletjs.com/reference.html#polyline-options) to style spider legs. By default, they are { weight: 1.5, color: '#222', opacity: 0.5 }.
   - 允许您指定 PolylineOptions 来设计蜘蛛腿的样式。默认情况下，它们是 {weight: 1.5, color: '#222', opacity: 0.5 }
```javascript
var markers = L.markerClusterGroup({
	spiderfyOnMaxZoom: false,
	showCoverageOnHover: false,
	zoomToBoundsOnClick: false
});
```

- **spiderfyDistanceMultiplier**
   - Increase from 1 to increase the distance away from the center that spiderfied markers are placed. Use if you are using big marker icons (Default: 1).
   - 从 1 开始增加，以增加距离蜘蛛网标记放置的中心的距离。如果您使用大标记图标，则使用（默认值：1）。
- **iconCreateFunction**
   - Function used to create the cluster icon. See [the default implementation](https://github.com/Leaflet/Leaflet.markercluster/blob/15ed12654acdc54a4521789c498e4603fe4bf781/src/MarkerClusterGroup.js#L542) or the [custom example](https://leaflet.github.io/Leaflet.markercluster/example/marker-clustering-custom.html).
   - 用于创建簇图标的函数
- **spiderfyShapePositions**: Function used to override spiderfy default shape positions.
- **clusterPane**: Map pane where the cluster icons will be added. Defaults to L.Marker's default (currently 'markerPane'). [See the pane example](https://leaflet.github.io/Leaflet.markercluster/example/marker-clustering-pane.html).
### 自定义聚类标记
官网源码：
```javascript
	_defaultIconCreateFunction: function (cluster) {
    var childCount = cluster.getChildCount();

    var c = ' marker-cluster-';
    if (childCount < 10) {
      c += 'small';
    } else if (childCount < 100) {
      c += 'medium';
    } else {
      c += 'large';
    }

    return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
  },
```
### 事件
Leaflet事件如点击、鼠标悬停等只与集群中的Markers相关。要接收集群事件，请侦听“cluster”+“<eventName>”，例如：clusterclick、clustermouseover、clustermouseout。 按如下方式设置回调来处理这两种情况：
```javascript
markers.on('click', function (a) {
	console.log('marker ' + a.layer);
});

markers.on('clusterclick', function (a) {
	// a.layer is actually a cluster
	console.log('cluster ' + a.layer.getAllChildMarkers().length);
});
```
