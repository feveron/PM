type Props = {
  placeholder?: string
  setValue: (value: string) => void
  value: string
  label: string
}

export default function TodoInput({ placeholder, setValue, value, label }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold text-transparent [-webkit-text-stroke:1px_black]">{label}:</h2>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="border-2 border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}