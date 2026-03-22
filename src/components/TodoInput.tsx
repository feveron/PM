type Props = {
  onAdd: (text: string) => void
  placeholder?: string
  setValue: (value: string) => void
  value: string
  label: string
}

export default function TodoInput({ onAdd, placeholder, setValue, value, label }: Props) {

  const handleAdd = () => {
    if (!value.trim()) return
    onAdd(value)
    setValue("")
  }

  return (
    <div>
      <div>{label}</div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}