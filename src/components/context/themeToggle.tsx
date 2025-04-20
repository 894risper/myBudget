"use client";
import { useTheme } from "./themeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggleButton() {
  const { toggleTheme, colors } = useTheme();
  const isLight = colors.primary === "#007bff";

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: colors.primary,
        color: "#fff",
        padding: "10px 16px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "16px",
      }}
    >
      {isLight ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
      {isLight ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
