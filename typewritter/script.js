
  const keyImageMap = {
    'A': '../a.png',
    'B': 'b.png',
    'C': '../letters/c.png',
    'D': '../letters/d.png',
    'E': '../letters/e.png',
    'F': '../letters/f.png',
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
  