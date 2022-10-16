import { UseQueryOptions } from 'react-query';
import { UseQueryResult } from 'react-query/types/react/types';

import useHttp from '@hooks/queries/factories/useHttp';


const groupKey = 'BOARD';

const useBoardHttp = () => useHttp(groupKey, {});

const boardQuery = <TQueryFnData, TError = unknown, TData = TQueryFnData>(url: string, queryKey = 'temp-key'): UseQueryOptions<TData, TError, TData> =>
  useBoardHttp().query<TQueryFnData, TError, TData>(url, { queryKey, isQuery: true });

const useBoardQuery = <TQueryFnData, TError = unknown, TData = TQueryFnData>(url: string, queryKey: string = 'temp-key'): UseQueryResult<TData, TError> =>
  useBoardHttp().get(url, queryKey);

export default useBoardQuery;
export { boardQuery, useBoardHttp };
