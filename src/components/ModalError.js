export function modalError(messageError) {
  const ventanaModal = document.createElement('div');
  ventanaModal.id = 'ventanaModal';
  ventanaModal.className = 'modal';
  ventanaModal.innerHTML = `<div class="modal-content">
  <span class="cerrar">&times;</span>
  <h2>Verifica el siguiente dato:</h2>
  <p class = 'textError' id= 'textErrorModal'>${messageError}</p>
</div>`;
  ventanaModal.addEventListener('click', () => {
    ventanaModal.style.display = 'none';
  });
  return ventanaModal;
}
