import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NewAreaSavePopup = ({ opened, handleSaveArea, handleClose }) => {
  const [areaName, setAreaName] = useState("");

  const { t } = useTranslation();

  const handleSaveAreaName = () => {
    if (areaName.trim() === "") {
      alert("Please enter a name!");
      return;
    }
    handleSaveArea(areaName);
    setAreaName("");
  };

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
          onChange={(e) => setAreaName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="darkGreen">
          {t("selectView.saveNewAreaPopup.cancelBtnLabel")}
        </Button>
        <Button onClick={handleSaveAreaName} color="darkGreen">
          {t("selectView.saveNewAreaPopup.saveBtnLabel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAreaSavePopup;

NewAreaSavePopup.propTypes = {
  opened: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};
