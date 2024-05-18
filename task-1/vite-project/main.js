let fieldIndex = 0;

function addField(type) {
    fieldIndex++;
    const form = document.getElementById('dynamic-form');
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'mb-3';

    let field;
    switch (type) {
        case 'text':
            field = document.createElement('input');
            field.type = 'text';
            field.name = `field_${fieldIndex}`;
            field.placeholder = `Text Field ${fieldIndex}`;
            field.className = 'form-control';
            break;
        case 'checkbox':
            field = document.createElement('input');
            field.type = 'checkbox';
            field.name = `field_${fieldIndex}`;
            field.id = `field_${fieldIndex}`;
            field.className = 'form-check-input';
            const label = document.createElement('label');
            label.setAttribute('for', `field_${fieldIndex}`);
            label.textContent = `Checkbox ${fieldIndex}`;
            label.className = 'form-check-label';
            fieldContainer.appendChild(label);
            break;
        case 'radio':
            field = document.createElement('input');
            field.type = 'radio';
            field.name = 'radio-group';
            field.value = `option_${fieldIndex}`;
            field.id = `field_${fieldIndex}`;
            field.className = 'form-check-input';
            const radioLabel = document.createElement('label');
            radioLabel.setAttribute('for', `field_${fieldIndex}`);
            radioLabel.textContent = `Option ${fieldIndex}`;
            radioLabel.className = 'form-check-label';
            fieldContainer.appendChild(radioLabel);
            break;
        default:
            return;
    }

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'btn btn-danger ms-2';
    removeButton.addEventListener('click', () => {
        form.removeChild(fieldContainer);
    });

    fieldContainer.appendChild(field);
    fieldContainer.appendChild(removeButton);
    form.appendChild(fieldContainer);
}

document.getElementById('add-text').addEventListener('click', () => addField('text'));
document.getElementById('add-checkbox').addEventListener('click', () => addField('checkbox'));
document.getElementById('add-radio').addEventListener('click', () => addField('radio'));
