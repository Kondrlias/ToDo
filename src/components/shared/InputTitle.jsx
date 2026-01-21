import { memo } from 'react';

function InputTitle({ handleKeyDown, onChange, title, placeholder }) {
  return (
    <div>
      <input
        type="text"
        value={title}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        autoFocus
        className="w-90"
      />
    </div>
  );
}

export default memo(InputTitle);
