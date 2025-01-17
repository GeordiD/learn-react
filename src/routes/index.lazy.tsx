import RepoResultRow from '@/components/home/RepoResultRow';
import { octokit } from '@/utils/octokit';
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

  const [searchResults, setSearchResults] = useState([] as RepoResult[]);

  const handleClick = async () => {
    const result = await octokit.rest.search.repos({
      q: searchValue,
      sort: 'stars',
      order: 'desc',
      per_page: 20,
    });

    setSearchResults(result.data.items);
  };

  const searchResultRows = searchResults.map((res) =>
    RepoResultRow({ name: res.name })
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
