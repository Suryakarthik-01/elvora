import React from "react";
import { Text, TextProps } from "react-native";

interface TypographyProps extends TextProps {
  children: React.ReactNode;
}

const BaseText = ({
  children,
  className,
  style,
  ...props
}: TypographyProps) => {
  return (
    <Text className={className} style={style} {...props}>
      {children}
    </Text>
  );
};

const Title = ({ className = "", style, ...props }: TypographyProps) => (
  <BaseText
    className={`text-[28px] ${className}`}
    style={[
      {
        fontFamily: "InriaSerif-Bold",
      },
      style,
    ]}
    {...props}
  />
);

const Subtitle = ({ className = "", style, ...props }: TypographyProps) => (
  <BaseText
    className={`text-[14px] ${className}`}
    style={[
      {
        fontFamily: "DMSans-Regular",
      },
      style,
    ]}
    {...props}
  />
);

const Label = ({ className = "", style, ...props }: TypographyProps) => (
  <BaseText
    className={`text-[14px] ${className}`}
    style={[
      {
        fontFamily: "DMSans-Medium",
      },
      style,
    ]}
    {...props}
  />
);

const Body = ({ className = "", style, ...props }: TypographyProps) => (
  <BaseText
    className={`text-[15px] ${className}`}
    style={[
      {
        fontFamily: "DMSans-Regular",
      },
      style,
    ]}
    {...props}
  />
);

const ButtonText = ({ className = "", style, ...props }: TypographyProps) => (
  <BaseText
    className={`text-[16px] ${className}`}
    style={[
      {
        fontFamily: "DMSans-SemiBold",
      },
      style,
    ]}
    {...props}
  />
);

const Caption = ({ className = "", style, ...props }: TypographyProps) => (
  <BaseText
    className={`text-[12px] ${className}`}
    style={[
      {
        fontFamily: "DMSans-Regular",
      },
      style,
    ]}
    {...props}
  />
);

export const Typography = {
  Title,
  Subtitle,
  Label,
  Body,
  ButtonText,
  Caption,
};
