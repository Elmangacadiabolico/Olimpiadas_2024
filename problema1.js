

 
function nazetadietame(C, P, G) {
    const bananas = {
        carbohidratos: 27,
        calorias: 105
    };
    const atun = {
        proteinas: 30,
        calorias: 120
    };
    const oliva = {
        gramos_de_grasa: 1,
        calorias: 9
    };

    
    let Bananas_N = Math.ceil(C / bananas.carbohidratos);
    if (C === 0) {
        Bananas_N = 0;
    }

  
    let latas_N = Math.ceil(P / atun.proteinas);
    if (P === 0) {
        latas_N = 0;
    }

    
    let aceite_N = G;

  
    let calorias_totales = (Bananas_N * bananas.calorias) + 
                           (latas_N * atun.calorias) + 
                           (aceite_N * oliva.calorias);

    return calorias_totales + "Cantidad de cosas ";
}

// en donde esta el console.log(nazetadietame(valore_modificables,valore_modificables,valore_modificables))
console.log(nazetadietame(60, 90, 50));  
