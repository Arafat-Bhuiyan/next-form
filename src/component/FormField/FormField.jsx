export const FormField = ({ type, label, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      {type === "file" ? (
        <input
          type="file"
          id={name}
          name={name}
          onChange={onChange}
          className="block w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  );
};
