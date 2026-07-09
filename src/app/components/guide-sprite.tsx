import { useEffect, useState } from "react";
import { GUIDES } from "../flow";
import angelImg from "../../imports/Angel.png";
import barbarianImg from "../../imports/Barbarian.png";
import treeImg from "../../imports/Elder_Tree.png";
import ghostImg from "../../imports/Ghost.png";
import golemImg from "../../imports/Golem.png";
import griffinImg from "../../imports/Griffin.png";
import knightImg from "../../imports/Knight.png";
import qilinImg from "../../imports/Qilin.png";
import werewolfImg from "../../imports/Werewolf.png";
import wizardImg from "../../imports/Wizard.png";

export const GUIDE_SPRITES: Record<string, string> = {
  angel: "/assets/sprites/angel.png",
  barbarian: "/assets/sprites/barbarian.png",
  tree: "/assets/sprites/tree.png",
  ghost: "/assets/sprites/ghost.png",
  golem: "/assets/sprites/golem.png",
  griffin: "/assets/sprites/griffin.png",
  knight: knightImg,
  qilin: qilinImg,
  werewolf: "/assets/sprites/werewolf.png",
  vampire: "/assets/sprites/vampire.png",
};

const SINGLE_IMAGES = ["angel", "barbarian", "golem", "werewolf", "vampire", "tree", "ghost", "griffin"];

export function GuideSprite({
  guideId,
  size = 96,
  withShadow = true,
  animate = true,
  className = "",
}: {
  guideId: string;
  size?: number;
  withShadow?: boolean;
  animate?: boolean;
  className?: string;
}) {
  const src = GUIDE_SPRITES[guideId];
  const guide = GUIDES.find((g) => g.id === guideId);
  const isSingle = SINGLE_IMAGES.includes(guideId);
  
  // Convert to Base64 to prevent Safari canvas tainting in html-to-image
  const [base64Src, setBase64Src] = useState<string>("");

  useEffect(() => {
    if (!src) return;
    fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => setBase64Src(reader.result as string);
        reader.readAsDataURL(blob);
      })
      .catch((err) => console.error("Failed to convert GuideSprite to base64", err));
  }, [src]);

  if (!src) return null;

  const dur = 1.6;

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-end ${className}`}
      style={{
        width: size,
        height: size,
        overflow: "hidden" // <--- Memotong area luar lingkaran agar frame kanan hilang
      }}
    >
      <img
        className="m-[0px] rounded-[0px]"
        src={base64Src || src}
        alt={guide?.name ?? guideId}
        draggable={false}
        style={{
          width: isSingle ? size : size * 2,
          height: size,
          imageRendering: "pixelated",
          objectFit: isSingle ? "contain" : "cover",
          objectPosition: isSingle ? "center" : "0% center",
          transformOrigin: "bottom center",
          animation: animate ? `pixel-idle-${guideId} ${dur}s ease-in-out infinite` : undefined,
        }}
      />
      {withShadow && (
        <div
          style={{
            position: "absolute",
            bottom: -2,
            left: "50%",
            width: size * 0.55,
            height: size * 0.08,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.22)",
            filter: "blur(4px)",
            transformOrigin: "center",
            animation: animate ? `pixel-idle-shadow-${guideId} ${dur}s ease-in-out infinite` : undefined,
            transform: "translateX(-50%)",
          }}
        />
      )}
      <style>{`
        @keyframes pixel-idle-${guideId} {
          0%, 100% { 
            transform: scale(1, 1) translateY(0); 
          }
          50% { 
            transform: scale(1.02, 0.97) translateY(1%); 
          }
        }
        @keyframes pixel-idle-shadow-${guideId} {
          0%, 100% { transform: translateX(-50%) scaleX(1); opacity: 0.35; }
          50% { transform: translateX(-50%) scaleX(1.05); opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}