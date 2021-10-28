$(function () {

    //Indication à l'utilisateur du plugin isindexed
    $("<div id='isindexed-div'><p>Envoyer un test d'indexation des 50 backlinks ci-dessous sur </p><p>isindexed.com en cliquant sur le plugin chrome isindexed. </p></div>").insertBefore("#js-main-table");
    $('div#isindexed-div').css({
        'background-color': '#4f81bd'
    });

    //Prendre l'url
    var tab_url_accepte = ["majestic.com", "ahrefs.com", "babbar.tech"];
    var test_url = false;
    for (var x = 0; x < tab_url_accepte.length; x++) {
        if (window.location.host.includes(tab_url_accepte[x])) {
            test_url = true;
            switch (tab_url_accepte[x]) {
                case "majestic.com":
                    //console.log(window.location.host);
                    var recherche = $('#search_text').val();
                    if (Cookies.get(recherche)) {
                        var datas_json = JSON.parse(Cookies.get(recherche));
                        //console.log(datas_json);


                        //Réaffichage selon cookie
                        //DOM sur le site
                        var tab_link = [];
                        var vue_backlinks_table = document.getElementById('vue-backlinks-table');
                        var tr = vue_backlinks_table.getElementsByTagName('tr');

                        //console.log(tr);
                        for (let index = 2; index < tr.length; index++) {
                            const element = tr[index];

                            if (element.getElementsByClassName('textCell').length > 0) {
                                var textCell = element.getElementsByClassName('textCell')[0];
                                var liens = textCell.getElementsByTagName('a');
                                if (liens.length > 0) {

                                    tab_link.push(liens[0].href);
                                    var lien_dom = liens[0].href;
                                    //console.log(lien_dom);


                                    for (var a = 0; a < datas_json.length; a++) {
                                        
                                        if (index == datas_json[a].u) {
                                            //Ajout de l'indication
                                            if (datas_json[a] != undefined) {
                                                
                                                //Selection de l'element
                                                var linkType = null;
                                                if (textCell.getElementsByClassName('linkType').length > 0) {
                                                    switch (textCell.getElementsByClassName('linkType').length) {
                                                        case 1:
                                                            linkType = textCell.getElementsByClassName('linkType')[0];
                                                            break;
                                                        case 0:
                                                            continue;
                                                            break;

                                                        default:
                                                            linkType = textCell.getElementsByClassName('linkType')[1];
                                                            break;
                                                    }
                                                }

                                                //Afficher les indications selon l'ordre de l'enregistrement
                                                switch (datas_json[a].s) {
                                                    case "0":
                                                        supprimerElementsByClass(linkType, 'indexe-supprimer');
                                                        linkType.innerHTML += '<span class="indexe-supprimer indexe-blanc link-type-button">En attente</span>';
                                                        break;
                                                    case "1":
                                                        supprimerElementsByClass(linkType, 'indexe-supprimer');
                                                        linkType.innerHTML += '<span class="indexe-supprimer indexe-vert link-type-button">Indexé</span>';
                                                        break;
                                                    case "2":
                                                        supprimerElementsByClass(linkType, 'indexe-supprimer');
                                                        linkType.innerHTML += '<span class="indexe-supprimer indexe-rouge link-type-button">Non indexé</span>';
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            } 
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "ahrefs.com":
                    console.log()
                    break;
                case "babbar.tech":

                    break;
            }
        }
    }

    //fonction
    function supprimerElementsByClass(elementRecherche,classeasupprimer)
    {
        var col_wrapper = elementRecherche.getElementsByClassName(classeasupprimer);
        var len = col_wrapper.length;                                        
        for (var i = 0; i < len; i++) {                                
                col_wrapper[i].remove();                                            
        }
    }

})