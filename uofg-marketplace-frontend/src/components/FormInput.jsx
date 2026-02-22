function FormInput({ label, type, name, value, onChange, required }) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uofg-blue"
      />
    </div>
  )
}

export default FormInput
