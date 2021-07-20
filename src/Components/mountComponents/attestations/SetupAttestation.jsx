import React, { useContext } from 'react';
import { Context } from '../../Store';
import { Button } from 'antd';
import ModalComponent from './ModalComponent';
import buildBodySetupAttestations from '../../helpers/buildBodyFetch/buildBodySetupAttestations';
import fetchFunction from '../../helpers/fetchFunction';
import FormModalAttestation from './FormModalAttestation';
import { configParam } from '../../config/fetch/config';

export default function SetupAttestations() {
  const [visible, setVisible] = React.useState();
  const [globalState, inSetState] = useContext(Context);
  let { fetch, ui } = globalState;
  let { attestations } = globalState.fetch;

  const showModal = () => {
    setVisible(true);
  };

  const handleAfterClose = () => {
    setVisible(false);
    inSetState({
      ...globalState,
      ui: { ...ui, responseError: '', successAddAttestations: '' },
      fetch: {
        ...fetch,
        attestations: {
          ...attestations,
          EntryFirstDate: '',
          EntryLastDate: '',
        },
      },
    });
  };

  const handleCancel = () => {
    setVisible(false);
    inSetState({
      ...globalState,
      ui: { ...ui, responseError: '', successAddAttestations: '' },
    });
  };

  const handleOk = async () => {
    const dataResponse = await fetchFunction(
      globalState,
      false,
      'setup',
      buildBodySetupAttestations
    );
    const dataAttestatState = dataResponse.arr;
    const responseError = dataResponse.err;
    const loadingAttestations = dataResponse.loadingRequest;
    const successAddAttestations = dataResponse.success;
    let { responseData } = attestations;
    inSetState({
      ...globalState,
      ui: { ...ui, loadingAttestations, responseError, successAddAttestations },
      fetch: {
        ...fetch,
        attestations: {
          ...attestations,
          responseData: [...responseData, ...dataAttestatState],
        },
      },
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Создать
      </Button>
      <ModalComponent
        visible={visible}
        handleClose={handleAfterClose}
        handleCancel={handleCancel}
        handleOk={handleOk}
        forms={<FormModalAttestation settings={configParam} />}
        title={'Аттестация'}
        footer={true}
        settings={configParam}
      />
    </>
  );
}
