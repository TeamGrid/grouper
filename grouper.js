import { _ } from 'meteor/underscore'

export function grouper(items, opts) {
  const options = Object.assign({
    items: items || [],
    groupBy: () => '',
    sortBy: (item) => item,
    sortGroups: (group) => group.key,
    transform: (group) => group,
  }, opts)

  const list = !!options.items.fetch ? options.items.fetch() : options.items
  return _(list).chain()
    .groupBy(options.groupBy)
    .map((values, key) => options.transform({
      key,
      items: _.sortBy(values, options.sortBy),
    }))
    .sortBy(options.sortGroups)
    .value()
}
