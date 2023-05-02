
  const keyImageMap = {
    'A': 'typewritter/sq.png',
    'B': 'image2.jpg',
    // add more key-image mappings here
  };
  
  const body = document.querySelector('body');
  
  document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
  
    if (keyImageMap.hasOwnProperty(key)) {
      const image = document.createElement('img');
      image.src = keyImageMap[key];
      body.appendChild(image);
    }
  });
  