import React, { useState } from "react";

interface Props {
  value?: string;
  isEditable?: boolean;
  eventId: number;
  onDelete: (eventId: number) => void;
  onSave: (value: string, eventId: number) => void;
  id: string;
  alwaysEdit?: boolean;
}

const InlineEditLabel: React.FC<Props> = ({
  value = "",
  isEditable = false,
  eventId,
  onDelete,
  onSave,
  id,
  alwaysEdit = false,
}) => {
  const [editing, setEditing] = useState<boolean>(isEditable);
  const [inputValue, setInputValue] = useState<string>(value);

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    onDelete(eventId);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLElement>) => {
    setInputValue(value);
    setEditing(true);
  };

  const handleSaveClick = () => {
    if (inputValue.trim().length > 0) {
      setEditing(false);
      onSave(inputValue, eventId);
      setInputValue("");
    } else {
      onDelete(eventId);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleSaveClick();
    }
  };

  const label = (
    <div className="label-show">
      <p className="list-events">
        {value}
        <i onClick={handleDeleteClick} className="fa fa-trash-o fa-lg popup-action"></i>
        <i onClick={handleEditClick} className="fa fa-pencil fa-lg popup-action"></i>
      </p>
    </div>
  );

  const edit = (
    <div className="input-group">
      <input
        type="text"
        className="form-control form-control-sm"
        autoFocus
        placeholder="Add Event Here !!!"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleSaveClick}
      />
    </div>
  );

  return <div id={id}>{editing || alwaysEdit ? edit : label}</div>;
};

export default InlineEditLabel;
