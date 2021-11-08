$(function () {

    var timebar;
    var tokken = "";
    chrome.storage.sync.get(['key'], function (result) {
        if (result.key != undefined) {
            console.log('Value currently is ' + result.key);
            tokken = result.key;

            //Prendre l'url
            var tab_url_accepte = ["majestic.com", "ahrefs.com", "babbar.tech"];
            var test_url = false;
            //console.log('ici');
            for (var x = 0; x < tab_url_accepte.length; x++) {
                if (window.location.host.includes(tab_url_accepte[x])) {
                    test_url = true;
                    switch (tab_url_accepte[x]) {
                        case "majestic.com":

                            //Indication à l'utilisateur du plugin isindexed
                            var str_contenu = "" +
                                "<div id='isindexed-div'>" +
                                "<div class='isindexed-text'>Envoyer un test d'indexation des 50 backlinks ci-dessous sur isindexed.com en cliquant sur le plugin chrome isindexed. </div>" +
                                "<div class='isindexed-espace-btn'>" +
                                "<button class='btn btn-primary-is mgr-2'><i class='fa fa-retweet' aria-hidden='true'></i> Raffraichir</button>" +
                                "<button class='btn btn-secondary-is mgr-2'><i class='fa fa-search' aria-hidden='true'></i> Revérifier</button>" +
                                "<button class='btn btn-success-is' id='ajouter'><i class='fa fa-plus' aria-hidden='true'></i> Ajouter le projet</button>" +
                                "<div/>" +
                                "</div>";
                            $(str_contenu).insertBefore("#js-main-table");
                            $('div#isindexed-div').css({
                                'background-color': 'white'
                            });

                            var inject_html = '' +
                                ' <div class="row-indexed"> ' +
                                ' 			<!--begin: Item--> ' +
                                ' 			<div class="block-support"> ' +
                                ' 				<div class="block-fav fa-black"><i class="fa fa-bars" aria-hidden="true"></i></div>' +
                                ' 				<div class="block-text"> ' +
                                ' 					<span class="font-weight-bolder font-size-sm">Tous les liens</span> ' +
                                '                   <span class="font-weight-bolder font-size-h5">50 </span> ' +
                                ' 				</div> ' +
                                ' 			</div> ' +
                                ' 			<!--end: Item--> ' +
                                ' 			<!--begin: Item--> ' +
                                ' 			<div class="block-support"> ' +
                                ' 				<div class="block-fav fa-green"><i class="fa fa-check" aria-hidden="true"></i></div>' +
                                ' 				<div class="block-text"> ' +
                                ' 					<span class="font-weight-bolder font-size-sm">Indexés</span> ' +
                                '                   <span class="font-weight-bolder font-size-h5" ><span id="nb_indexed">45</span> (<span id="pour_nb_indexed">90.00</span>%) </span> ' +
                                ' 				</div> ' +
                                ' 			</div> ' +
                                ' 			<!--end: Item--> ' +
                                ' 			<!--begin: Item--> ' +
                                ' 			<div class="block-support"> ' +
                                ' 				<div class="block-fav fa-red"><i class="fa fa-times" aria-hidden="true"></i></div>' +
                                ' 				<div class="block-text"> ' +
                                ' 					<span class="font-weight-bolder font-size-sm">Non indexés</span> ' +
                                '                   <span class="font-weight-bolder font-size-h5"><span id="nb_non_indexed">5</span> (<span id="pour_nb_non_indexed">10.00</span>%)</span> ' +
                                ' 				</div> ' +
                                ' 			</div> ' +
                                ' 			<!--end: Item--> ' +
                                ' 			<!--begin: Item--> ' +
                                ' 			<div class="block-support"> ' +
                                ' 				<div class="block-fav fa-yellow"><i class="fa fa-clock-o" aria-hidden="true"></i></div>' +
                                ' 				<div class="block-text"> ' +
                                ' 					<span class="font-weight-bolder font-size-sm">En attente</span> ' +
                                '                   <span class="font-weight-bolder font-size-h5"><span id="nb_attente">0</span> (<span id="pour_nb_attente">0.00</span>%) </span> ' +
                                ' 				</div> ' +
                                ' 			</div> ' +
                                ' 			<!--end: Item--> ' +
                                ' 			<!--begin: Item--> ' +
                                ' 			<div class="block-support-2"> ' +
                                ' 				<div id="fav-load" class="block-fav-2 fa-dark"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i></div>' +
                                ' 				<div class="block-text-2"> ' +
                                ' 					<div class="wrapperTimer"></div> ' +
                                ' 				</div> ' +
                                '               <div class="font-weight-bolder font-size-h5 block-progress"><span id="affichage-pourcentage-avancement">0</span>%</span> ' +
                                ' 			</div> ' +
                                ' 			<!--end: Item--> ' +
                                ' 		</div> ';
                            // fa-spinner qui ne tourne pas
                            // 				<div class="block-fav fa-dark"><i class="fa fa-spinner" aria-hidden="true"></i></div>
                            // fa-spinner qui troune
                            // 				<div id="fav-load" class="block-fav-2 fa-dark"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i></div>
                            //$('<i class="fa fa-check" aria-hidden="true"></i>').insertBefore("#js-main-table");
                            $(inject_html).insertBefore("#js-main-table");


                            // options
                            var optionsTimer = {
                                color: "#09b1ba", // color of the Progress bar. 
                                bgColor: "#efefef", // color background of the Progress bar
                                speed: 0.3, // speed of animation. ( unit in secondes )
                                wrapper: ".wrapperTimer", // the wrapper who append ProBar. if use class => ".class" ,if use id => "#id" 
                                finishAnimation: false, // default "true", this option give you a animation at the end "100%".
                                classNameBar: "timer",
                                wrapperId: "wrapperTimerId"
                            };
                            timebar = new ProBar(optionsTimer);

                            var nb_indexed = 0;
                            var nb_non_indexed = 0;
                            var nb_attente = 0;

                            var nb_total = 0;

                            //console.log(window.location.host);
                            var recherche = $('#search_text').val();
                            if (Cookies.get(recherche + '_' + document.getElementById('js-main-table').getElementsByClassName('currentPage')[0].innerText)) {
                                var datas_json = JSON.parse(Cookies.get(recherche + '_' + document.getElementById('js-main-table').getElementsByClassName('currentPage')[0].innerText));
                                //console.log(datas_json);

                                //Réaffichage selon cookie
                                //DOM sur le site
                                var tab_link = [];
                                var vue_backlinks_table = document.getElementById('vue-backlinks-table');
                                var tr = vue_backlinks_table.getElementsByTagName('tr');

                                //console.log(tr);
                                for (let index = 2; index < tr.length; index++) {
                                    var apa = parseInt(index * 100 / (tr.length - 1));
                                    $('#affichage-pourcentage-avancement').text(apa);
                                    timebar.goto(apa);
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
                                                        nb_total++;
                                                        switch (datas_json[a].s) {
                                                            case "0":
                                                                supprimerElementsByClass(linkType, 'indexe-supprimer');
                                                                linkType.innerHTML += '<span class="indexe-supprimer indexe-blanc link-type-button">En attente</span>';
                                                                nb_attente++;
                                                                break;
                                                            case "1":
                                                                supprimerElementsByClass(linkType, 'indexe-supprimer');
                                                                linkType.innerHTML += '<span class="indexe-supprimer indexe-vert link-type-button">Indexé</span>';
                                                                nb_indexed++;
                                                                break;
                                                            case "2":
                                                                supprimerElementsByClass(linkType, 'indexe-supprimer');
                                                                linkType.innerHTML += '<span class="indexe-supprimer indexe-rouge link-type-button">Non indexé</span>';
                                                                nb_non_indexed++;
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
                            } else {
                                //Voir si le projet existe
                                //https://tool.isindexed.com/api/v1/project/exits
                                voirSiProjetExiste(tokken);
                            }

                            nb_total = nb_indexed + nb_non_indexed + nb_attente;

                            //Réaffichage des données
                            $('#nb_indexed').text(nb_indexed);
                            $('#nb_non_indexed').text(nb_non_indexed);
                            $('#nb_attente').text(nb_attente);

                            if (nb_total > 0) {
                                $('#pour_nb_indexed').text((nb_indexed * 100) / nb_total);
                                $('#pour_nb_non_indexed').text((nb_non_indexed * 100) / nb_total);
                                $('#pour_nb_attente').text((nb_attente * 100) / nb_total);
                            } else {
                                $('#pour_nb_indexed').text(0);
                                $('#pour_nb_non_indexed').text(0);
                                $('#pour_nb_attente').text(0);
                            }

                            $('#fav-load').empty();
                            $('#fav-load').append('<i class="fa fa-spinner" aria-hidden="true"></i>');
                            $("#fav-load").attr('class', 'block-fav fa-dark');

                            console.log('nb_indexed');
                            // console.log('Value currently is ' + tokken);
                            break;
                        case "ahrefs.com":
                            //Indication à l'utilisateur du plugin isindexed
                            $("<div id='isindexed-div'><p>Envoyer un test d'indexation des 50 backlinks ci-dessous sur </p><p>isindexed.com en cliquant sur le plugin chrome isindexed. </p></div>").insertBefore(".css-r906xz-header");
                            $('div#isindexed-div').css({
                                'background-color': '#4f81bd'
                            });
                            break;
                        case "babbar.tech":
                            //Indication à l'utilisateur du plugin isindexed
                            $("<div id='isindexed-div'><p>Envoyer un test d'indexation des backlinks ci-dessous sur </p><p>isindexed.com en cliquant sur le plugin chrome isindexed. </p></div>").insertBefore(".table-centered");
                            $('div#isindexed-div').css({
                                'background-color': '#4f81bd'
                            });
                            break;
                    }
                }
            }
        } else {
            alert('Veuillez saisir votre clé API sur le plugin Isindexed!');
        }
    });
    //fonction
    function supprimerElementsByClass(elementRecherche, classeasupprimer) {
        var col_wrapper = elementRecherche.getElementsByClassName(classeasupprimer);
        var len = col_wrapper.length;
        for (var i = 0; i < len; i++) {
            col_wrapper[i].remove();
        }
    }

    function voirSiProjetExiste(tokken) {
        console.log('voirSiProjetExiste');
        // var dataSend = {
        //     project_name: window.location.host + " - " + $('#search_text').val(),
        // };

        var dataSend = { "vide": "vide" };

        var dataObj = {
            url: 'https://tool.isindexed.com/api/v1/project/list',
            authorization: tokken,
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
                    console.log(json);

                    //Affichage des données
                    //collecteIsIndexed(json.id, config.tokken);
                    for (let index = 0; index < json.projects.length; index++) {
                        //const element = array[index];
                        var nom_projet = window.location.host + " - " + $('#search_text').val();
                        if (json.projects[index].name == nom_projet) {
                            console.log(json.projects[index]);
                            //Affichage des données
                            collecteIsIndexed(json.projects[index].id, tokken);
                        }
                    }
                } catch (e) {
                    console.log('erreur');
                    //Indication
                    // $('div#isindexed-div').remove();
                    // $("<div id='isindexed-div'><p>En attente de la fin du projet sur isindexed.com. </p><p>Nouvelle tentative de récupération des résutats dans 5s!</p></div>").insertBefore("#js-main-table");
                    // $('div#isindexed-div').css({
                    //     'background-color': '#c82e2e'
                    // });
                    // //Supprimer le message après 5s
                    // setTimeout(function () {
                    //     $('div#isindexed-div').remove();
                    //     ajoutDesUrls(tab_link);
                    // }, 5000);
                }

            },
            error: function () {
                //alert("Cannot get data");
            }
        });
    }

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

    function ajoutDesUrls(tab_link) {
        //console.log(tab_link);
        //Envoye de la requête
        if (tab_link.length > 0) {
            //Indication
            $('#fav-load').empty();
            $('#fav-load').append('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
            $("#fav-load").attr('class', 'block-fav-2 fa-dark');

            var tab_urls = [];
            for (var index = 0; index < tab_link.length; index++) {
                tab_urls.push(tab_link[index]);
            }
            var dataSend = {
                project_name: window.location.host + " - " + $('#search_text').val(),
                urls: tab_urls
            };
            var dataObj = {
                url: 'https://tool.isindexed.com/api/v1/project/add',
                authorization: tokken,
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
                        collecteIsIndexed(json.id, tokken);
                    } catch (e) {
                        //Indication
                        $('#fav-load').empty();
                        $('#fav-load').append('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
                        $("#fav-load").attr('class', 'block-fav-2 fa-dark');
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

        //Indication
        $('#fav-load').empty();
        $('#fav-load').append('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
        $("#fav-load").attr('class', 'block-fav-2 fa-dark');
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

                    //Injecter la réponse dans la page
                    restructurationDuDom(json, id_projet, tokken);

                } catch (e) {
                    //Refaire après 5 seconds
                    //Indication
                    $('#fav-load').empty();
                    $('#fav-load').append('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
                    $("#fav-load").attr('class', 'block-fav-2 fa-dark');
                    //Supprimer le message après 5s
                    setTimeout(function () {
                        collecteIsIndexed(id_projet, tokken);
                    }, 5000);

                }

            },
            error: function () {
                //alert("Cannot get data");
            }
        });
    }

    function supprimerElementsByClass(elementRecherche, classeasupprimer) {
        //console.log('ici');
        var col_wrapper = elementRecherche.getElementsByClassName(classeasupprimer);
        var len = col_wrapper.length;
        for (var i = 0; i < len; i++) {
            col_wrapper[i].remove();
        }
    }

    function restructurationDuDom(json, id_projet, tokken) {
        //Supprimer div s'il existe
        $('#fav-load').empty();
        $('#fav-load').append('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
        $("#fav-load").attr('class', 'block-fav-2 fa-dark');


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

        var nb_indexed = 0;
        var nb_non_indexed = 0;
        var nb_attente = 0;

        var nb_total = 0;

        var tab_co = [];
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
                                nb_total++;
                                switch (tab_reponse[a].status) {
                                    case "0":
                                        supprimerElementsByClass(linkType, 'indexe-supprimer');
                                        linkType.innerHTML += '<span class="indexe-supprimer indexe-blanc link-type-button">En attente</span>';
                                        pasFini = true;
                                        nb_attente++;
                                        break;
                                    case "1":
                                        supprimerElementsByClass(linkType, 'indexe-supprimer');
                                        linkType.innerHTML += '<span class="indexe-supprimer indexe-vert link-type-button">Indexé</span>';
                                        total_fini++;
                                        total_indexe++;
                                        nb_indexed++;
                                        break;
                                    case "2":
                                        supprimerElementsByClass(linkType, 'indexe-supprimer');
                                        linkType.innerHTML += '<span class="indexe-supprimer indexe-rouge link-type-button">Non indexé</span>';
                                        total_fini++;
                                        total_non_indexe++;
                                        nb_non_indexed++
                                        break;
                                    default:
                                        break;
                                }
                                tab_co.push({ u: index, s: tab_reponse[a].status });
                            } else {
                                supprimerElementsByClass(linkType, 'indexe-supprimer');
                                var linkType = textCell.getElementsByClassName('linkType')[1];

                                //Effacer le contenu
                                //linkType.innerHTML = "";
                                linkType.innerHTML += '<span class="indexe-supprimer indexe-blanc link-type-button">Pas disponnible</span>';
                            }
                        }
                    }
                    //Réaffichage des données
                    $('#nb_indexed').text(nb_indexed);
                    $('#nb_non_indexed').text(nb_non_indexed);
                    $('#nb_attente').text(nb_attente);

                    if (nb_total > 0) {
                        $('#pour_nb_indexed').text((nb_indexed * 100) / nb_total);
                        $('#pour_nb_non_indexed').text((nb_non_indexed * 100) / nb_total);
                        $('#pour_nb_attente').text((nb_attente * 100) / nb_total);

                        //Progres bar
                        var apa = 100 - (nb_attente * 100) / nb_total;
                        timebar.goto(apa);
                        $('#affichage-pourcentage-avancement').text(apa);

                    } else {
                        $('#pour_nb_indexed').text(0);
                        $('#pour_nb_non_indexed').text(0);
                        $('#pour_nb_attente').text(0);
                        timebar.goto(100);
                        $('#affichage-pourcentage-avancement').text(100);
                    }

                    
                }
            }
        }
        if (pasFini == true) {
            //Cookies.set('nampoina', 'miora');
            //Si c'est pas encore fini alors il faut revoir la liste
            //Indication
            $('#fav-load').empty();
            $('#fav-load').append('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
            $("#fav-load").attr('class', 'block-fav-2 fa-dark');

            setTimeout(function () {
                pasFini = false;
                $('#fav-load').empty();
                $('#fav-load').append('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
                $("#fav-load").attr('class', 'block-fav-2 fa-dark');
                collecteIsIndexed(id_projet, tokken);
            }, 10000);
        } else {
            //Indication
            $('#fav-load').empty();
            $('#fav-load').append('<i class="fa fa-spinner" aria-hidden="true"></i>');
            $("#fav-load").attr('class', 'block-fav fa-dark');

            //console.log('ici');

            //Enregistrement du coockies         
            var url_rechercher = $('#search_text').val();
            var to_store = JSON.stringify(tab_co);
            if (to_store != "[]")
                Cookies.set(url_rechercher + '_' + document.getElementById('js-main-table').getElementsByClassName('currentPage')[0].innerText, to_store, { expires: 2 }); //2 jours
        }
    }

    function pad2(n) { return n < 10 ? '0' + n : n }
    //Event
    $(document).on('click', '#ajouter', function (e) {

        //Fin fonction
        var tab_link = recuperationDesLiens();

        ajoutDesUrls(tab_link);

    });

})