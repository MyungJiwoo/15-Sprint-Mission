const BaseForm = ({ children, onSubmit }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default BaseForm;
