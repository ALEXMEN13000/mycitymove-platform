import { Dumbbell, Music, Heart, Palette } from "lucide-react";

type CategoryIconProps = {
  category: "sport" | "musique" | "bien-être" | "art";
  size?: number;
};

export const CategoryIcon = ({ category, size = 40 }: CategoryIconProps) => {
  const iconProps = {
    size,
    className: "text-blue-900",
    strokeWidth: 1.5
  };

  switch (category) {
    case "sport":
      return <Dumbbell {...iconProps} />;
    case "musique":
      return <Music {...iconProps} />;
    case "bien-être":
      return <Heart {...iconProps} />;
    case "art":
      return <Palette {...iconProps} />;
    default:
      return null;
  }
}; 