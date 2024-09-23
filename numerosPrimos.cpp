#include <iostream>
#include <vector>

void buscaprimos(int N) { 
    bool Primo = true;
    if (N > 1) {
        for (int i = 2; i <= N / 2; i++) {
            if (N % i == 0) {
                Primo = false;
                break;
            }
        }
    } else {
        Primo = false;
    }

    if (Primo) {
        std::cout << N << " es un número primo" << std::endl;
    } else {
        std::cout << N << " no es un número primo" << std::endl;
    }
}

int main() {
    int cantidad;
    std::cout << "¿Cuántos números deseas ingresar? ";
    std::cin >> cantidad;

    std::vector<int> numeros(cantidad); 

    
    for (int i = 0; i < cantidad; i++) {
        std::cout << "Ingresar valor " << (i + 1) << ": ";
        std::cin >> numeros[i];
    }

    
    for (int i = 0; i < cantidad; i++) {
        buscaprimos(numeros[i]); 
    }

    return 0; 
}
