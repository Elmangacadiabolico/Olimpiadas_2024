
#include <iostream>
#include <vector>

using namespace std;

const int FILAS = 5;
const int COLUMNAS = 5;

char laberinto[FILAS][COLUMNAS] = {
    {'.', '#', '.', '.', '.'},
    {'.', '#', '#', '#', '.'},
    {'.', '.', '.', '#', '.'},
    {'#', '#', '.', '#', '.'},
    {'.', '.', '.', 'G', '.'}
};

int dx[] = {-1, 1, 0, 0}; 
int dy[] = {0, 0, -1, 1}; 

bool resolverLaberinto(int x, int y) {
    // Si el robot encuentra la salida
    if (laberinto[x][y] == 'G') {
        return true;
    }

    // Marcar la posición actual con '+'
    if (laberinto[x][y] == '.') {
        laberinto[x][y] = '+';

        // posibles movimientos
        for (int i = 0; i < 4; i++) {
            int nuevoX = x + dx[i];
            int nuevoY = y + dy[i];

           
            if (nuevoX >= 0 && nuevoX < FILAS && nuevoY >= 0 && nuevoY < COLUMNAS && 
                (laberinto[nuevoX][nuevoY] == '.' || laberinto[nuevoX][nuevoY] == 'G')) {

                if (resolverLaberinto(nuevoX, nuevoY)) {
                    return true;
                }
            }
        }

        // Retrosede si no hay lugar desbloqueda
        laberinto[x][y] = '.';
    }

    return false;
}

void imprimirLaberinto() {
    for (int i = 0; i < FILAS; i++) {
        for (int j = 0; j < COLUMNAS; j++) {
            cout << laberinto[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    if (resolverLaberinto(0, 0)) {
        cout << "Se encontró una salida:" << endl;
    } else {
        cout << "No se encontró ninguna salida." << endl;
    }

    imprimirLaberinto();

    return 0;
}

