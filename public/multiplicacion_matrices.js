let matriz1, matriz2;

async function generarMatrices() {
    let filasA = parseInt(document.getElementById("filas").value);
    let columnasA = parseInt(document.getElementById("columnas").value);

    if (filasA <= 0 || columnasA <= 0) {
        alert("Ingrese valores válidos para filas y columnas");
        return;
    }

    let filasB = columnasA;
    let columnasB = filasA;

    let matricesDiv = document.getElementById("matrices");
    matricesDiv.innerHTML = '';

    matriz1 = tf.randomUniform([filasA, columnasA], 1, 21, 'int32');
    matriz2 = tf.randomUniform([columnasA, columnasB], 1, 21, 'int32');

    const datos1 = await matriz1.array();
    const datos2 = await matriz2.array();

    const crearMatrizHTML = (datos, clase) => {
        let div = document.createElement('div');
        div.className = "matriz";
        div.style.display = "grid";
        div.style.gridTemplateColumns = `repeat(${datos[0].length}, auto)`;
        datos.forEach(fila => {
            fila.forEach(valor => {
                let input = document.createElement('input');
                input.type = 'number';
                input.disabled = true;
                input.className = clase;
                input.value = valor;
                div.appendChild(input);
            });
        });
        return div;
    };

    matricesDiv.appendChild(crearMatrizHTML(datos1, 'matriz1'));
    matricesDiv.appendChild(crearMatrizHTML(datos2, 'matriz2'));
}

function multiplicarMatrices() {
    if (!matriz1 || !matriz2) {
        alert("Genera las matrices primero.");
        return;
    }

    let resultado = tf.matMul(matriz1, matriz2);
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    resultadoDiv.style.display = "grid";
    resultadoDiv.style.gridTemplateColumns = `repeat(${matriz2.shape[1]}, auto)`;

    resultado.array().then(data => {
        data.forEach(fila => {
            fila.forEach(valor => {
                let cell = document.createElement('div');
                cell.textContent = valor;
                resultadoDiv.appendChild(cell);
            });
        });
    });
}
