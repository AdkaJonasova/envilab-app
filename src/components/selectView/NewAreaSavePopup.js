import { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const NewAreaSavePopup = ({ opened, handleSaveArea, handleClose }) => {
  const [areaName, setAreaName] = useState("");
  const [error, setError] = useState(false);

  const { t } = useTranslation();

  //#region Methods

  const handleAreaNameChange = (event) => {
    setAreaName(event.target.value);
    setError(false);
  };

  const handleSaveAreaName = () => {
    if (areaName.trim() === "") {
      setError(true);
    } else {
      handleSaveArea(areaName);
      setAreaName("");
    }
  };

  //#endregion

  return (
    <Dialog open={opened} style={{ display: opened ? "block" : "none" }}>
      <DialogTitle>{t("selectView.saveNewAreaPopup.title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("selectView.saveNewAreaPopup.content")}
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label={t("selectView.saveNewAreaPopup.fieldLabel")}
          fullWidth
          variant="standard"
          onChange={(e) => handleAreaNameChange(e)}
          error={error}
          helperText={
            error ? t("selectView.saveNewAreaPopup.requiredFieldMsg") : ""
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="errorRed">
          {t("selectView.saveNewAreaPopup.cancelBtnLabel")}
        </Button>
        <Button onClick={() => handleSaveAreaName()} color="darkGreen">
          {t("selectView.saveNewAreaPopup.saveBtnLabel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAreaSavePopup;

NewAreaSavePopup.propTypes = {
  opened: PropTypes.bool,
  handleSaveArea: PropTypes.func,
  handleClose: PropTypes.func,
};
