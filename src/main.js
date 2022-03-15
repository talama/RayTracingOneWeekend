(function () {
  // Image
  const imageWidth = 256;
  const imageHeight = 256;
  const ppmHeader = `P3\n${imageWidth} ${imageHeight}\n255\n`;

  // Render
  console.log(ppmHeader);
  for (let y = imageHeight - 1; y >= 0; y -= 1) {
    for (let x = 0; x < imageWidth; x += 1) {
      let r = x / (imageWidth - 1);
      let g = y / (imageHeight - 1);
      let b = 0.25;

      let ir = parseInt(256 * r);
      let ig = parseInt(256 * g);
      let ib = parseInt(256 * b);
      console.log(`${ir} ${ig} ${ib}\n`);
    }
  }
})();
