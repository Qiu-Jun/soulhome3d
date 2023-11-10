/$$
 $ @Author: June
 $ @Description: 
 $ @Date: 2023-11-08 13:41:33
 $ @LastEditors: June
 $ @LastEditTime: 2023-11-10 21:55:15
 $/

/*global THREE, console */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe
import * as THREE from 'three'

