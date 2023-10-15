export function removeLayersWithName(map, name) {
  map
    .getLayers()
    .getArray()
    .filter((layer) => layer.get("name") === name)
    .forEach((layer) => map.removeLayer(layer));
}

export function filterDataByName(data, filter) {
  if (!filter) {
    return data;
  }
  return data.filter((val) =>
    val.name.toLowerCase().includes(filter.toLowerCase())
  );
}
