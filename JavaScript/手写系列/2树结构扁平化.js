const treeData = [
  {
    id: 1,
    name: "Node 1",
    children: [
      {
        id: 2,
        name: "Node 2",
        children: [
          { id: 3, name: "Node 3" },
          { id: 4, name: "Node 4" },
        ],
      },
      { id: 5, name: "Node 5" },
    ],
  },
];

const flagTree = (data, result) => {
  for (let item of data) {
    result.push(item);
    if (item?.children?.length) {
      flagTree(item?.children, result);
    }
    item.children = undefined;
    result.push(item);
  }
  return result;
};

console.log(JSON.stringify(flagTree(treeData, []), null, 2));
