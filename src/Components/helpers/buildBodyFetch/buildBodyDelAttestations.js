import { configParam } from '../../config/fetch/config';

const buildBodyDelAttestations = (toggle, config) => {
  let requestString =
    'SessionID=' +
    config.SessionID +
    '&Analytics=' +
    Object.keys(configParam.Algorithm)[0];
  const deleteId = config.fetch[toggle].id;
  return requestString + '&ID=' + deleteId;
};
export default buildBodyDelAttestations;
