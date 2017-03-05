# rotext
text animation

![example](https://raw.githubusercontent.com/mukkun/rotext.js/master/image.gif)

# Usage
`index.html`
```html
<div id="rotext">
  Colorful and fragrant, flowers scatter.<br />
　Nothing in this world is forever. <br />
　I cross life’s rugged mountain today. <br />
　This is no dream. I am ever sober.
</div>

<script src="rotext.js"></script>
<script>
  const rotext = new Rotext('rotext', {
    speed: 5000,
    color: '#f0f',
    delay: 0,
    rotate: 360,
    range: 200,
    interval: 10,
    anime: 'ease-out'
  });
  rotext.start();
</script>
```

