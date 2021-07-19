import React, { useContext, useState } from 'react';
import { Context } from '../../Store';
import { Modal, Button, notification } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import fetchFunction from '../../helpers/fetchFunction';
import buildBodyDelAttestations from '../../helpers/buildBodyFetch/buildBodyDelAttestations';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default function SettingsButton(props) {
  const [globalState, inSetState] = useContext(Context);
  const [visible, setVisible] = useState(false);
  let { fetch } = globalState;
  let { attestations } = globalState.fetch;

  function createConfirm() {
    Modal.confirm({
      content: <p>Удалить аттестацию?</p>,
      async onOk() {
        const deleteAttestat = await fetchFunction(
          globalState,
          false,
          'delete',
          buildBodyDelAttestations
        );
        if (deleteAttestat.statusDelete.Status === 1) {
          const responseData = attestations.responseData.filter(
            (item) => item.ID !== props.id
          );
          attestations = { ...attestations, responseData };
          fetch = { ...fetch, attestations };
          inSetState({ ...globalState, fetch });

          notification.open({
            description: 'Аттестация удалена',
            icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
            className: 'custom-class',
            style: {
              width: 300,
            },
          });
        }
        if (deleteAttestat.statusDelete.Status === 0) {
          notification.open({
            description: 'Ошибка удаления',
            icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
            className: 'custom-class',
            style: {
              width: 300,
            },
          });
        }
      },
      onCancel() {},
      okText: 'Да',
      cancelText: 'Нет',
    });
  }

  React.useEffect(() => {
    if (visible) {
      createConfirm();
    }
  }, [visible]);

  const handleDelete = () => {
    inSetState({
      ...globalState,
      fetch: { ...fetch, attestations: { ...attestations, id: props.id } },
    });
    setVisible(true);
  };
  return (
    <Button
      onClick={handleDelete}
      type="text"
      icon={
        <DeleteTwoTone
          style={{
            fontSize: '22px',
            padding: '0px 5px',
            paddingTop: '7px',
          }}
          twoToneColor={'#ed4242'}
        />
      }
    />
  );
}
