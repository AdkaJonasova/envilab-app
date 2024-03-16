class LayerTypes:
    Vector = "Vector"
    Tile = "Tile"
    Image = "Image"


class Layer:
    def __init__(self, layer_id, name, source=None, description=None, type=None, extent=None):
        self.layer_id = layer_id
        self.name = name
        self.source = source
        self.description = description
        self.type = type
        self.extent = extent


point_layer = Layer(
    layer_id=0,
    name="Point layer",
    source="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
    description="This layer is showing where the eartquake has been this year so far.",
    type=LayerTypes.Vector
)

usa_states_layer = Layer(
    layer_id=1,
    name="USA states layer",
    source="https://ahocevar.com/geoserver/wms",
    description="This layer shows states of the USA with their borders",
    type=LayerTypes.Tile
)

vegetation_layer = Layer(
    layer_id=2,
    name="Vegetation layer",
    source="https://openlayers.org/data/vector/ecoregions.json",
    description="This layer shows different kinds of vegetation types on the earth",
    type=LayerTypes.Vector
)

test_layer1 = Layer(
    layer_id=3,
    name="Test layer 1"
)

test_layer2 = Layer(
    layer_id=4,
    name="Test layer 2"
)

test_layer3 = Layer(
    layer_id=5,
    name="Test layer 3"
)

test_layer4 = Layer(
    layer_id=6,
    name="Test layer 4"
)

test_layer5 = Layer(
    layer_id=7,
    name="Test layer 5"
)

test_layer6 = Layer(
    layer_id=8,
    name="Test layer 6"
)

test_layer7 = Layer(
    layer_id=9,
    name="Test layer 7"
)

test_layer8 = Layer(
    layer_id=10,
    name="Test layer 8"
)

static_image_layer1 = Layer(
    layer_id=11,
    name="Cartoon image layer",
    source="https://imgs.xkcd.com/comics/online_communities.png",
    extent=[0, 0, 1024, 968],
    type=LayerTypes.Image
)

static_image_layer2 = Layer(
    layer_id=12,
    name="Image projection layer",
    source="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/British_National_Grid.svg/2000px-British_National_Grid.svg.png",
    extent=[0, 0, 700000, 1300000],
    type=LayerTypes.Image
)

mock_layers = [
    point_layer,
    usa_states_layer,
    vegetation_layer,
    test_layer1,
    test_layer2,
    test_layer3,
    test_layer4,
    test_layer5,
    test_layer6,
    test_layer7,
    test_layer8,
    static_image_layer1,
    static_image_layer2
]
