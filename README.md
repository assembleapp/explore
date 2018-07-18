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
