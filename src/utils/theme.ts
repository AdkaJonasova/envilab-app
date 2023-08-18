import { createTheme } from "@mui/material";
import { ColorValueHex } from "./types";

export const DarkGreen : ColorValueHex = '#59745D';
export const LightGreen: ColorValueHex = '#8B958A';
export const Beige: ColorValueHex = '#FEEDE0';
export const Brown: ColorValueHex = '#E1BDA5';

export const theme = () => {
	return createTheme({
		palette: {
			primary: {
                main: LightGreen,
                dark: DarkGreen,
            },
            secondary: {
                main: Beige,
                dark: Brown,
            }
		}
	});
};

