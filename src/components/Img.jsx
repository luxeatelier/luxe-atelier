import Image from "next/image";

// next/image with sensible defaults; CSS controls the displayed size.
export default function Img({ src, alt = "", sizes = "(max-width: 900px) 100vw, 50vw", priority, ...rest }) {
  return <Image src={src} alt={alt} sizes={sizes} priority={priority} fetchPriority={priority ? "high" : "low"} quality={72} {...rest} />;
}
