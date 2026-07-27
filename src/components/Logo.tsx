type LogoProps = {
  size?: number;
  className?: string;
  title?: string;
};

export function Logo({
  size = 40,
  className,
  title = "Disney · NYC",
}: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt={title}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
      decoding="async"
    />
  );
}
