import { useEffect } from "react";

export function BlogModal({ blog, onClose }) {
  useEffect(() => {
    const modalElement = document.getElementById("modalBlog");
    const modal = new bootstrap.Modal(modalElement);

    const handleHidden = () => {
      onClose(); // desmonta el componente
    };

    modalElement.addEventListener("hidden.bs.modal", handleHidden);
    modal.show();

    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, [blog]);

  return (
    <div
      className="modal fade"
      id="modalBlog"
      tabIndex="-1"
      aria-labelledby="modalBlogLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body text-center">
            <h4>{blog?.titulo}</h4>
            <p>{blog?.texto}</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}