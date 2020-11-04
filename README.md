# VirtualElement
A Javascript library for building reliable, high-performance web applications.

## Features

## Documentation

### Basic example (v1 rendering style)

```
class MyElement extends VirtualElement {
  constructor() {
    super();
    this.v2 = false
  }

  render() {
    return this.html`<div class="my-element"><h1>MyElement</h1></div>`
  }
}  
```

### Basic example (v2 rendering style)

This example requires babel-plugin-veljs-jsx for transpiling jsx syntax to template literals

```
class MyElement extends VirtualElement {
  render() {
    return <div class="my-element"><h1>MyElement</h1></div>
  }
}  
```

### Basic example with reactive properties (v2 rendering style)

Each virtual element might have a set of reactive properties. Changing value will trigger a redraw.

```
<html>
  <head>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

```
// index.js
import { VirtualElement, render, Component } from 'veljs';

class MyElement extends VirtualElement {
  static get properties() {
    return {
      cnt: { type: Number, default: 0}
    }
  }

  render() {
    return (
      <div class="my-element">
        <h1>MyElement, cnt={this.cnt}</h1>
        <button onClick={() => this.cnt += 1}>Click me</button>
      </div>
    )
  }
}  

render(document.getElementById('app'), Component(MyElement)())
```
TBD