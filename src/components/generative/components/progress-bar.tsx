interface ProgressBarProps {
  progress: number
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { progress } = props

  return (
    <div className="fixed top-0 left-0 h-1 w-full">
      <div
        className="h-full bg-gradient-to-r from-amber-500 to-pink-500"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  )
}
