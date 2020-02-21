import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import mapStateToVersionInfo from '../transformations/state-to-versioninfoprops.mapper.js';
import { VersionInfoStyledTable } from './VersionInfo.styled.js';

const VersionInfo = ({
  deliveryApi,
  disabeSsrRedux,
  nodeEnv,
  servers,
  packagejson,
  project,
  projects,
  proxyDeliveryApi,
  publicUri,
  reverseProxyPaths,
  version,
}) => {
  return (
    <>
      <VersionInfoStyledTable>
        <thead>
          <tr>
            <td colSpan={2}>
              <h1>Version Information</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={2}>Package detail</th>
          </tr>
          <tr>
            <td className="left">Name</td>
            <td>{packagejson.name}</td>
          </tr>
          <tr>
            <td className="left">Version</td>
            <td>{packagejson.version}</td>
          </tr>
          <tr>
            <th colSpan={2}>Version info (state)</th>
          </tr>
          <tr>
            <td>Git repo url: </td>
            <td>
              <a
                href={packagejson.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                {packagejson.repository}
              </a>
            </td>
          </tr>
          <tr>
            <td>Pipeline: </td>
            <td>
              <a
                href={`${packagejson.repository}/pipelines/${
                  version.buildNumber ? version.buildNumber : ''
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {version.buildNumber}
              </a>
            </td>
          </tr>
          <tr>
            <td>Commit: </td>
            <td>
              <a
                href={`${packagejson.repository}/commit/${
                  version.commitRef ? version.commitRef : ''
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {version.commitRef}
              </a>
            </td>
          </tr>
          {/* <tr>
            <td>Last release ref: </td>
            <td></td>
          </tr>
          <tr>
            <td>Number of commits since last release: </td>
            <td></td>
          </tr> */}
          <tr>
            <td>Project</td>
            <td className={project == 'unknown' ? 'red' : ''}>{project}</td>
          </tr>
          <tr>
            <td>Contensis version status: </td>
            <td
              className={
                version.contensisVersionStatus == 'published' ? 'green' : 'red'
              }
            >
              {version.contensisVersionStatus}
            </td>
          </tr>
          <tr>
            <th colSpan={2}>Build configuration</th>
          </tr>
          <tr>
            <td>Environment</td>
            <td>{servers.alias}</td>
          </tr>
          <tr>
            <td>Public uri</td>
            <td>{publicUri}</td>
          </tr>
          <tr>
            <td>Servers</td>
            <td className="small">
              <div>web: {servers.web}</div>
              <div>cms: {servers.cms}</div>
              <div>iis: {servers.iis}</div>
              <div>internal vip: {servers.internalVip}</div>
            </td>
          </tr>
          <tr>
            <td>Reverse proxy paths</td>
            <td>
              {Object.entries(reverseProxyPaths).map(([, path], key) => (
                <span key={key}>[ {path} ] </span>
              ))}
            </td>
          </tr>
          <tr>
            <td>Projects</td>
            <td>
              {Object.entries(projects).map(([, project], key) => (
                <div key={key}>
                  [ {project.id}: {project.publicUri} ]
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td>Delivery API</td>
            <td className="small">
              <ul style={{ margin: 0, padding: 0 }}>
                {Object.entries(deliveryApi).map(([key, value], idx) => (
                  <li key={idx} style={{ listStyleType: 'none' }}>
                    {key}: <span>{value}</span>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Proxy Delivery API requests</td>
            <td className={proxyDeliveryApi ? 'green' : 'red'}>
              {proxyDeliveryApi.toString()}
            </td>
          </tr>
          <tr>
            <td>Disable SSR inline-redux</td>
            <td>{disabeSsrRedux.toString()}</td>
          </tr>
          <tr>
            <td>NODE_ENV</td>
            <td className={nodeEnv === 'production' ? 'green' : 'red'}>
              {nodeEnv.toString()}
            </td>
          </tr>
        </tbody>
      </VersionInfoStyledTable>
    </>
  );
};

VersionInfo.propTypes = {
  deliveryApi: PropTypes.object,
  disabeSsrRedux: PropTypes.bool,
  nodeEnv: PropTypes.string,
  packagejson: PropTypes.object,
  project: PropTypes.string,
  projects: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  proxyDeliveryApi: PropTypes.bool,
  publicUri: PropTypes.string,
  reverseProxyPaths: PropTypes.object,
  servers: PropTypes.object,
  version: PropTypes.object,
};

export default hot(module)(connect(mapStateToVersionInfo)(VersionInfo));
