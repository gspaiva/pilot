import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
} from 'former-kit'

const RemoveUserModal = ({
  handleCloseModal,
  handleDeleteUser,
  isOpen,
  user,
}) => {
  const handleDelete = (id) => {
    handleDeleteUser(id)
    handleCloseModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
    >
      <ModalTitle title="Excluir Usuário" />
      <hr />

      <ModalContent>
        <p>Tem certeza que deseja excluir o usuário {user.email} ?</p>
      </ModalContent>

      <ModalActions>
        <Button
          fill="outline"
          size="default"
          onClick={handleCloseModal}
        >
          Não, quero manter
        </Button>

        <Button
          size="default"
          type="submit"
          onClick={() => handleDelete(user.id)}
        >
          Sim, quero excluir
        </Button>
      </ModalActions>
    </Modal>)
}

RemoveUserModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    date_created: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
}

export default RemoveUserModal
