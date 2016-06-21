import { Tinytest } from 'meteor/tinytest';
import { grouper } from 'meteor/teamgrid:grouper';

const groupData = {
  foo1: {
    order: 3,
  },
  foo2: {
    order: 1,
  },
  foo3: {
    order: 2,
  },
}

const testData = [{
  group: 'foo1',
  name: 'bar1',
}, {
  group: 'foo1',
  name: 'bar0',
}, {
  group: 'foo1',
  name: 'bar2',
}, {
  group: 'foo2',
  name: 'bar3',
}, {
  group: 'foo2',
  name: 'bar4',
}, {
  group: 'foo2',
  name: 'bar5',
}, {
  group: 'foo3',
  name: 'bar6',
}, {
  group: 'foo3',
  name: 'bar7',
}, {
  group: 'foo3',
  name: 'bar8',
}, {
  group: 'foo3',
  name: 'bar9',
}]


Tinytest.add('grouper - defaults', (test) => {
  const grouped = grouper(testData)
  test.equal(grouped.length, 1);
  test.equal(grouped[0].items.length, 10);
  test.equal(grouped[0].key, '');
  test.equal(grouped[0].items[0].name, 'bar1');
});

Tinytest.add('grouper - group items', (test) => {
  const grouped = grouper(testData, {
    groupBy: (item) => item.group,
  })
  test.equal(grouped.length, 3);
});

Tinytest.add('grouper - sort items', (test) => {
  const grouped = grouper(testData, {
    sortBy: (item) => item.name,
  })
  test.equal(grouped[0].items[0].name, 'bar0');
});

Tinytest.add('grouper - transform', (test) => {
  const grouped = grouper(testData, {
    groupBy: (item) => item.group,
    transform: (group) => Object.assign(group, groupData[group.key]),
  })
  test.equal(grouped[0].key, 'foo1');
  test.equal(grouped[0].order, 3);
});

Tinytest.add('grouper - sort groups', (test) => {
  const grouped = grouper(testData, {
    groupBy: (item) => item.group,
    transform: (group) => Object.assign(group, groupData[group.key]),
    sortGroups: (group) => group.order,
  })

  test.equal(grouped[0].key, 'foo2');
  test.equal(grouped[0].order, 1);

  test.equal(grouped[1].key, 'foo3');
  test.equal(grouped[1].order, 2);

  test.equal(grouped[2].key, 'foo1');
  test.equal(grouped[2].order, 3);
});
