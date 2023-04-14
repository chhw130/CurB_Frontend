import { useInfiniteQuery } from "react-query";
import { Querykey } from "api/react-query/QueryKey";
import { getFeeds } from "api/axios/axiosSetting";
import { BASE_URL } from "api/URL/BaseURL";
import { FeedData } from "interface/Interface";

interface UseFeed {
  feedData: any;
  fetchNextPage: (options?: any) => Promise<any>;
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage?: boolean;
}

export const useFeed = (): UseFeed => {
  const fallBack: [] = [];
  const {
    data: feedData = fallBack,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery(
    Querykey.feedData,
    ({ pageParam = `/feeds/oz/` }) => getFeeds(pageParam),
    {
      getNextPageParam: (lastpage) => {
        if (lastpage.total_pages - lastpage.now_page > 0)
          return `/feeds/oz/?page=${lastpage.now_page + 1}`;
        else {
          return undefined;
        }
      },
    }
  );

  return { feedData, fetchNextPage, hasNextPage, isFetching, isLoading };
};
