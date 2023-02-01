const dialog = document.createElement('dialog');
const dialogTitle = document.createElement('h4');
dialogTitle.className = 'dialogTitle';
const dialogContent = document.createElement('div');
dialogContent.className = 'loquesea';

export const Dialog = (title, content) => {
  dialogTitle.textContent = title;
  dialogContent.appendChild(content);
  dialog.append(dialogTitle, dialogContent);

  return dialog;
};

export const closeDialog = () => {
  dialogContent.innerHTML = '';
  dialog.close();
};
