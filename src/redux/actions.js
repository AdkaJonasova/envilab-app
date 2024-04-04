export const LAYER_SECTION_COLLAPSE = "LAYER_SECTION_COLLAPSE";

export const collapseLayerSection = (sectionId) => ({
  type: LAYER_SECTION_COLLAPSE,
  id: sectionId,
});
