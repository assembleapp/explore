# Architecture

The platform has three main peices to it:

* data
* layout
* templates

## Templates

Templates are the easiest to explain: they're React components.

## Layouts

Layouts are somewhat dynamic -
they're designed to be restructured pretty fluidly.

Each change to the layout is handled
through methods on the `Layout` objects.
These a collection of changes can be recorded as a macro,
which can then be tied to events in the application.

Layouts each have a `root` property,
which is expected to be a component generated with `styled-components`.
Outside of styles built into React components,
layout root components are responsible for the app's styling.

> TODO:
> It is important that the layout updates itself whenever appropriate.
> To handle this, templates passed to any `Layout` should be wrapped
> in `mobx-react`'s `observer` function.

## Data

Data are defined as Javascript objects
with observable properties.

We want to keep data as flexible as possible for now,
and simple JS classes seem to do a fine job at the moment.

We'll need more experience integrating with 3rd-party systems
before we can get big gains on this front.

## Tutorial: Build Nimbus

Our goal with this app
is that we should be able to use it to re-create the Nimbus POS app.

There's some boilerplate code in `src/index.js`
that placed some of the Nimbus POS UI on the page.
We'll be extracting that code out into this README,
as a set of instructions the user can follow
to create the app themselves.

```javascript
<div>
  <div>{item.emoji}</div>

  {repeat(item.table_count, table_number =>
    <div
      role="button"
      onClick={() => actions.showTable(item, table_number)}
      >
      {table_number}
    </div>
  )}
</div>
```
