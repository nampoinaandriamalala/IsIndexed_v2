$(function () {

    var total = 0;
    var total_indexe = 0;
    var total_non_indexe = 0;
    //Supprimer div s'il existe
    if ($('#isindexed-div').length) {
        $('#isindexed-div').remove();
    }

    //Indication
    $("<div id='isindexed-div'>Collecte des URLs ... </div>").insertBefore("#js-main-table");
    $('div#isindexed-div').css({
        'background-color': '#4f81bd'
    });

    //console.log(config);


    //Début fonction
    function recuperationDesLiens() {
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
                    //console.log(liens[0].href);
                    tab_link.push(liens[0].href);
                }
            }
        }
        return tab_link;
    }

    function datenow() {
        var date = new Date();
        var sortie = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
        return sortie;
    }
    function pad2(n) { return n < 10 ? '0' + n : n }
    //Fin fonction

    var tab_link = recuperationDesLiens();

    function ajoutDesUrls(tab_link) {
        //console.log(tab_link);
        //Envoye de la requête
        if (tab_link.length > 0) {
            //Indication
            $('div#isindexed-div').remove();
            $("<div id='isindexed-div'><p>Envoie des urls (backlinks) pour vérification</p><p>des indexations sur isindexed.com</p></div>").insertBefore("#js-main-table");
            $('div#isindexed-div').css({
                'background-color': '#fc0'
            });

            var tab_urls = [];
            for (var index = 0; index < tab_link.length; index++) {
                tab_urls.push(tab_link[index]);
            }
            var dataSend = {
                project_name: window.location.host + " - " + $('#search_text').val() + " - " + datenow(),
                urls: tab_urls
            };
            var dataObj = {
                url: 'https://tool.isindexed.com/api/v1/project/add',
                authorization: config.tokken,
                data: JSON.stringify(dataSend)
            }
            // console.log(dataObj);
            // exit();
            $.ajax({
                url: "https://captureserp.com/isindexed/action.php",
                type: "POST",
                dataType: "json",
                data: $.param(dataObj),
                success: function (data) {
                    // var json = $.parseJSON(data);
                    // console.log(json);            
                    try {
                        var json = JSON.parse(data);
                        //console.log(json);

                        //Affichage des données
                        collecteIsIndexed(json.id, config.tokken);
                    } catch (e) {
                        //Indication
                        $('div#isindexed-div').remove();
                        $("<div id='isindexed-div'><p>En attente de la fin du projet sur isindexed.com. </p><p>Nouvelle tentative de récupération des résutats dans 5s!</p></div>").insertBefore("#js-main-table");
                        $('div#isindexed-div').css({
                            'background-color': '#c82e2e'
                        });
                        //Supprimer le message après 5s
                        setTimeout(function () {
                            $('div#isindexed-div').remove();
                            ajoutDesUrls(tab_link);
                        }, 5000);
                    }

                },
                error: function () {
                    //alert("Cannot get data");
                }
            });
        } else {
            //Supprimer le message après 10s
            //Indication
            $('div#isindexed-div').remove();
            $("<div id='isindexed-div'>Nous n\'avons pas trouvé de lien!</div>").insertBefore("#js-main-table");
            $('div#isindexed-div').css({
                'background-color': '#c82e2e'
            });
            setTimeout(function () {
                $('div#isindexed-div').remove();
                ajoutDesUrls(tab_link);
            }, 10000);
        }
    }

    function collecteIsIndexed(id_projet, tokken) {
        //Supprimer div s'il existe
        if ($('#isindexed-div').length) {
            $('#isindexed-div').remove();
        }
        //Indication
        $("<div id='isindexed-div'>Collecte traitement... </div>").insertBefore("#js-main-table");
        $('div#isindexed-div').css({
            'background-color': '#fc0'
        });
        //Post
        var dataSend = { "vide": "vide" };
        var dataObj = {
            url: 'https://tool.isindexed.com/api/v1/project/' + id_projet,
            authorization: tokken,
            data: JSON.stringify(dataSend)
        }
        $.ajax({
            url: "https://captureserp.com/isindexed/action.php",
            type: "POST",
            dataType: "json",
            data: $.param(dataObj),
            success: function (data) {
                //var json = $.parseJSON(data);
                //console.log(data);
                try {
                    var json = JSON.parse(data);
                    //console.log(json);
                    if ($('#isindexed-div').length) {
                        $('#isindexed-div').remove();
                    }

                    //Injecter la réponse dans la page
                    restructurationDuDom(json, id_projet, tokken);

                } catch (e) {
                    //Refaire après 5 seconds
                    //Indication
                    $('div#isindexed-div').remove();
                    $("<div id='isindexed-div'><p>En attente de la fin du projet sur isindexed.com. </p><p>Nouvelle tentative de récupération des résutats dans 5s!</p></div>").insertBefore("#js-main-table");
                    $('div#isindexed-div').css({
                        'background-color': '#c82e2e'
                    });
                    //Supprimer le message après 5s
                    setTimeout(function () {
                        $('div#isindexed-div').remove();
                        collecteIsIndexed(id_projet, tokken);
                    }, 5000);

                }

            },
            error: function () {
                //alert("Cannot get data");
            }
        });
    }

    function supprimerElementsByClass(elementRecherche,classeasupprimer)
    {
        //console.log('ici');
        var col_wrapper = elementRecherche.getElementsByClassName(classeasupprimer);
        var len = col_wrapper.length;                                        
        for (var i = 0; i < len; i++) {                                
                col_wrapper[i].remove();                                            
        }
    }
    function restructurationDuDom(json, id_projet, tokken) {
        //Supprimer div s'il existe
        if ($('#isindexed-div').length) {
            $('#isindexed-div').remove();
        }


        //console.log(json);
        //Tableau réponse
        var tab_reponse = json.urls;
        //DOM sur le site
        var tab_link = [];
        var vue_backlinks_table = document.getElementById('vue-backlinks-table');
        var tr = vue_backlinks_table.getElementsByTagName('tr');

        var pasFini = false;    //Si c'est pas encore fini alors faire une requête après 5s
        total = tab_reponse.length;
        var total_fini = 0;


        total_indexe = 0;
        total_non_indexe = 0;

        var tab_co = [] ;
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


                    for (var a = 0; a < tab_reponse.length; a++) {
                        var lien_reponse = tab_reponse[a].url;
                        if (lien_dom.toLowerCase() == lien_reponse.toLowerCase().replaceAll('&amp;', '&')) {
                            //Ajout de l'indication
                            //gitconsole.log(tab_reponse[a]);
                            if (tab_reponse[a] != undefined) {
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
                                            // if(textCell.getElementsByClassName('linkType').length >= 3)
                                            // {
                                            //     for (var c = 2; index < textCell.getElementsByClassName('linkType').length; index++) {
                                            //         //Effacer le contenu des autres
                                            //         textCell.getElementsByClassName('linkType')[c].innerHTML = "";                                                  
                                            //     }
                                            // }
                                            break;
                                    }
                                    
                                }

                                //Effacer le contenu
                                //linkType.innerHTML = "";

                                switch (tab_reponse[a].status) {
                                    case "0":
                                        supprimerElementsByClass(linkType,'indexe-supprimer');
                                        linkType.innerHTML += '<span class="indexe-supprimer indexe-blanc link-type-button">En attente</span>';
                                        pasFini = true;
                                        break;
                                    case "1":
                                        supprimerElementsByClass(linkType,'indexe-supprimer');
                                        linkType.innerHTML += '<span class="indexe-supprimer indexe-vert link-type-button">Indexé</span>';
                                        total_fini++;
                                        total_indexe++;
                                        break;
                                    case "2":
                                        supprimerElementsByClass(linkType,'indexe-supprimer');
                                        linkType.innerHTML += '<span class="indexe-supprimer indexe-rouge link-type-button">Non indexé</span>';
                                        total_fini++;
                                        total_non_indexe++;
                                        break;
                                    default:
                                        break;
                                }
                                tab_co.push({u:index,s:tab_reponse[a].status});
                            } else {
                                supprimerElementsByClass(linkType,'indexe-supprimer');
                                var linkType = textCell.getElementsByClassName('linkType')[1];

                                //Effacer le contenu
                                //linkType.innerHTML = "";
                                linkType.innerHTML +='<span class="indexe-supprimer indexe-blanc link-type-button">Pas disponnible</span>';
                            }
                        }
                    }
                }
            }
        }
        if (pasFini == true) {
            //Cookies.set('nampoina', 'miora');
            //Si c'est pas encore fini alors il faut revoir la liste
            //Indication
            $('div#isindexed-div').remove();
            $("<div id='isindexed-div'>Demande encours de traitement [" + total_encours + "/" + total + "]!</div>").insertBefore("#js-main-table");
            $('div#isindexed-div').css({
                'background-color': '#caccce'
            });

            setTimeout(function () {
                pasFini = false;
                $('div#isindexed-div').remove();
                collecteIsIndexed(id_projet, tokken);
            }, 10000);
        } else {
            //Indication
            $('div#isindexed-div').remove();
            $("<div id='isindexed-div'><p>Toute la liste a été vérifiée!</p><p>Nombre total de backlinks testés : "+total+"</p><p>Nombre total de backlinks indexés : "+total_indexe+"</p><p>Nombre total de backlinks non indexé : "+total_non_indexe+"</p></div>").insertBefore("#js-main-table");
            $('div#isindexed-div').css({
                'background-color': '#29b0039e'
            });

            //console.log('ici');

            //Enregistrement du coockies         
            var url_rechercher = $('#search_text').val();
            var to_store = JSON.stringify(tab_co);
            Cookies.set(url_rechercher, to_store);
        }
    }
    ajoutDesUrls(tab_link);

});