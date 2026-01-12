import img202601122059551 from "figma:asset/c35b4985a04d0c772f8fe5914c7570e0e7ac90f1.png";
import img202601122100031 from "figma:asset/f0b3eb2b4458846bec56be8635bb677de4cdf411.png";

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[20px] items-end relative size-full">
      <div className="h-[260px] relative shrink-0 w-[369px]" data-name="Знімок екрана 2026-01-12 о 20.59.55 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img202601122059551} />
      </div>
      <div className="h-[253px] relative shrink-0 w-[381px]" data-name="Знімок екрана 2026-01-12 о 21.00.03 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img202601122100031} />
      </div>
    </div>
  );
}