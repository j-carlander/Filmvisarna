/**
 * Component for making a new input field
 */

export default function AdminInput({
  name,
  type,
  spanText,
  value,
  handleChange,
}) {
  return (
    <label>
      <span>{spanText}:</span>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}
