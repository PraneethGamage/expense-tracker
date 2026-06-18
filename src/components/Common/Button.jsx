export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  ...props 
}) {
  const baseClasses = 'font-semibold rounded transition duration-200 inline-flex items-center justify-center'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400',
    success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}