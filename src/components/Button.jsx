const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-gray-800 hover:bg-gray-100',
}

const sizes = {
  sm: 'px-[12px] py-[6px] text-[13px]',
  md: 'px-[16px] py-[8px] text-[14px]',
  lg: 'px-[20px] py-[10px] text-[16px]',
}

export default function Button({
  label = 'Button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
}) {
  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded-[6px] font-medium transition-colors cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
