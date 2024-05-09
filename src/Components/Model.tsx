import React from "react";
import { MONTHS } from "../Utils";
import InlineEditLabel from "./InlineEditLabel";

interface Event {
  id: number;
  title: string;
}

interface Props {
  isVisible?: boolean;
  date: number | null ;
  month: number;
  year: number;
  events: Event[];
  onClose: () => void;
  onDelete: (eventId: number) => void;
  onSave: (
    value: string,
    eventId: number
  ) => void;
}

const Modal: React.FC<Props> = ({
  isVisible = false,
  date,
  month,
  year,
  events,
  onClose,
  onDelete,
  onSave,
}) => {
  return (
    <div>
      <div
        className={`modal fade ${isVisible ? "show" : ""}`}
        style={{ display: `${isVisible ? "block" : "none"}` }}
        id="AddEditModal"
        role="dialog"
        aria-labelledby="ModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLongTitle">
                Event for {date} {MONTHS[month]} {year}
              </h5>
              <button
                type="button"
                onClick={onClose}
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {events.map((event, key) => (
                <InlineEditLabel
                  key={key}
                  value={event.title}
                  eventId={event.id}
                  onDelete={onDelete}
                  onSave={onSave}
                  id={""}
                />
              ))}
              <InlineEditLabel
                id="editablelabel"
                onSave={onSave}
                value=""
                isEditable={true}
                // focus={true}
                alwaysEdit={true}
                onDelete={() => {}}
                eventId={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
