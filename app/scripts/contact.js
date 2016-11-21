// Fonction de désactivation de l'affichage des "tooltips"
function desactivateTooltips() {

    var tooltips = document.querySelectorAll('.tooltip'),
        tooltipsLength = tooltips.length;

    for (var i = 0; i < tooltipsLength; i++) {
        tooltips[i].style.display = 'none';
    }

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

function removeClass(targetClass){

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
        alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','é','è','à','ù','ç','â','ê','î','ô','û','ë','ï','-'],
        cpt = 0,
        tooltipStyle = getTooltip(name).style;

    if (name.value.length >= 2) {

        for(var i = 0; i < name.value.length; i++){
            for(var j = 0; j < alphabet.length; j++){
                if(name.value[i] == alphabet[j] || name.value[i] == " "){
                    cpt++;
                    i++;
                    j = 0;
                }
                if(j+1 == alphabet.length && cpt < i){
                    name.className += ' incorrect';
                    tooltipStyle.display = 'block';
                    return false;
                }
            }
        }

        name.className += ' correct';
        tooltipStyle.display = 'none';
        return true;
    } 
    else {
        name.className += ' incorrect';
        tooltipStyle.display = 'block';
        return false;
    }

};

check['form__email__input'] = function(id) {

    var email = document.getElementById(id),
        tooltipStyle = getTooltip(email).style,
        alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','.','_','-'],
        cpt = 0;
    
    if(email.value == ""){
        email.className += ' incorrect';
        tooltipStyle.display = 'block';
        return false;
    }

    for(var i = 0; i < email.value.length; i++){

        if(email.value[i] == "@"){
            var local_email = email.value.substring(0,i),
                serv_email = email.value.substring(i+1);
            i = email.value.length + 1;
        }
    }

    if(i != email.value.length + 2 || local_email == "" || serv_email == ""){
        email.className += ' incorrect';
        tooltipStyle.display = 'block';
        return false;
    }

    for(var i = 0; i < serv_email.length; i++){
        if(serv_email[i] == "."){
            var domain_email = serv_email.substring(i+1);
            serv_email = serv_email.substring(0,i);
            i = serv_email.length + 1;
        }
    }

    if(i != serv_email.length + 2 || domain_email == ""){
        email.className += ' incorrect';
        tooltipStyle.display = 'block';
        return false;
    }

    if (local_email.length >= 1 && serv_email.length >= 1 && domain_email.length >= 1) {

        for(var i = 0; i < local_email.length; i++){
            for(var j = 0; j < alphabet.length; j++){
                if(local_email[i] == alphabet[j]){
                    cpt++;
                    i++;
                    j = 0;
                }
                if(j+1 == alphabet.length && cpt < i){
                    email.className += ' incorrect';
                    tooltipStyle.display = 'block';
                    return false;
                }
            }
        }

        for(var i = 0; i < serv_email.length; i++){
            for(var j = 0; j < alphabet.length; j++){
                if(serv_email[i] == alphabet[j]){
                    cpt++;
                    i++;
                    j = 0;
                }
                if(j+1 == alphabet.length && cpt < i){
                    email.className += ' incorrect';
                    tooltipStyle.display = 'block';
                    return false;
                }
            }
        }

        for(var i = 0; i < domain_email.length; i++){
            for(var j = 0; j < alphabet.length; j++){
                if(domain_email[i] == alphabet[j]){
                    cpt++;
                    i++;
                    j = 0;
                }
                if(j+1 == alphabet.length && cpt < i){
                    email.className += ' incorrect';
                    tooltipStyle.display = 'block';
                    return false;
                }
            }
        }

        email.className += ' correct';
        tooltipStyle.display = 'none';
        return true;
    } 
    else {
        email.className += ' incorrect';
        tooltipStyle.display = 'block';
        return false;
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
        tooltipStyle.display = 'block';
        return false;
    }

};

// Mise en place des événements

(function() { // Utilisation d'une IIFE pour éviter les variables globales.

    var form__group = document.getElementById('form__group'),
        form__inputs = document.querySelectorAll('input[type=text], input[type=email], textarea'),
        inputsLength = form__inputs.length;

    for (var i = 0; i < inputsLength; i++) {
        form__inputs[i].addEventListener('blur', function(e) {

            removeClass(e.target);

            check[e.target.id](e.target.id); // "e.target" représente l'input actuellement modifié

        });
    }


    form__group.addEventListener('submit', function(e) {
        

        var result = true;

        for (var i in check) {
            result = check[i](i) && result;
        }

        if (result) {
            console.log('Le formulaire est bien rempli.');
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




























