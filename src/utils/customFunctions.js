
export function removeLayersWithName(map, name) {
    map.getLayers().getArray()
        .filter(layer => layer.get('name') === name)
        .forEach(layer => map.removeLayer(layer));
}