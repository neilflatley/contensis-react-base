import { Map } from 'immutable';
import fromJSOrdered from './fromJSOrdered';

const fromJSLeaveImmer = (js, immerFeatureRootProps = null) => {
  console.info(js);
  if (typeof js !== 'object' || js === null) return js;
  if (!immerFeatureRootProps || !Object.keys(immerFeatureRootProps).length)
    return fromJSOrdered(js);
  const convertedObject = new Map({});
  const keys = Object.keys(js);
  keys.forEach(key => {
    if (immerFeatureRootProps.indexOf(key) > -1) {
      convertedObject.set(key, js[key]);
      console.info(`LOOK! - immer untouched bar root key "${key}"`);
    } else {
      console.info(`LOOK! - normal immutable feature "${key}"`);
      convertedObject.set(key, fromJSOrdered(js));
    }
  });
};

export default fromJSLeaveImmer;
