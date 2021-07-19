import { configParam } from '../../config/fetch/config';

const buildBodyGetAttestations = (toggle, config) => {
  let requestString =
    'SessionID=' +
    config.SessionID +
    '&Analytics=' +
    Object.keys(configParam.Algorithm)[0];
  return requestString;
};
export default buildBodyGetAttestations;
