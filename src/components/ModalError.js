export function modalError(messageError) {
  const windowModal = document.createElement('div');
  windowModal.id = 'textErrorModal';
  windowModal.className = 'modal';
  windowModal.innerHTML = `<div class="modal-content">
  <span class="cerrar">&times;</span>
  <h2>Verifica el siguiente dato:</h2>
  <p id = 'textModalError' class = 'textError'>${messageError}</p>
</div>`;
  return windowModal;
}

export function modalDeletePost(messageError) {
  const windowModalDelete = document.createElement('div');
  windowModalDelete.innerHTML = '';
  windowModalDelete.id = 'windowModalDelete';
  windowModalDelete.className = 'modal';
  windowModalDelete.innerHTML = `<div class="modal-content">
  <span class="cerrar">&times;</span>
  <h2>Verifica el siguiente dato:</h2>
  <p id = 'textModalError' class = 'textError'>${messageError}</p>
  <button id = 'yes'>Si</button>
  <button id = 'cancel'>Cancelar</button>
</div>`;

  return windowModalDelete;
}
