import classNames from "classnames";
import React from "react";

import styles from "./text.module.css";

type MarginTrim = "top" | "bottom" | "top bottom";
type TextAlignment = "center" | "left" | "right" | "justify";
type TextType = "fine print";
type TextProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & { align?: TextAlignment; type?: TextType; trim?: MarginTrim };

const Text: React.FC<TextProps> = ({ align, className, type: textType, trim, ...props }) => {
  const classes = classNames(
    styles.comp,
    // margin trim
    {
      [styles["margin-top"]]: trim !== "top" && trim !== "top bottom",
      [styles["margin-bottom"]]: trim !== "bottom" && trim !== "top bottom",
    },
    {
      [styles["fine-print"]]: textType === "fine print",
    },
    {
      "text-center": align === "center",
      "text-left": align === "left",
      "text-right": align === "right",
      "text-justify": align === "justify",
    },
    className,
  );
  return <p {...props} className={classes} />;
};

export default Text;
