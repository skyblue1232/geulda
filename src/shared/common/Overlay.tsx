interface OverlayProps {
  onClick?: () => void;
  opacity?: number;
  className?: string;
}

const Overlay = ({ onClick, opacity = 40, className }: OverlayProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        fixed inset-0 z-[40]
        transition-opacity duration-300
        ${className ?? ''}
      `}
      style={{
        backgroundColor: `rgba(0,0,0,${opacity / 100})`,
      }}
    />
  );
};
export default Overlay;
