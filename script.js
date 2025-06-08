document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const keepGoingMessage = document.getElementById('keep-going-message');

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    };

    const updateProgressBar = () => {
        const allTasks = taskList.querySelectorAll('li');
        const checkedTasks = taskList.querySelectorAll('input.checkbox:checked');
        const total = allTasks.length;
        const completed = checkedTasks.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Concluído`;

        if (total > 0 && completed === total) {
            keepGoingMessage.classList.remove('hidden');
            keepGoingMessage.classList.add('visible');
        } else {
            keepGoingMessage.classList.remove('visible');
            keepGoingMessage.classList.add('hidden');
        }
        if (total > 0 && completed === total) {
    keepGoingMessage.classList.remove('hidden');
    keepGoingMessage.classList.add('visible');
    Confetti(); // 🎉 Dispara confete aqui
} else {
    keepGoingMessage.classList.remove('visible');
    keepGoingMessage.classList.add('hidden');
}

    };

    const saveTasks = () => {
        localStorage.setItem('tasks', taskList.innerHTML);
    };

    const loadTasks = () => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            taskList.innerHTML = saved;
            updateProgressBar();
            toggleEmptyState();
        }
    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;
        const existingTasks = Array.from(taskList.querySelectorAll('li span')).map(span => span.textContent.trim().toLowerCase());
if (existingTasks.includes(taskText.toLowerCase())) {
    alert('Essa tarefa já existe!');
    return;
}


        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
        updateProgressBar();
        saveTasks();
    };

    const form = document.querySelector('.input-area');
    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;

        if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
            li.remove();
            toggleEmptyState();
            updateProgressBar();
            saveTasks();
        }

        if (e.target.classList.contains('checkbox')) {
            li.classList.toggle('completed', e.target.checked);
            updateProgressBar();
            saveTasks();
        }

        if (e.target.classList.contains('edit-btn') || e.target.closest('.edit-btn')) {
            const span = li.querySelector('span');
            const newText = prompt("Editar tarefa:", span.textContent);
            if (newText !== null && newText.trim() !== '') {
                span.textContent = newText.trim();
                saveTasks();
            }
        }
    });

    window.addEventListener('load', loadTasks);
    toggleEmptyState();
    updateProgressBar();
});

const Confetti = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
};


