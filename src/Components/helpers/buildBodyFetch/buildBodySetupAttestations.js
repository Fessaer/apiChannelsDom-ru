import { configParam } from '../../config/fetch/config';

const buildBodySetupAttestations = (toggle, config) => {
  let arrAttestation = Object.entries(config.fetch[toggle]);
  let requestString =
    'SessionID=' +
    config.SessionID +
    '&Analytics=' +
    Object.keys(configParam.Algorithm)[0];
  const attestStringRequest = arrAttestation
    .map(([key, value]) => {
      if (key !== 'responseData') return `&${key}=${value}`;
    })
    .join('')
    .replace(',', '');

  return requestString + attestStringRequest;
};
export default buildBodySetupAttestations;
