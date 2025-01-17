import RepoResultRow from '@/components/home/RepoResultRow';
import { octokit } from '@/utils/octokit';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

type RepoResult = {
  id: number;
  name: string;
};

function Index() {
  const [searchValue, setSearchValue] = useState('');
  let queryVal = '';

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['searchRepos', queryVal],
    queryFn: async () => {
      console.log(`queryVal: ${queryVal}`);
      const result = await octokit.rest.search.repos({
        q: queryVal,
        sort: 'stars',
        order: 'desc',
        per_page: 20,
      });

      return result.data.items as RepoResult[];
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const handleClick = async () => {
    queryVal = searchValue;
    refetch();
  };

  const searchResultRows = isLoading ? (
    <p>Loading...</p>
  ) : (
    (data ?? []).map((res) => RepoResultRow({ name: res.name, id: res.id }))
  );

  return (
    <>
      <div>
        <h1 className="text-red-300">lookgit!</h1>
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <button onClick={handleClick}>Click Me</button>
      </div>
      {searchResultRows}
    </>
  );
}
