import { Action, Dispatch } from 'redux';
import { ProblemDetailsError, ShlinkDomain, ShlinkDomainRedirects } from '../../api/types';
import { buildReducer } from '../../utils/helpers/redux';
import { ShlinkApiClientBuilder } from '../../api/services/ShlinkApiClientBuilder';
import { GetState } from '../../container/types';
import { parseApiError } from '../../api/utils';
import { ApiErrorAction } from '../../api/types/actions';
import { EDIT_DOMAIN_REDIRECTS, EditDomainRedirectsAction } from './domainRedirects';

/* eslint-disable padding-line-between-statements */
export const LIST_DOMAINS_START = 'shlink/domainsList/LIST_DOMAINS_START';
export const LIST_DOMAINS_ERROR = 'shlink/domainsList/LIST_DOMAINS_ERROR';
export const LIST_DOMAINS = 'shlink/domainsList/LIST_DOMAINS';
export const FILTER_DOMAINS = 'shlink/domainsList/FILTER_DOMAINS';
/* eslint-enable padding-line-between-statements */

export interface DomainsList {
  domains: ShlinkDomain[];
  filteredDomains: ShlinkDomain[];
  loading: boolean;
  error: boolean;
  errorData?: ProblemDetailsError;
}

export interface ListDomainsAction extends Action<string> {
  domains: ShlinkDomain[];
}

interface FilterDomainsAction extends Action<string> {
  searchTerm: string;
}

const initialState: DomainsList = {
  domains: [],
  filteredDomains: [],
  loading: false,
  error: false,
};

export type DomainsCombinedAction = ListDomainsAction
& ApiErrorAction
& FilterDomainsAction
& EditDomainRedirectsAction;

export const replaceRedirectsOnDomain = (domain: string, redirects: ShlinkDomainRedirects) =>
  (d: ShlinkDomain): ShlinkDomain => d.domain !== domain ? d : { ...d, redirects };

export default buildReducer<DomainsList, DomainsCombinedAction>({
  [LIST_DOMAINS_START]: () => ({ ...initialState, loading: true }),
  [LIST_DOMAINS_ERROR]: ({ errorData }) => ({ ...initialState, error: true, errorData }),
  [LIST_DOMAINS]: (_, { domains }) => ({ ...initialState, domains, filteredDomains: domains }),
  [FILTER_DOMAINS]: (state, { searchTerm }) => ({
    ...state,
    filteredDomains: state.domains.filter(({ domain }) => domain.toLowerCase().match(searchTerm)),
  }),
  [EDIT_DOMAIN_REDIRECTS]: (state, { domain, redirects }) => ({
    ...state,
    domains: state.domains.map(replaceRedirectsOnDomain(domain, redirects)),
    filteredDomains: state.filteredDomains.map(replaceRedirectsOnDomain(domain, redirects)),
  }),
}, initialState);

export const listDomains = (buildShlinkApiClient: ShlinkApiClientBuilder) => () => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch({ type: LIST_DOMAINS_START });
  const { listDomains } = buildShlinkApiClient(getState);

  try {
    const domains = await listDomains();

    dispatch<ListDomainsAction>({ type: LIST_DOMAINS, domains });
  } catch (e: any) {
    dispatch<ApiErrorAction>({ type: LIST_DOMAINS_ERROR, errorData: parseApiError(e) });
  }
};

export const filterDomains = (searchTerm: string): FilterDomainsAction => ({ type: FILTER_DOMAINS, searchTerm });
