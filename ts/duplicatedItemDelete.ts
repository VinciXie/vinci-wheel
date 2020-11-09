interface Obj {
  [key: string]: any;
}

// 复杂数据去重
function deleteDuplicatedItemFromArray<T extends Obj>(arr: T[], key: string) {
  const set = new Set();
  const result: T[] = [];
  arr.forEach((ele) => {
    const value = ele[key];
    if (set.has(value)) {
      return;
    }
    result.push(ele);
    set.add(value);
  });
  return result;
}
