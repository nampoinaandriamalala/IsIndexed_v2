$(function () {

    //Supprimer div s'il existe
    if ($('#isindexed-div').length) {
        $('#isindexed-div').remove();
    }

    //Indication
    $("<div id='isindexed-div'>Toute la liste a été vérifiée!</div>").insertBefore("#js-main-table");
    $('div#isindexed-div').css({
        'background-color': '#29b0039e'
    });
    console.log(config);
    //Tableau réponse
    var tab_reponse = config.datas.urls;
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
                console.log(lien_dom);
                for (var a = 0; a < tab_reponse.length; a++) {
                    var lien_reponse = tab_reponse[a].url;
                    if (lien_dom.toLowerCase() == lien_reponse.toLowerCase().replaceAll('&amp;','&')) {
                        //Ajout de l'indication
                        console.log(tab_reponse[a]);
                        if (tab_reponse[a] != undefined) {
                            var linkType = textCell.getElementsByClassName('linkType')[1];
                            
                            //Effacer le contenu
                            linkType.innerHTML = "";

                            switch (tab_reponse[a].status) {
                                case "0":
                                    linkType.insertAdjacentHTML('beforeend', '<span class="indexe-supprimer indexe-blanc link-type-button">En attente</span>');
                                    break;
                                case "1":
                                    linkType.insertAdjacentHTML('beforeend', '<span class="indexe-supprimer indexe-vert link-type-button">Indexé</span>');
                                    break;
                                case "2":
                                    linkType.insertAdjacentHTML('beforeend', '<span class="indexe-supprimer indexe-rouge link-type-button">Non indexé</span>');
                                    break;
                                default:
                                    break;
                            }

                        } else {
                            var linkType = textCell.getElementsByClassName('linkType')[1];
                            
                            //Effacer le contenu
                            linkType.innerHTML = "";
                            linkType.insertAdjacentHTML('beforeend', '<span class="indexe-supprimer indexe-blanc link-type-button">Pas disponnible</span>');
                        }
                    }
                }
            }
        }
    }
    console.log(tab_link);
})