import { toPng as htmlToPng } from "html-to-image";
import { Button } from "./ui/button";
import { currentDate } from "@/lib/utils";
import { Download } from "lucide-react";

interface ExportImageProps {
  elementId: string;
}

export default function ExportImage({ elementId }: ExportImageProps) {
  const exportToImage = async () => {
    const element = document.getElementById(elementId);
    const now = currentDate();
    const title = `calendario-cortes-${now}.png`;

    if (element) {
      const { width, height } = element.getBoundingClientRect();
      const imageUrl = await htmlToPng(element, {
        pixelRatio: 1,
        quality: 1,
        width: Math.floor(width),
        height: Math.floor(height),
      });

      setTimeout(() => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = title;
        link.click();
      }, 100);
    }
  };

  return (
    <Button variant={"outline"} onClick={exportToImage} className="">
      <Download /> Exportar calendario como imagen
    </Button>
  );
}
