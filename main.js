document.addEventListener("DOMContentLoaded", () => {
    const inicioDiv = document.getElementById("inicio");
    const quizDiv = document.getElementById("quiz");
    const btnComenzar = document.getElementById("btnComenzar");

    quizDiv.style.display = "none"; // Ocultamos el quiz al principio

    btnComenzar.addEventListener("click", () => {
        inicioDiv.style.display = "none"; // Oculta la pantalla de inicio
        quizDiv.style.display = "block"; // Muestra el quiz
        main(); // Inicia el quiz
    });
});

// declaracion de preguntas
const datos = [
    {
        'pregunta': '¿Cómo se llama el protagonista completo de la serie?',
        'respuestas': [' Shinnosuke Nohara', 'Tamagochi Nohara', 'Shinosuki Nenehara', 'Takeshi Nohara'],
        'correcta': 0
    },
    {
        'pregunta': '¿Cuál es el nombre del perro de Shin Chan?',
        'respuestas': ['Nublado', 'Nevado', 'Granizado', 'Rex'],
        'correcta': 1
    },
    {
        'pregunta': '¿Qué nombre tiene el superhéroe favorito de Shin Chan?',
        'respuestas': ['Super-nevado', 'Ultra-malo', 'Super-culon', 'Ultra-héroe'],
        'correcta': 3
    },
    {
        'pregunta': '¿Como se llama el director de la guardería?',
        'respuestas': ['El señor mafioso', 'El señor jefazo', 'Hirosi', 'Nené'],
        'correcta': 0
    },
    {
        'pregunta': '¿Qué comida odia Shin Chan con toda su alma?',
        'respuestas': ['Acelgas', 'Galletitas', 'Cebolla', 'Pimientos'],
        'correcta': 3
    },
    {
        'pregunta': '¿Cual es el juego favorito de Nené?',
        'respuestas': ['Futbol', 'Comba', 'Papas y mamas', 'Cocinitas'],
        'correcta': 2
    },
    {
        'pregunta': '¿Que tiene Bo-chan que le hace tan particular?',
        'respuestas': ['Un gato', 'Una bici nueva', 'Un septum', 'Un moco'],
        'correcta': 3
    },
    {
        'pregunta': '¿Cuál es el mejor momento del día para Shin Chan?',
        'respuestas': ['La siesta', 'La mirienda', 'La cena', 'La hora de dormir'],
        'correcta': 1
    },
    {
        'pregunta': '¿Quien es la chica que le gusta a Shin Chan?',
        'respuestas': ['Nanako', 'Nené', 'Ai-chan', 'Bo-chan'],
        'correcta': 0
    },
    {
        'pregunta': '¿Qué haría Shin Chan si se encuentra con una chica guapa en la calle?',
        'respuestas': ['Se pone rojo y se esconde detrás de Misae', 'Le canta el “baile del culito” en plena calle', 'Le ofrece un caramelo y le pregunta si quiere casarse', 'Le dice "¡Hola, señorita guapa! ¿Quiere jugar conmigo a papás y mamás?"'],
        'correcta': 3
    },
];

// definicion de la clase
class Pregunta {
    constructor(pregunta, respuestas, correcta) {
        this.pregunta = pregunta;
        this.respuestas = respuestas;
        this.correcta = correcta;
    }

    correctaPregunta(indiceRespuesta) {
        return indiceRespuesta === this.correcta;
    }
}

const nuevasPreguntas = datos.map(pregunta => new Pregunta(pregunta.pregunta, pregunta.respuestas, pregunta.correcta));
console.log(nuevasPreguntas);

class Quiz {
    preguntaIndex = 0;
    puntuacion = 0;
    constructor(preguntas) {
        this.preguntas = preguntas;
    }
    getPreguntaIndex() {
        return this.preguntas[this.preguntaIndex];
    }
    haAcabado() {
        return this.preguntaIndex === this.preguntas.length;
    }
    guess(respuesta) {
        if(this.getPreguntaIndex().correctaPregunta(respuesta)) {
            this.puntuacion++;
        }
        this.preguntaIndex++;
    }
}

class UI {
    constructor() {}

    mostrarPregunta(text){
        const tituloPregunta = document.getElementById('pregunta');
        tituloPregunta.innerText = text;
    }

    mostrarRespuestas(respuestas, callback) {
        const opcionesConjunto = document.getElementById('opciones');
        opcionesConjunto.innerHTML = ''; // Limpiar las opciones anteriores
        for (let i = 0; i < respuestas.length; i++) {
            const button = document.createElement('button');
            button.className = 'bg-orange-400 text-white py-3 px-4 rounded-md hover:bg-orange-600 w-full my-2 text-center text-lg shadow';
    button.innerText = respuestas[i];
                        button.addEventListener('click', () => callback(i));
            opcionesConjunto.appendChild(button);
        }
    }

    mostrarPuntuacion(puntuacion)  {
        const quizFinalizadoHTML = `
        <h1 class="text-center text-3xl font-extrabold text-red-600 mb-4">¡Quiz Finalizado!</h1>
        <h2 class="text-center text-2xl text-orange-700 font-bold">Tu puntuación es: ${puntuacion}</h2>
        `;
        const element = document.getElementById('quiz');
        element.innerHTML = quizFinalizadoHTML;
    }

    mostrarProgreso(preguntaIndex, totalPreguntas) {
        const progreso = document.getElementById('progreso_actual');
        progreso.innerHTML = `Pregunta ${preguntaIndex} de ${totalPreguntas}`;
    }
}

const renderPage = (quiz, ui) => {
    if (quiz.haAcabado()) {
        ui.mostrarPuntuacion(quiz.puntuacion);
    } else {
        ui.mostrarPregunta(quiz.getPreguntaIndex().pregunta);
        ui.mostrarRespuestas(quiz.getPreguntaIndex().respuestas, (opcionActual) => {
            quiz.guess(opcionActual);
            renderPage(quiz, ui);
        });
        ui.mostrarProgreso(quiz.preguntaIndex + 1, quiz.preguntas.length);
    }
};

function main() {
    const quiz = new Quiz(nuevasPreguntas);
    const ui = new UI();
    renderPage(quiz, ui);
}

main();

// Crear botón dinámicamente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const trailerDiv = document.getElementById("trailerContainer");

    const btn = document.createElement("button");
    btn.innerText = "Ver tráiler de Shin Chan";
    btn.className = "bg-[#ff0000] hover:bg-orange-500 text-white font-bold py-2 px-4 rounded";

    btn.addEventListener("click", () => {
        window.open("https://www.youtube.com/watch?v=Quhknx5fSxM", "_blank");
    });

    trailerDiv.appendChild(btn);
});

// Crear botón culito dinámicamente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const trailerDiv = document.getElementById("culitoContainer");

    const btn = document.createElement("button");
    btn.innerText = "Culito culito";
    btn.className = "bg-[#ff0000] hover:bg-orange-500 text-white font-bold py-2 px-4 rounded";

    btn.addEventListener("click", () => {
        window.open("https://www.youtube.com/watch?v=zKpC_GoehSw", "_blank");
    });

    trailerDiv.appendChild(btn);
});

// Crear botón trompa  dinámicamente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const trailerDiv = document.getElementById("trompaContainer");

    const btn = document.createElement("button");
    btn.innerText = "Trompa";
    btn.className = "bg-[#ff0000] hover:bg-orange-500 text-white font-bold py-2 px-4 rounded";

    btn.addEventListener("click", () => {
        window.open("https://www.youtube.com/watch?v=wfyic1qB3mw", "_blank");
    });

    trailerDiv.appendChild(btn);
});

// Crear botón alPartir dinámicamente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const trailerDiv = document.getElementById("alPartirContainer");

    const btn = document.createElement("button");
    btn.innerText = "Al partir";
    btn.className = "bg-[#ff0000] hover:bg-orange-500 text-white font-bold py-2 px-4 rounded";

    btn.addEventListener("click", () => {
        window.open("https://www.youtube.com/watch?v=EMIjtxtvnaM", "_blank");
    });

    trailerDiv.appendChild(btn);
});
