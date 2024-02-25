const mockArr = [
  {
    id: "1",
    name: "1",
  },
  {
    id: "2",
    name: "2",
    pid: "1",
  },
  {
    id: "3",
    name: "3",
    pid: "1",
  },
  {
    id: "4",
    name: "4",
    pid: "2",
  },
];

function buildTree(data, parentId) {
  const result = [];
  for (let item of data) {
    if (item.pid === parentId) {
      const children = buildTree(data, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      result.push(item);
    }
  }
  return result;
}

console.log("%j", buildTree(mockArr));
