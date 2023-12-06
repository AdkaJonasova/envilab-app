import { Grid } from "@mui/material";
import SideMenu from "../components/SideMenu";
import { settingsPageMapping } from "../utils/data";

const SettingsPage = ({ tab }) => {
  function getPageByTab() {
    return settingsPageMapping.get(tab);
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          <SideMenu />
        </Grid>
        <Grid item xs={10} paddingLeft={3}>
          {getPageByTab()}
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsPage;
