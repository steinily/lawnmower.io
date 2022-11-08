
const floodFill = (unClippedLawn, coordX, coordY, clippedLawn) => {
  const current = unClippedLawn[coordX][coordY];
  if (current === clippedLawn) {
    return unClippedLawn;
  }

  fill(unClippedLawn, coordX, coordY, clippedLawn, current);
  return unClippedLawn;
};


const fill = (unClippedLawn, coordX, coordY, clippedLawn, current) => {

  if (coordX < 0) {
    return;
  }
  if (coordY < 0) {
    return;
  }
  if (coordX > unClippedLawn.length - 1) {
    return;
  }
  if (coordY > unClippedLawn[coordX].length - 1) {
    return;
  }

  if (unClippedLawn[coordX][coordY] !== current) {
    return;
  }

  unClippedLawn[coordX][coordY] = clippedLawn;
  step=step+1
  document.body.insertAdjacentHTML('beforeend', createTable(unClippedLawn , step , coordX,coordY));
 
  
  fill(unClippedLawn, coordX - 1, coordY, clippedLawn, current);
  fill(unClippedLawn, coordX + 1, coordY, clippedLawn, current);
  fill(unClippedLawn, coordX, coordY - 1, clippedLawn, current);
  fill(unClippedLawn, coordX, coordY + 1, clippedLawn, current);
};


const grassLandArea = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
];
let step = 1
 


function getCells(data, type) {
  return data.map(cell => `<${type} class='cell${cell}'>${cell}</${type}>`).join('');
}

function createBody(data) {
  return data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
}

function createTable(data , step=1 , coordX=0 , coordY=0) {
  const [headings, ...rows] = data;
  return `
  <div>
  <h3>${step}.step LawnMower moved to : ${coordX} : ${coordY} <h3>
    <table>
      <thead>${getCells(headings, 'th')}</thead>
      <tbody>${createBody(rows)}</tbody>
    </table>
    <div>
  `;
}

document.body.insertAdjacentHTML('beforeend', createTable(grassLandArea));
floodFill(grassLandArea, 0, 1, 2)