import useHttp from '@hooks/queries/factories/useHttp';
import { useRecoilState } from 'recoil';

import useUserQuery, { useUserHttp } from '@hooks/queries/useUserQuery';
import { IList } from '@interfaces/IList';
import { IUser } from '@interfaces/IUser';
import { countState, sampleState } from '@states/sampleState';

const IndexPage = () => {
  const [sample, setSample] = useRecoilState(sampleState);
  const [count, setCount] = useRecoilState(countState);

  const userQuery = useUserHttp();

  const {
    data,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isStale,
    isSuccess,
    remove,
    status,
  } = userQuery.get<IList<IUser[]>>('/user/list', 'list');

  const increase = () => setCount(count + 1);
  const setTitle = () => setSample({ ...sample, title: String(document.querySelector('input')?.value) });

  return (
    <div>
      <div>Index Page</div>
      <div>{count}</div>
      <div>
        <button onClick={increase}>Increase</button>
      </div>
      <div>{sample.title}</div>
      <div>
        <input type="text" />
        <button onClick={setTitle}>Change title</button>
      </div>

      {isLoading ? <div>Loading...</div> :
        isSuccess ?
          <div>
            <table>
              <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>name</th>
              </tr>
              </thead>
              <tbody>
              {data.list.map((item, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.userId}</td>
                  <td>{item.name}</td>
                </tr>,
              )}
              </tbody>
            </table>
          </div> : null
      }

    </div>
  );
};

export default IndexPage;
