document.addEventListener('DOMContentLoaded', function () {
    const entryList = document.getElementById('entry-list');
    const submitButton = document.getElementById('submit-entry');
    const entryTextarea = document.getElementById('entry');

    function loadEntries() {
        const entries =
            JSON.parse(localStorage.getItem('manifestations')) || [];
        entries.forEach((entry) => addEntryToDOM(entry));
    }

    function addEntryToDOM(entry) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'manifestationCheckbox';
        checkbox.checked = entry.fulfilled;
        li.appendChild(checkbox);

        const span = document.createElement('span');
        span.textContent = entry.text;
        span.className = 'entry-text';
        span.setAttribute('contenteditable', 'false');
        li.appendChild(span);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            li.remove();
            saveEntries();
        });
        li.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.innerHTML = '&#9998;'; // Using the edit pencil emoji
        editButton.className = 'edit-button';
        editButton.addEventListener('click', function () {
            if (span.getAttribute('contenteditable') === 'true') {
                span.setAttribute('contenteditable', 'false');
                editButton.innerHTML = '📝';
                saveEntries();
            } else {
                span.setAttribute('contenteditable', 'true');
                span.focus();
                editButton.innerHTML = '💾'; // Using the save disk emoji
            }
        });
        li.appendChild(editButton);

        entryList.insertBefore(li, entryList.firstChild);
    }

    function saveEntries() {
        const entries = [];
        entryList.querySelectorAll('li').forEach((li) => {
            const text = li.querySelector('.entry-text').textContent.trim();
            const fulfilled = li.querySelector(
                '.manifestationCheckbox'
            ).checked;
            entries.push({ text, fulfilled });
        });
        localStorage.setItem('manifestations', JSON.stringify(entries));
    }

    submitButton.addEventListener('click', function () {
        const entryText = entryTextarea.value.trim();
        if (entryText !== '') {
            const newEntry = { text: entryText, fulfilled: false };
            addEntryToDOM(newEntry);
            saveEntries();
            entryTextarea.value = '';
        }
    });

    entryList.addEventListener('change', function (event) {
        if (event.target.matches('.manifestationCheckbox')) {
            const checkbox = event.target;
            const listItem = checkbox.parentElement;
            if (checkbox.checked) {
                listItem.classList.add('fulfilled');
            } else {
                listItem.classList.remove('fulfilled');
            }
            saveEntries();
        }
    });

    entryList.addEventListener('mouseover', function (event) {
        if (event.target.matches('.manifestationCheckbox')) {
            const checkbox = event.target;
            const tooltip = document.createElement('span');
            tooltip.classList.add('tooltip');
            tooltip.textContent =
                'Tick it once your manifestation has been fulfilled';
            checkbox.insertAdjacentElement('afterend', tooltip);
        }
    });

    entryList.addEventListener('mouseout', function (event) {
        if (event.target.matches('.manifestationCheckbox')) {
            const tooltip = event.target.nextElementSibling;
            if (tooltip && tooltip.classList.contains('tooltip')) {
                tooltip.remove();
            }
        }
    });

    loadEntries();
});
