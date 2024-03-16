class Area:
    def __init__(self, area_id, name, source, source_id, is_editable, sub_areas):
        self.areaId = area_id
        self.name = name
        self.source = source
        self.sourceId = source_id
        self.isEditable = is_editable
        self.subAreas = sub_areas


sub_area1 = Area(
    area_id=10,
    name="Jihomoravsky kraj",
    source="czechRepublicRegions.json",
    source_id=1,
    is_editable=False,
    sub_areas=[]
)

sub_area2 = Area(
    area_id=11,
    name="Jihocesky kraj",
    source="czechRepublicRegions.json",
    source_id=0,
    is_editable=False,
    sub_areas=[]
)

area1 = Area(
    area_id=0,
    name="Czech republic",
    source="czechRepublic.json",
    source_id=0,
    is_editable=False,
    sub_areas=[sub_area1, sub_area2]
)

area2 = Area(
    area_id=1,
    name="Slovakia",
    source="slovakia.json",
    source_id=0,
    is_editable=False,
    sub_areas=[]
)

custom_area1 = Area(
    area_id=2,
    name="Custom area 1",
    source="",
    source_id=0,
    is_editable=True,
    sub_areas=[]
)

mock_areas = [area1, area2, custom_area1]
