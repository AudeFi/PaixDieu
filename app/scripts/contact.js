if (document.querySelector('.contact_wrapper')) {
    // Fonction de désactivation de l'affichage des "tooltips"
    function desactivateTooltips() {

        var tooltips = document.querySelectorAll('.tooltip'),
            tooltipsLength = tooltips.length;

        for (var i = 0; i < tooltipsLength; i++) {
            tooltips[i].style.display = 'none';
        }

    }
    
    // Fonction de désactivation de l'affichage des "tooltips"
    function activateTooltips__Correct() {

        var tooltips = document.querySelectorAll('.tooltip__correct');

        tooltips[0].style.display = 'inline-block';

    }

    // La fonction ci-dessous permet de récupérer la "tooltip" qui correspond à notre input

    function getTooltip(elements) {

        while (elements = elements.nextSibling) {
            if (elements.className === 'tooltip') {
                return elements;
            }
        }

        return false;

    }

    // la fonction ci-dessous permet de supprimer les classe correct et incorrect

    function removeStatutClass(targetClass){

        for(var i = 0; i < targetClass.classList.length; i++){
            if(targetClass.classList[i] == "incorrect"){
                targetClass.classList.remove('incorrect');
            }
            if(targetClass.classList[i] == "correct"){
                targetClass.classList.remove('correct');
            }
        }


    }

    // Fonctions de vérification du formulaire, elles renvoient "true" si tout est ok

    var check = {}; // On met toutes nos fonctions dans un objet littéral

    check['form__name__input'] = function(id) {

        var name = document.getElementById(id),
            regex = /^[a-zA-Z ]{2,30}$/,
            tooltipStyle = getTooltip(name).style;
        
        if(!regex.test(name.value)){
            name.className += ' incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
        else{
            name.className += ' correct';
            tooltipStyle.display = 'none';
            return true;
        }

    };

    check['form__email__input'] = function(id) {

        var email = document.getElementById(id),
            tooltipStyle = getTooltip(email).style,
            regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
        
        if(!regex.test(email.value)){
            email.className += ' incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
        else{
            email.className += ' correct';
            tooltipStyle.display = 'none';
            return true;
        }
        

    };

    check['form__message__textarea'] = function(id) {

        var message = document.getElementById(id),
            tooltipStyle = getTooltip(message).style;

        if (message.value.length >= 1) {
            message.className += ' correct';
            tooltipStyle.display = 'none';
            return true;
        } 
        else {
            message.className += ' incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }

    };

    // Mise en place des événements

    (function() { // Utilisation d'une IIFE pour éviter les variables globales.

        var form__group = document.getElementById('form__group'),
            form__inputs = document.querySelectorAll('input[type=text], input[type=email], textarea'),
            inputsLength = form__inputs.length;

        for (var i = 0; i < inputsLength; i++) {
            form__inputs[i].addEventListener('keyup', function(e) {

                removeStatutClass(e.target);

                check[e.target.id](e.target.id); // "e.target" représente l'input actuellement modifié

            });
        }


        form__group.addEventListener('submit', function(e) {
            

            var result = true;

            for (var i in check) {
                result = check[i](i) && result;
            }

            if (result) {
                
                activateTooltips__Correct();
                
                window.alert('Le formulaire est bien rempli.');
            }

            e.preventDefault();

        });

        form__group.addEventListener('reset', function() {

            for (var i = 0; i < inputsLength; i++) {

                e.target.classList.remove('incorrect');
                e.target.classList.remove('correct');

            }

            desactivateTooltips();

        });

    })();


    // Maintenant que tout est initialisé, on peut désactiver les "tooltips"

    desactivateTooltips();
}