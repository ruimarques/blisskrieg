import { useLocation } from 'react-router-dom';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function getBaseUrl() {
  const port = window.location.port ? ':' + window.location.port : '';
  return `${window.location.protocol}//${window.location.hostname}${port}`;
}
