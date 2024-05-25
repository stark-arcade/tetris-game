import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

export const background = {};

export const colors = {
  primary: {
    100: "#007AC7",
    200: "#0E2E5E",
    300: "#3BF1FE",
  },
  ...background,
};
const styles = {
  // eslint-disable-next-line no-unused-vars
  global: () => ({
    body: {
      bg: "#000",
      color: "#E4E8FF",
      boxSizing: "border-box",
    },
  }),
};
const Button: ComponentStyleConfig = {
  variants: {
    icon_btn: {
      cursor: "pointer",
      display: "flex",
      border: "none",
      width: "65px",
      height: "60px",
      alignItems: "center",
      justifyContent: "center",
      background: "url('/assets/btn/icon_btn.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "0.5s",
      _hover: {
        background: "url('/assets/btn/icon_btn_hover.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
    connect_wallet: {
      background: "url(/assets/btn/play_btn.svg)",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      color: "rgba(64, 233, 241, 1)",
      border: "none",
      fontWeight: 700,
      cursor: "pointer",
      transition: "0.3s",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.25rem",
      width: "100%",
      _hover: {
        background: "url(/assets/btn/play_btn_hover.svg)",
        backgroundPosition: "center",
        backgroundSize: "contain",
        objectFit: "contain",
        backgroundRepeat: "no-repeat",
      },
    },
  },
};
const theme = extendTheme({
  colors,
  styles,
  components: {
    Button,
  },
});

export default theme;
