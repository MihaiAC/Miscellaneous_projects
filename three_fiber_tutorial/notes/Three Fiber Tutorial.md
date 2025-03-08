### Canvas
Orthographic = no perspective distortion, all objects look the same size.
Camera:
- up -> make z-axis the up vector with [0,0,1]
- position -> trial and error
Ambient light = diffuse light from everywhere
Directional light = parallel rays from target direction.
Only with directional light = shadows are black, both together = softer shadows.

### Player box
mesh = object we can add to the scene.

boxGeometry = defines a box, args: width (x-axis), depth(y-axis), height(z-axis)

meshLambertMaterial = simple material (?) that responds to light;
- Reacts to light in a non-shiny, diffuse way = "Lambertian reflection model"
- Practically: matte + requires light source + less computationally expensive than its counterparts (e.g: MeshPhongMaterial).
- No light in scene => appears black.

### Scene
One unit = one pixel usually => zoom out means more of the scene is exposed.
Desired behavior = same content independent of screen size.
#### Bounds
Resizes view based on children size. Used for keeping objects (player in this case) centered + properly framed.
- fit = ensures object fits within view
- clip = objects outside the bounds are not visible
- observe = enable automatic adjustments if object's size or position changes (aka when the player box moves in this case)
- margin = adds margin around the bounded object (similar to classic CSS margin)

### Other
```ts 
Extract<Row, {type: 'forest'}>
``` 
= extracts a subtype from a union type;

"lifted by half of its height" so it is above ground I assume?

### Shadows
receiveShadow and castShadow properties

shadow-camera-left, right, top, bottom = defines shadow frustum size
Orthographic camera projects shadows in a rectangular box-shaped area.
The properties above control this box' size.

### Animating the cars
Can't re-render every time something moves (React way) -> want to update positions directly.
React to set up the scene + objects, Three to do the animations.
React Three Fiber = thin layer on top of Three

