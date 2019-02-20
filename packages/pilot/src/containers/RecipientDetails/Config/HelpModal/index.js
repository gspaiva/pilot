import React from 'react'
import PropTypes from 'prop-types'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Spacing,
} from 'former-kit'

import style from '../../Config/style.css'

import ImageAutomaticOne from './img/automatic_10_25_1.svg'
import ImageAutomaticTwo from './img/automatic_10_25_2.svg'
import ImageAutomaticThree from './img/automatic_10_25_3.svg'
import ImageAutomaticDx from './img/automatic_dx.svg'

const HelpModal = ({
  isOpen,
  onExit,
  title,
  t,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onExit}
    className={style.modalWidth}
  >
    <ModalTitle
      title={title}
      closeIcon={<IconClose width={16} height={16} />}
      onClose={onExit}
    />
    <div className={style.modalHeight}>
      <ModalContent>
        <hr />
        <small className={style.marginBottomforModal}>{t('pages.recipient_detail.help_subtitle')}</small>
        <h5 className={style.textColor}>{t('pages.recipient_detail.help_manual_title')}</h5>
        <p>{t('pages.recipient_detail.help_manual_first_p')}</p>
        <p>{t('pages.recipient_detail.help_manual_second_p')}</p>
        <h5 className={style.textColor}>{t('pages.recipient_detail.help_automatic_title')}</h5>
        <p>{t('pages.recipient_detail.help_automatic_first_p')}
          <a href="https://pagarme.zendesk.com/hc/pt-br/articles/217944383-Qual-percentual-das-vendas-pode-ser-recebido-antecipadamente">
            {t('pages.recipient_detail.help_automatic_link')}
          </a>
        </p>
        <h5 className={style.textColor}>{t('pages.recipient_detail.help_1025_title')}</h5>
        <p>{t('pages.recipient_detail.help_1025_first_p')}</p>
        <div className={style.imgSize}>
          <ImageAutomaticOne />
        </div>
        <ImageAutomaticTwo />
        <ImageAutomaticThree />
        <h5 className={style.textColor}>{t('pages.recipient_detail.help_dx_title')}</h5>
        <p>{t('pages.recipient_detail.help_dx_first_p')}</p>
        <ImageAutomaticDx />
      </ModalContent>
      <ModalActions>
        <div className={style.justifyContent}>
          <Button fill="gradient" onClick={onExit}>
            {t('pages.recipient_detail.help_exit')}
          </Button>
          <Spacing />
        </div>
      </ModalActions>
    </div>
  </Modal>
)

HelpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default HelpModal
