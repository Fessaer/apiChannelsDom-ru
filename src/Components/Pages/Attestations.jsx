import React, { useEffect, useContext } from 'react';
import { Context } from '../Store';
import Cards from '../mountComponents/attestations/Cards';
import fetchFunction from '../helpers/fetchFunction';
import buildBodyGetAttestations from '../helpers/buildBodyFetch/buildBodyGetAttestations';

export default function Attestations() {
  const [globalState, inSetState] = useContext(Context);
  let { fetch, ui } = globalState;
  let { attestations } = globalState.fetch;

  useEffect(() => {
    (async function () {
      const dataAttestations = await fetchFunction(
        globalState,
        false,
        'get',
        buildBodyGetAttestations
      );
      const dataAttestatState = dataAttestations.arr;
      const responseError = dataAttestations.err;
      const loadingAttestations = dataAttestations.loadingRequest;
      inSetState({
        ...globalState,
        ui: { ...ui, loadingAttestations, responseError },
        fetch: {
          ...fetch,
          attestations: { ...attestations, responseData: dataAttestatState },
        },
      });
    })();
  }, []);
  return (
    <>
      {'attestations' in globalState.fetch ? (
        <>
          {'responseData' in globalState.fetch.attestations ? <Cards /> : null}
        </>
      ) : null}
    </>
  );
}
