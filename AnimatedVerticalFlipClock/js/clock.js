const digitHeight = 40; // px

function createDigits(container, max) {
    container.innerHTML = '';
    for (let i = 0; i <= max; i++) {
        const d = document.createElement('div');
        d.classList.add('digit');
        d.textContent = i;
        container.appendChild(d);
    }
}

function showTime(timeStr) {
    const [hh, mm, ss] = timeStr.split(':');
    const values = [...hh.padStart(2, '0'), ...mm.padStart(2, '0'), ...ss.padStart(2, '0')];

    const containers = document.querySelectorAll('.digits-container');
    containers.forEach((container, i) => {
        const digit = values[i];
        const children = Array.from(container.children);
        const index = children.findIndex(d => d.textContent === digit);

        if (index !== -1) {
            const offset = index * digitHeight;
            container.style.transitionDelay = `${i * 50}ms`;
            container.style.transform = `translateY(-${offset}px)`;

            children.forEach(d => d.classList.remove('active'));
            children[index].classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize digits
    document.querySelectorAll('.digits-container').forEach(container => {
        const max = parseInt(container.dataset.max);
        createDigits(container, max);
    });

    // Start clock interval
    setInterval(() => {
        const now = new Date();
        const hh = now.getHours().toString().padStart(2, '0');
        const mm = now.getMinutes().toString().padStart(2, '0');
        const ss = now.getSeconds().toString().padStart(2, '0');
        showTime(`${hh}:${mm}:${ss}`);
    }, 1000);
});