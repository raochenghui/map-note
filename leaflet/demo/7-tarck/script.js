const option = {
  center: [35.943766, 120.184303],
  // minZoom: 4,
  // maxZoom: 18,
  attributionControl: false,
  zoomControl: false,
  scrollWheelZoom: true,
  url: "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
};

let map = "";

map = L.map("map", option);
map.setView(option.center, 20);
L.tileLayer(option.url, { subdomains: "1234" }).addTo(map);

const track = {
  trackData: [],
  realTimeData: [],

  routePath: "",
  arrowPath: "",
  realTimePath: "",

  animatedMarker: "",
  pathMarkers: "",
  i: 0,
  speed: 1,
};

const carIcon = L.icon({
  iconSize: [36, 26],
  iconAnchor: [18, 13],
  iconUrl: "./car.png",
  zIndexOffset: 1,
});

const addPath = (data) => {
  const routeLine = L.polyline(data, {
    weight: 6,
    color: "#FF9900",
  }).addTo(map);

  if (data.length) {
    if (data.length > 1) {
      map.fitBounds(data);
    } else {
      map.setView(data[0], 17);
    }
  }

  track.realTimePath.addTo(map);

  // 轨迹方向箭头
  const decorator = L.polylineDecorator(routeLine, {
    patterns: [
      {
        repeat: 50,
        symbol: L.Symbol.arrowHead({
          pixelSize: 5,
          headAngle: 75,
          polygon: false,
          pathOptions: {
            stroke: true,
            weight: 2,
            color: "#FFFFFF",
          },
        }),
      },
    ],
  }).addTo(map);

  track.routePath = routeLine;
  track.arrowPath = decorator;

  addMoveMarker(routeLine.getLatLngs());
};

const addMoveMarker = (path) => {
  track.animatedMarker = L.animatedMarker(path, {
    interval: 500, // 默认为100mm
    icon: carIcon,
    zIndexOffset: 2,
    playCall: updateRealLine,
  }).addTo(map);

  function updateRealLine(latlng) {
    track.realTimeData.push(latlng);
    track.i = latlng.i;
    track.realTimePath.setLatLngs(track.realTimeData);
    if (latlng.isStop) {
      track.realTimeData = [];
    }
  }
};

track.realTimePath = L.polyline([], {
  weight: 6,
  color: "#28b7d9",
});

function addMarkers(marker, length) {
  const { index, lat, lng } = marker;
  let className = "marker-path-normal";

  if (index == 0) {
    className += " marker-path-start";
  } else if (index == length - 1) {
    className += " marker-path-end";
  }

  let icon = L.divIcon({
    className: className,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    // html: `<div class='marker-num'><span>${index + 1}</span></div>`,
  });
  let _marker = L.marker([lat, lng], { icon: icon, zIndexOffset: 1 });
  _marker.addTo(map);
}

function init() {
  const data = [
    [35.935862, 120.173434],
    [35.947441, 120.198576],
    [35.962795, 120.192174],
    [35.95116, 120.180914],
    // [35.947941, 120.183618],
    // [35.938409, 120.171488],
  ];

  const latlngs = data.map((item, index) => ({
    lat: item[0],
    lng: item[1],
    index: index,
  }));

  track.trackData = data;

  latlngs.forEach((item) => {
    addMarkers(item, latlngs.length);
  });

  setTimeout(() => {
    addPath(data);
  }, 1000);
}

init();

const start = () => {
  // if(track.animatedMarker.)
  track.animatedMarker.start();
};

const pause = () => {
  track.animatedMarker.pause();
};

const end = () => {
  track.realTimeData = [];
  track.animatedMarker.stop();
};

const speed = () => {
  track.speed = 4;
  track.animatedMarker.setSpeetX(track.speed);
};

const setI = (type) => {
  let i = track.i;
  if (type == "next") {
    i++;
    i > track.trackData.length - 1 ? (i = track.trackData.length - 1) : i;
  } else {
    i--;
    i < 0 ? (i = 0) : i;
  }
  let newTrackData = track.trackData.slice(0, i + 1);
  track.realTimeData = newTrackData;
  track.realTimePath.setLatLngs(newTrackData);
  track.i = i;
  track.animatedMarker.setI(i);
};

const startButton = document.getElementById("start");
startButton.addEventListener("click", start);

const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", pause);

const endButton = document.getElementById("end");
endButton.addEventListener("click", () => {
  end();
});

const preButton = document.getElementById("pre");
preButton.addEventListener("click", () => {
  setI("pre");
});

const nextButton = document.getElementById("next");
nextButton.addEventListener("click", () => {
  setI("next");
});

const speedButton = document.getElementById("speed");
speedButton.addEventListener("click", () => {
  speed();
});
