function generarMatrices(){
    let filasA = document.getElementById("filas").value;
    let columnasA = document.getElementById("columnas").value;
    let matricesDiv = document.getElementById("matrices");
    matricesDiv.innerHTML = '';

    if (filasA <= 0 || columnasA <= 0){
        alert("Ingrese valores válidos para filas y columnas");
        return;
    }

    let filasB = columnasA;
    let columnasB = filasA;
    
    for (let i = 1; i <= 2; i++){
        let filas = i === 1 ? filasA : filasB;
        let columnas = i === 1 ? columnasA : columnasB;

        let matrizDiv = document.createElement("div");
        matrizDiv.className = "matriz";
        matrizDiv.style.display = "grid";
        matrizDiv.style.gridTemplateColumns=`repeat(${columnas},auto)`;

        for (let f = 0; f < filas; f++){
            for(let c = 0; c < columnas; c++){
                let input = document.createElement('input');
                input.type='number';
                input.className=`matriz${i}`;
                matrizDiv.appendChild(input);
            }
        }
        matricesDiv.appendChild(matrizDiv);
    }
}

function multiplicarMatrices(){
    let matrizAInput = Array.from(document.querySelectorAll('.matriz1')).map(input => Number(input.value));
    let matrizBInput = Array.from(document.querySelectorAll('.matriz2')).map(input => Number(input.value));

    let filasA = parseInt(document.getElementById("filas").value);
    let columnasA = parseInt(document.getElementById("columnas").value);
    let filasB = columnasA;
    let columnasB = filasA;

    if (matrizAInput.some(isNaN) || matrizBInput.some(isNaN)){
        alert("Ingrese solo valores númericos");
        return;
    }

    let matrizA = [];
    let matrizB = [];
    for (let i = 0; i < filasA; i++) {
        matrizA.push(matrizAInput.slice(i * columnasA, (i+1) * columnasA));
    }
    for (let i = 0; i < filasB; i++) {
        matrizB.push(matrizBInput.slice(i * columnasB, (i + 1) * columnasB));
    }

    let matrizC = Array(filasA).fill().map(() => Array(columnasB).fill(0));
    
    for (let i = 0; i < filasA; i++){
        for (let j = 0; j < columnasB; j++) {
            for (let k = 0; k < columnasA; k++){
                matrizC[i][j] += matrizA[i][k] * matrizB[k][j];
            }
        }
    }

    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    resultadoDiv.style.display = "grid";
    resultadoDiv.style.gridTemplateColumns = `repeat(${columnasB}, auto)`;

    matrizC.flat().forEach(valor =>{
        let cell = document.createElement('div');
        cell.textContent = valor;
        cell.className = ('div-matriz');
        resultadoDiv.appendChild(cell);
    });
}