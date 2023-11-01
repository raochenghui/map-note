function Track(map, data, option) {
  const defaultOption = {};
  this.option = defaultOption;
  Object.assign(this.option, option);
  this.data = data;
  this.map = map;
}
