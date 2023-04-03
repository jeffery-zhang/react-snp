# React SNP
Adjust the position and size of DOM elements through simple mouse dragging.

You can view the source code of react-snp at the following link:
[https://github.com/jeffery-zhang/react-snp](https://github.com/jeffery-zhang/react-snp)

# Let's Begin
You can install react-snp using npm or yarn.
``` bash
npm install --save react-snp

# or
yarn add react-snp
```
# Use React SNP
React SNP supports importing the module into your code by using ***es6 Modules***, ***module.exports***, ***AMD Modules***
```javascript
// es6
import { Snp } from 'react-snp'

// AMD Modules
require(['react-snp'], function({ Snp }) {
  // Use component ...
})

// CommonJS
const { Snp } = require('react-snp')
```
By passing your own component as children to the Snp component, you can create a draggable and resizable component that can be adjusted in both position and size.
``` javascript
function MyComponent() {
  return <Snp>
    <div>My Component</div>
  </Snp>
}
```
# Props
### bind?: 'window' | 'default'
The 'bind' prop can be used to determine whether the component is positioned relative to the window or relative to the nearest positioned ancestor element.The default value is 'default'.
### style?: CSSProperties
Style properties, if you set the 'position', 'box-sizing', 'top', 'left', 'right', 'bottom', 'width', or 'height' style properties, they will not take effect.
### initial?: {x: number | `${number}%` | `${number}px`, y: number | `${number}%` | `${number}px`, w: number | `${number}%` | `${number}px`, h: number | `${number}%` | `${number}px`}
The 'initial' prop represents the initial position and size of the component. The default value is {x:0, y: 0, w: 100, h: 100}
### className?: string
You can set a custom classname using the 'className' prop.
### moveCallbacks?: {moveStartCallback?: (x: number, y: number) => void, movingCallback?: (x: number, y: number) => void, moveEndCallback?: (x: number, y: number) => void}
This prop is a callback function that gets called when the user drags the element. You can set different callback functions for when the dragging starts, is in progress, and when it ends using the 'moveStartCallback', 'movingCallback', and 'moveEndCallback' props, respectively.
### resizeCallbacks?: {resizeStartCallback?: (w: number, h: number) => void, resizingCallback?: (w: number, h: number) => void, resizeEndCallback?: (w: number, h: number) => void}
This prop is a callback function that gets called when the user resizes the element. You can set different callback functions for when the resizing starts, is in progress, and when it ends using the 'resizeStartCallback', 'resizingCallback', and 'resizeEndCallback' props, respectively.
### enableMove?: 'horizontal' | 'vertical' | 'both' | 'disabled'
The 'enableMove' prop determines the allowed direction(s) for dragging the element.
### enableResize?: 'horizontal' | 'vertical' | 'both' | 'disabled'
The 'enableResize' prop determines whether the element can be resized by dragging vertically and horizontally.
### boundaries?: {left: number, right: number, top: number, bottom: number}
The 'boundaries' prop determines the boundaries in which the element can be moved. If the value is a positive number, the element is bound within the parent element. If the value is negative, the element can be moved outside of the parent element.The default value is {left: 0, right: 0, top: 0, bottom: 0}, which means that the element can only be moved within the boundaries of its parent element.
### rectLimits?: {minW: number | 'auto', maxW: number | 'auto', minH: number | 'auto', maxH: number | 'auto'}
The 'rectLimits' prop determines the maximum and minimum values for resizing the element. The default value is {minW: 'auto', maxW: 'auto', minH: 'auto', maxH: 'auto'}. When set to 'auto', the maximum value is the width and height of the parent element, and the minimum value is the initial width and height of the element.
# For Developers
To download the source code from [https://github.com/jeffery-zhang/react-snp](https://github.com/jeffery-zhang/react-snp) to your local environment, navigate to the repository and clone it to your local environment. Then, navigate to the cloned directory and install the dependencies. Once the dependencies are installed, start the development server to view the example files in your browser at localhost:8080.
``` bash
git clone -b master https://github.com/jeffery-zhang/react-snp.git

cd react-snp

npm install

npm run dev
# then you can visit the example page at localhost:8080
```