/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { Context } from '../../Store';
import { Modal, Button, Alert } from 'antd';

export default function ModalComponent({
  visible,
  handleClose,
  handleCancel,
  handleOk,
  forms,
  title,
  footer,
  settings,
}) {
  const [globalState] = useContext(Context);
  let { ui } = globalState;
  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          (() =>
            ui.successAddAttestations === 'success' && footer === true ? (
              <Button
                key="alert"
                type="text"
                style={{
                  height: 32,
                  width: 390,
                  padding: 0,
                  marginBottom: 0,
                }}
              >
                <Alert
                  style={{ height: 32, width: '100%' }}
                  message={
                    settings.massage.alerts.attestations.success.addAttestation
                  }
                  type="success"
                />
              </Button>
            ) : null)(),
          (() =>
            ui.successAddAttestations === 'success' && footer === true ? (
              <Button key="submit" type="primary" onClick={handleCancel}>
                Закрыть
              </Button>
            ) : (
              <Button key="submit" type="primary" onClick={handleOk}>
                Отправить
              </Button>
            ))(),
        ]}
      >
        {forms}
        {(() =>
          ui['responseError'] !== undefined && ui.responseError !== '' ? (
            <Alert
              style={{ margin: 0, maxWidth: '470px' }}
              message={(() => {
                if (
                  ui.responseError.includes(
                    `${settings.componentAttestations.EntryFirstDate.formElementProps.type}`
                  )
                )
                  return ui.responseError
                    .replace(
                      `${settings.componentAttestations.EntryFirstDate.formElementProps.type}`,
                      `'${settings.componentAttestations.EntryFirstDate.formElementProps.label}'`
                    )
                    .replace(
                      `${settings.componentAttestations.EntryLastDate.formElementProps.type}`,
                      `'${settings.componentAttestations.EntryLastDate.formElementProps.label}'`
                    );
                if (
                  ui.responseError.includes(
                    `${settings.componentAttestations.EntryLastDate.formElementProps.type}`
                  )
                )
                  return ui.responseError
                    .replace(
                      `${settings.componentAttestations.EntryLastDate.formElementProps.type}`,
                      `'${settings.componentAttestations.EntryLastDate.formElementProps.label}'`
                    )
                    .replace(
                      `${settings.componentAttestations.EntryFirstDate.formElementProps.type}`,
                      `'${settings.componentAttestations.EntryFirstDate.formElementProps.label}'`
                    );
                return ui.responseError;
              })()}
              type="error"
            />
          ) : null)()}
      </Modal>
    </>
  );
}
