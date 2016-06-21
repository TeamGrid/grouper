# teamgrid:grouper [![Circle CI](https://circleci.com/gh/teamgrid/grouper.svg)](https://circleci.com/gh/teamgrid/grouper)
simple package for grouping and sorting arrays

## Installation
```
    meteor add teamgrid:grouper
```

## Usage

````javascript
  import { grouper } from 'meteor/teamgrid:grouper';


  const groupOrder = {
    group2: 1,
    group1: 2,
  }

  const items = [{
    group: 'group1',
    name: 'test',
  }, {
    group: 'group2',
    name: 'test2',
  }]

  // see tests for more detailed examples
  grouper(items, {
    groupBy: (item) => item.group,
    sortBy: (item) => item.name,
    transform: (group) => Object.assign(group, { order: groupOrder[group] }),
    sortGroups: (group) => group.order,
  })
````

## License
Licensed under MIT license. Copyright (c) 2016 TeamGrid

## Contributions

Contributions are welcome. Please open issues and/or file Pull Requests.

## Maintainers

- Max Nowack ([maxnowack](https://github.com/maxnowack))
