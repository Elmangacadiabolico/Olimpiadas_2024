function sanar(fila, col, vidaInicial, vidaActual, d, mapa) {
    const n = fila.length;
    const r = mapa.length;
    const c = mapa[0].length;

    // Verificaciones iniciales
    if (n !== col.length || n !== vidaInicial.length || n !== vidaActual.length) {
        return ;
    }

    if (r > 1000 || r < 1 || c > 1000 || c < 1 || n > 1000 || n < 1) {
        return ;
    }

    if (d > 1000000 || d < 1) {
        return ;
    }

    for (let i = 0; i < n; i++) {
        if (fila[i] > r - 1 || fila[i] < 0) {
            return ;
        }

        if (col[i] > c - 1 || col[i] < 0) {
            return ;
        }

        if (vidaActual[i] < 0 || vidaInicial[i] < vidaActual[i] || vidaInicial[i] > 100) {
            return ;
        }
    }

    for (let i = 0; i < r; i++) {
        if (mapa[i].length !== c) {
            return ;
        }

        for (let j = 0; j < c; j++) {
            if (mapa[i][j] !== 'X' && mapa[i][j] !== '.') {
                return ;
            }
        }
    }

    // Preparación de los datos de personajes
    let personajes = [];
    for (let i = 0; i < n; i++) {
        personajes.push({
            fila: fila[i],
            col: col[i],
            vidaInicial: vidaInicial[i],
            vidaActual: vidaActual[i],
            vidaPerdida: vidaInicial[i] - vidaActual[i]
        });
    }

    // Ordenamos los personajes por la vida perdida de mayor a menor
    personajes.sort((a, b) => b.vidaPerdida - a.vidaPerdida);

    
    const khrisX = fila[0];
    const khrisY = col[0];

    const movimientos = [
        [0, 1],  // derecha
        [1, 0],  // abajo
        [0, -1], // izquierda
        [-1, 0]  // arriba
    ];

    const queue = [[khrisX, khrisY, 0]]; 
    const visitado = Array.from({ length: r }, () => Array(c).fill(false)); 
    visitado[khrisX][khrisY] = true;

    let posicionesAccesibles = [];

    while (queue.length > 0) {
        const [x, y, moves] = queue.shift();

        if (moves <= d && mapa[x][y] === '.') {
            posicionesAccesibles.push([x, y]);
        }

        if (moves >= d) continue;

        for (const [dx, dy] of movimientos) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < r && ny < c && !visitado[nx][ny] && mapa[nx][ny] === '.') {
                visitado[nx][ny] = true;
                queue.push([nx, ny, moves + 1]);
            }
        }
    }

    let maxVidaRecuperada = 0;

    for (const [kx, ky] of posicionesAccesibles) {
        let vidaRecuperada = 0;
        for (let i = 1; i < n; i++) {
            if (Math.abs(kx - fila[i]) + Math.abs(ky - col[i]) <= 2) {
                const vidaRestaurada = Math.min(vidaInicial[i] - vidaActual[i], 10);
                vidaRecuperada += vidaRestaurada;
            }
        }
        maxVidaRecuperada = Math.max(maxVidaRecuperada, vidaRecuperada);
    }

    return maxVidaRecuperada;
}

// Ejemplo de prueba
const fila = [2, 3, 0, 2, 0, 3];
const col = [2, 3, 5, 0, 4, 1];
const vidaInicial = [13, 40, 40, 50, 40, 6];
const vidaActual = [10, 34, 1, 48, 32, 1];
const d = 4;
const mapa = [
    "..XX..",
    "...XXX",
    "...X..",
    "......"
];

console.log(sanar(fila, col, vidaInicial, vidaActual, d, mapa)  ); // Debería imprimir 8  
