import useInput from "../lib/useInput";

export default ({ value, onChange, title, placeholder, type, required }) => {
  return (
    <div className="container">
      <label htmlFor={title}>{title}</label>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        required={required}
        onChange={onChange}
      />
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            justify-content: center;
            margin: 0.5rem 0;
          }
          .container label {
            font-size: 1.1rem;
            font-weight: bold;
            color: var(--font-color);
          }
          .container input {
            width: 100%;
            border: none;
            margin: 0.5rem 0;
            border-bottom: 1px solid var(--primary);
            height: 1.9rem;
            padding: 0.4rem 0.2rem;
            font-size: 0.8rem;
          }
          .container input:active,
          .container input:hover {
            border-bottom: 1px solid var(--primary);
          }
        `}
      </style>
    </div>
  );
};
