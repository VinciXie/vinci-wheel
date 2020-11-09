/**
 * 这是列表请求参数的hook
 */
import { useState, useCallback } from "react";

interface ParamsBase {
  pageNum: number;
  pageSize: number;
}

export default function useListParams<T extends ParamsBase>(initQuery: T): [T, (params: Partial<T>) => void] {
  const [queryParams, setParams] = useState<T>(initQuery);
  const changeParams = useCallback(
    (params: Partial<T>) => {
      setParams(prevState => {
        // 也可以使用 Object.assign
        return { ...prevState, pageNum: 1, ...params };
      });
    },
    [setParams]
  );
  return [queryParams, changeParams];
}
