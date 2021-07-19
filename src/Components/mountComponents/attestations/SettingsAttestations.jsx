import React, { useContext } from 'react';
import { Button, notification } from 'antd';
import { ToolTwoTone, CheckCircleOutlined } from '@ant-design/icons';
import ModalComponent from './ModalComponent';
import buildBodyCustomizeAtt from '../../helpers/buildBodyFetch/buildBodyCustomizeAtt';
import fetchFunction from '../../helpers/fetchFunction';
import { Context } from '../../Store';
import FormModalAttestation from './FormModalAttestation';
import { configParam } from '../../config/fetch/config';

export default function SettingsAttestations({ id }) {
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

  const targetItem = globalState.fetch.attestations.responseData
    .filter((item) => item.ID === id)
    .pop();

  const handleOk = async () => {
    const filteredAtt = globalState.fetch.attestations.responseData.filter(
      (item) => item.ID !== id
    );

    const dataResponse = await fetchFunction(
      globalState,
      false,
      'setup',
      buildBodyCustomizeAtt
    );

    const dataAttestatState = dataResponse.arr;
    const responseError = dataResponse.err;
    const loadingAttestations = dataResponse.loadingRequest;
    const successAddAttestations = dataResponse.success;

    if (successAddAttestations !== 'failure') {
      inSetState({
        ...globalState,
        ui: {
          ...ui,
          loadingAttestations,
          responseError: '',
          successAddAttestations: '',
        },
        fetch: {
          ...fetch,
          attestations: {
            ...attestations,
            EntryFirstDate: '',
            EntryLastDate: '',
            responseData: [...filteredAtt, ...dataAttestatState],
          },
        },
      });
      notification.open({
        description: `${configParam.massage.alerts.attestations.success.customizeAttestation}`,
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        className: 'custom-class',
        style: {
          width: 300,
        },
      });
    } else {
      inSetState({
        ...globalState,
        ui: {
          ...ui,
          loadingAttestations,
          responseError,
          successAddAttestations,
        },
      });
    }
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="text"
        icon={
          <ToolTwoTone
            style={{
              fontSize: '22px',
              padding: '0px 5px',
              paddingTop: '7px',
            }}
          />
        }
      />
      <ModalComponent
        visible={visible}
        handleClose={handleAfterClose}
        handleCancel={handleCancel}
        handleOk={handleOk}
        forms={<FormModalAttestation targetItem={targetItem} />}
        title={'Аттестация'}
        footer={false}
        settings={configParam}
      />
    </>
  );
}
