interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { progress } = props;

  return (
    <div className="h-1 fixed top-0 left-0 w-full">
      <div
        className="bg-gradient-to-r from-amber-500 to-pink-500 h-full"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
};
