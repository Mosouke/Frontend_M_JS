document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#BG_Cw form'); 
    const success_message = document.createElement('div');
    success_message.className = 'toast';
    success_message.setAttribute('role', 'alert');
    success_message.setAttribute('aria-live', 'assertive');
    document.body.appendChild(success_message);

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        clear_error_messages(); 
        if (validate_form()) { 
            show_toast('<i class="fa-regular fa-circle-check"></i><h2>Message Sent!</h2><br><p>Thanks for completing the form. We\'ll be in touch soon!</p>');
            form.reset(); 
        }
    });

    function validate_form() {
        let is_valid = true;
        const required_fields = document.querySelectorAll('[required]');

        required_fields.forEach((field) => {
            if (!field.value.trim()) {
                show_error(field, 'Ce champ est obligatoire');
                is_valid = false;
            } else if (field.type === 'email' && !validate_email(field.value)) {
                show_error(field, 'L\'adresse e-mail n\'est pas formatée correctement');
                is_valid = false;
            }
        });

        return is_valid;
    }

    function validate_email(email) {
        const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return re.test(String(email).toLowerCase());
    }

    function show_error(field, message) {
        const error = document.createElement('div');
        error.className = 'error_message';
        error.innerText = message;
        field.parentNode.appendChild(error);
        field.setAttribute('aria-invalid', 'true');
    }

    function clear_error_messages() {
        const errors = document.querySelectorAll('.error_message');
        errors.forEach((error) => error.remove());
        const fields = document.querySelectorAll('[aria-invalid="true"]');
        fields.forEach((field) => {
            field.removeAttribute('aria-invalid');
        });
    }

    function show_toast(message) {
        success_message.innerHTML = message; 
        success_message.style.display = 'block';
        setTimeout(() => {
            success_message.style.display = 'none';
        }, 3000); 
    }
});
