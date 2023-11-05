function Label({
  label,
  name,
  required,
  color,
}: {
  label: string
  name: string
  required?: boolean
  color?: string
}): JSX.Element {
  color = color ? color : "white"

  return (
    <label
      htmlFor={name}
      className={`text-${color} mb-2 mt-5 block text-sm font-medium`}
    >
      {label} {required && "*"}
    </label>
  )
}

export default Label
