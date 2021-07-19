import React, { useContext } from 'react';
import { Context } from '../../Store';
import { Col, Row, Card, Button, Progress, Tag } from 'antd';
import format from '../../helpers/functionFormatReplaceDate';
import { CheckCircleOutlined } from '@ant-design/icons';
import calculatedParcent from '../../helpers/calculatedPercent';
import DeleteAttestation from './DeleteAttestations';
import SettingsAttestation from './SettingsAttestations';
import SetupAttestations from './SetupAttestation';

export default function Attestations() {
  const [globalState] = useContext(Context);
  const { responseData } = globalState.fetch.attestations;

  return (
    <>
      <SetupAttestations />
      <Row
        gutter={[8, 8]}
        justify="space-between"
        style={{
          display: 'flex',
          paddingRight: '12px',
          paddingBottom: '12px',
          justifyContent: 'flex-start',
        }}
      >
        {responseData.map((item) => (
          <Col
            key={item.ID}
            className="gutter-row"
            xs={{ span: 24, push: 0 }}
            sm={{ span: 12, push: 0 }}
            md={{ span: 12, push: 0 }}
            lg={{ span: 8, push: 0 }}
            xl={{ span: 6, push: 0 }}
          >
            <Card
              hoverable={true}
              bordered={true}
              style={{ width: 'auto' }}
              bodyStyle={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'default',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    Создана:{' '}
                    {format(
                      new Date(item['CreationDate']),
                      'dd.mm.yyyy hh:MM:ss'
                    )}
                  </p>
                  {item.Status === '1' ? (
                    <Tag color="processing">в процессе</Tag>
                  ) : null}
                  {item.Status === '2' ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      выполнено
                    </Tag>
                  ) : null}

                  {item.Status === 0 ? <Tag color="cyan">новая</Tag> : null}
                </div>
                <p style={{ fontSize: '12px', margin: 0 }}>
                  Диапазон времени:{' '}
                </p>
                <p style={{ fontSize: '12px', margin: 0 }}>
                  {format(new Date(item.EntryFirstDate), 'dd.mm.yyyy hh:MM:ss')}
                  {' -> '}
                  {format(new Date(item.EntryLastDate), 'dd.mm.yyyy hh:MM:ss')}
                </p>
                <p style={{ fontSize: '12px', margin: 0, paddingTop: '4px' }}>
                  Количество всего: {item.EntryCount}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p style={{ fontSize: '12px', marginTop: '3px' }}>
                      Выполнено: {item.UserEntryCount}
                    </p>
                  </div>
                  <div style={{ width: 170 }}>
                    <Progress
                      percent={calculatedParcent(
                        item.EntryCount,
                        item.UserEntryCount
                      )}
                      size="small"
                      status="active"
                    />
                  </div>
                </div>
              </div>

              <p>{'  '}</p>
              <div
                style={{
                  display: 'flex',
                  fontSize: '12px',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ margin: '3px 0px' }}>
                  <Button size={'small'} type="primary">
                    Продолжить
                  </Button>
                </div>

                <div style={{ display: 'flex' }}>
                  {item.statusExecution === 'success' ? (
                    <a style={{ marginTop: '4px', fontSize: '14px' }} href="#">
                      Подробнее...
                    </a>
                  ) : (
                    <>
                      <SettingsAttestation id={item.ID} />
                      <DeleteAttestation id={item.ID} />
                    </>
                  )}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
