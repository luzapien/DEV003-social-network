export const Dialog = (title, content) => {
  const dialog = document.createElement('dialog');
  const dialogTitle = document.createElement('h4');
  const dialogContent = document.createElement('div');

  dialogTitle.textContent = title;
  dialogContent.appendChild(content);
  dialog.append(dialogTitle, dialogContent);

  return dialog;
};
