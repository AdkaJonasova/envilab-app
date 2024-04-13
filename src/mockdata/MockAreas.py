class Area:
    def __init__(self, area_id, name, source, source_id, is_editable, sub_areas):
        self.areaId = area_id
        self.name = name
        self.source = source
        self.sourceId = source_id
        self.isEditable = is_editable
        self.subAreas = sub_areas


jihomoravsky = Area(
    area_id=10,
    name="Jihomoravsky kraj",
    source="czechRepublicRegions.json",
    source_id=1,
    is_editable=False,
    sub_areas=[]
)

jihocesky = Area(
    area_id=11,
    name="Jihocesky kraj",
    source="czechRepublicRegions.json",
    source_id=0,
    is_editable=False,
    sub_areas=[]
)

czech_republic = Area(
    area_id=0,
    name="Czech republic",
    source="czechRepublic.json",
    source_id=0,
    is_editable=False,
    sub_areas=[jihomoravsky, jihocesky]
)

slovakia = Area(
    area_id=1,
    name="Slovakia",
    source="slovakia.json",
    source_id=0,
    is_editable=False,
    sub_areas=[]
)

new_york = Area(
    area_id=20,
    name="New York",
    source="usaStates.json",
    source_id=32,
    is_editable=False,
    sub_areas=[]
)

south_dakota = Area(
    area_id=21,
    name="South Dakota",
    source="usaStates.json",
    source_id=41,
    is_editable=False,
    sub_areas=[]
)

usa = Area(
    area_id=2,
    name="United States",
    source="usa.json",
    source_id=0,
    is_editable=False,
    sub_areas=[new_york]
)

mock_areas = [czech_republic, slovakia, usa]
