
  const keyImageMap = {
    'A': 'a.png',
    'B': 'b.png',
    'C': 'c.png',
    'D': 'd.png',
    'E': 'e.png',
    'F': 'f.png',
    'G': 'g.png',
    'H': 'h.png',
    'I': 'i.png',
    'J': 'j.png',
    'K': 'k.png',
    'L': 'l.png',
    'M': 'm.png',
    'N': 'n.png',
    'O': 'o.png',
    'P': 'p.png',
    'Q': 'q.png',
    'R': 'r.png',
    'S': 's.png',
    'T': 't.png',
    'U': 'u.png',
    'V': 'v.png',
    'W': 'w.png',
    'X': 'x.png',
    'Y': 'y.png',
    'Z': 'z.png',
    ' ': 'nothing.png', // add space key mapping here

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
  