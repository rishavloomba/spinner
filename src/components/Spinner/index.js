import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '../Common/TypoGraphy';
import Pull from 'react-pull-to-refresh';
import { config } from '../../config';
import { wheelOffers } from '../../constants/constant';
import './index.css';

function Spinner() {
  const [degToRotate, setdegToRotate] = useState();
  const [disableSpin, setDisableSpin] = useState(false);
  const [rewardIndex, setRewardIndex] = useState();
  const [mouseState, setMouseState] = useState();
  const spinnerRef = useRef(null);
  const pointerRef = useRef(null);

  //connection callback
  const clientInit = () => {
    const { apiKey, discoveryDocs, clientId, scope } = config;
    window.gapi.client
      .init({
        apiKey: apiKey,
        clientId: clientId,
        scope: scope,
        discoveryDocs: discoveryDocs
      })
      .then(() => {});
  };

  // initialize connection with google api
  useEffect(() => {
    window.gapi.load('client:auth2', clientInit);
  }, []);

  //method to find index and saves to sheets
  const handleReward = (degRotate) => {
    let selectedIndex = Math.floor(8 - degRotate / 45);
    setRewardIndex(selectedIndex);
    const params = {
      spreadsheetId: config.spreadsheetId,
      range: 'sheet1',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS'
    };

    const valueRangeBody = {
      majorDimension: 'ROWS',
      values: [
        {
          web_client: 'my pwa',
          timestamp: new Date(),
          spin_result_index: rewardIndex
        }
      ]
    };
    let promise = window.gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    promise.then(()=>{}).catch();
  };

  //callback when spin trigger and animation activates from this method
  const handleSpinClick = () => {
    if (!disableSpin) {
      let RandomDeg = Math.floor(5000 + Math.random() * 5000);
      setdegToRotate(RandomDeg);
      setDisableSpin(true);
      const { current } = spinnerRef;
      if (current) {
        current.style.transition = 'all 4s ease-out';
        current.style.transform = `rotate(${RandomDeg}deg)`;
      }
    }
  };

  //method to handle events when transition ends
  const onTransitionEnd = () => {
    const { current } = spinnerRef;
    if (current) {
      current.style.transition = 'none';
      let ActualDeg = degToRotate % 360;
      current.style.transform = `rotate(${ActualDeg}deg)`;
      handleReward(ActualDeg);
      setDisableSpin(false);
    }
  };

  //method to pull back wheel and triger spin
  const handleBackSpin = (event, phase) => {
    event.stopPropagation();
    const { current } = spinnerRef;
    if (mouseState === 'down' && phase === 'up') handleSpinClick();
    if (phase === 'down' || phase === 'up') setMouseState(phase);
    if (mouseState === 'down' && phase === 'move') {
      const { movementX, movementY } = event;
      if (movementX < 0 || movementY < 0) {
        current.style.transform = `rotate(+${45}deg)`;
      }
    }
  };

  //jsx for wheel and refesh to pull
  return (
    <>
      {/* <Pull
        onRefresh={() => {
          spinnerRef.current.style.transform = `rotate(0deg)`;
        }}
        triggerHeight={100}
      > */}
        <div className="spinner">
          <div ref={pointerRef} className="stoper">
            <div className="base"></div>
            <div className="triangle"></div>
          </div>
          <ul ref={spinnerRef} className="circle" onTransitionEnd={onTransitionEnd}>
            {wheelOffers.map((each, index) => {
              const { mainText, m2Text, helpText, boxShadow, bgColor } = each;
              const styles = {
                boxShadow: boxShadow,
                backgroundColor: bgColor,
                transform: `rotate(${(360 / wheelOffers.length) * index}deg) skewY(-${
                  360 / wheelOffers.length
                }deg)`
              };
              return (
                <li
                  style={styles}
                  key={`${bgColor}${index}`}
                  onMouseDown={(e) => handleBackSpin(e, 'down')}
                  onMouseMove={(e) => handleBackSpin(e, 'move')}
                  onMouseUp={(e) => handleBackSpin(e, 'up')}
                >
                  <div
                    className="text"
                    onCopy={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <div className="s-circle"></div>
                    <div className="reward-wrap">
                      <Typography className="mainText" Tag="p" modifier={['heavy', 't2']}>
                        {mainText}
                      </Typography>
                      {m2Text && (
                        <Typography className="mainText" Tag="p" modifier={['heavy', 't2']}>
                          {m2Text}
                        </Typography>
                      )}
                      {helpText && (
                        <Typography className="helpText" Tag="p" modifier={['regular', 't1']}>
                          {helpText}
                        </Typography>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="spin-btn" onClick={handleSpinClick}>
            <Typography
              className="spin-text"
              Tag="p"
              modifier={['heavy', 't4']}
              disable={disableSpin}
            >
              Spin
            </Typography>
          </div>
        </div>
        <div className="arrow-round"></div>
        <div className="arrow-round1"></div>
      {/* </Pull> */}
    </>
  );
}

PropTypes.Spinner = {};

export default Spinner;
