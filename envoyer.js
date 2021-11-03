$(function () {



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
                    //https://tool.isindexed.com/assets/plugins/global/plugins.bundle.css
                    var inject_html = '' +
                        ' <div class="d-flex align-items-center flex-wrap"> ' +
                        ' 			<!--begin: Item--> ' +
                        ' 			<div id="kt_datatable_search_status_all" class="d-flex align-items-center flex-lg-fill mr-5 my-1 datatable-selector datatable-selector-selected"> ' +
                        ' 				<span class="mr-4"> <i class="flaticon-list-3 icon-2x text-muted font-weight-bold"></i> ' +
                        ' 				</span> ' +
                        ' 				<div class="d-flex flex-column text-dark-75"> ' +
                        ' 					<span class="font-weight-bolder font-size-sm">Tous les liens</span> <span class="font-weight-bolder font-size-h5">50 </span> ' +
                        ' 				</div> ' +
                        ' 			</div> ' +
                        ' 			<!--end: Item--> ' +
                        ' 			<!--begin: Item--> ' +
                        ' 			<div id="kt_datatable_search_status_indexed" class="d-flex align-items-center flex-lg-fill mr-5 my-1 datatable-selector"> ' +
                        ' 				<span class="mr-4"> <i class="flaticon2-check-mark text-success icon-2x font-weight-bold"></i> ' +
                        ' 				</span> ' +
                        ' 				<div class="d-flex flex-column text-dark-75"> ' +
                        ' 					<span class="font-weight-bolder font-size-sm">Indexés</span> <span class="font-weight-bolder font-size-h5">45 (90.00%)</span> ' +
                        ' 				</div> ' +
                        ' 			</div> ' +
                        ' 			<!--end: Item--> ' +
                        ' 			<!--begin: Item--> ' +
                        ' 			<div id="kt_datatable_search_status_nonindexed" class="d-flex align-items-center flex-lg-fill mr-5 my-1 datatable-selector"> ' +
                        ' 				<span class="mr-4"> <i class="flaticon2-cancel-music text-danger icon-2x font-weight-bold"></i> ' +
                        ' 				</span> ' +
                        ' 				<div class="d-flex flex-column text-dark-75"> ' +
                        ' 					<span class="font-weight-bolder font-size-sm">Non indexés</span> <span class="font-weight-bolder font-size-h5">5 (10.00%)</span> ' +
                        ' 				</div> ' +
                        ' 			</div> ' +
                        ' 			<!--end: Item--> ' +
                        ' 			<!--begin: Item--> ' +
                        ' 			<div id="kt_datatable_search_status_pending" class="d-flex align-items-center flex-lg-fill mr-5 my-1 datatable-selector"> ' +
                        ' 				<span class="mr-4"> <i class="flaticon2-sort-down text-warning icon-2x font-weight-bold"></i> ' +
                        ' 				</span> ' +
                        ' 				<div class="d-flex flex-column text-dark-75"> ' +
                        ' 					<span class="font-weight-bolder font-size-sm">En attente</span> <span class="font-weight-bolder font-size-h5">0 (0.00%)</span> ' +
                        ' 				</div> ' +
                        ' 			</div> ' +
                        ' 			<!--end: Item--> ' +
                        ' 			<!--begin: Item--> ' +
                        ' 			<div class="d-flex align-items-center flex-lg-fill mr-5 my-1"> ' +
                        ' 				<span class="mr-4 svg-icon-md"> ' +
                        ' 					    					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="margin-right:-2px;display:block;background-repeat-y:initial;background-repeat-x:initial;background-color:rgb(255, 255, 255);animation-play-state:paused"><g style="animation-play-state:paused"><circle cx="94.74272155761719" cy="50" r="4" fill="#e15b64" fill-opacity="0.02144" style="animation-play-state:paused"></circle> ' +
                        '                             <circle cx="94.87328338623047" cy="50" r="4" fill="#e15b64" fill-opacity="0.01056" style="animation-play-state:paused"></circle> ' +
                        '                             <circle cx="95" cy="50" r="4" fill="#e15b64" fill-opacity="0" style="animation-play-state:paused"></circle></g> ' +
                        '                             <g transform="translate(-15 0)" style="transform:matrix(1, 0, 0, 1, -15, 0);animation-play-state:paused"><path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#24aa3d" transform="rotate(90 50 50)" style="transform:matrix(6.12323e-17, 1, -1, 6.12323e-17, 100, 0);animation-play-state:paused"></path> ' +
                        '                             <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#24aa3d" transform="matrix(1,0,0,1,0,0)" style="transform:matrix(1, 0, 0, 1, 0, 0);animation-play-state:paused"></path>   ' +
                        '                             <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#24aa3d" transform="matrix(1,0,0,1,0,0)" style="transform:matrix(1, 0, 0, 1, 0, 0);animation-play-state:paused"></path></g> ' +
                        '                         </svg> ' +
                        ' 									</span> ' +
                        ' 				<div class="d-flex flex-column text-dark-75"> ' +
                        ' 					<!--begin::Progress--> ' +
                        ' 					<div class="d-flex mt-4 mt-sm-0"> ' +
                        ' 						<span class="font-weight-bold mr-4">Achèvement</span> ' +
                        ' 						<div class="progress progress-xs mt-2 mb-2 flex-shrink-0 w-150px w-xl-250px"> ' +
                        ' 							<div class="progress-bar bg-success" role="progressbar" style="width: 100.00%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div> ' +
                        ' 						</div> ' +
                        ' 						<span class="font-weight-bolder text-dark ml-4">100.00%</span> ' +
                        ' 					</div> ' +
                        ' 					<!--end::Progress--> ' +
                        ' 				</div> ' +
                        ' 			</div> ' +
                        ' 			<!--end: Item--> ' +
                        ' 		</div> ';
                    //$('<i class="fa fa-check" aria-hidden="true"></i>').insertBefore("#js-main-table");
                    $(inject_html).insertBefore("#js-main-table");
                    inject_html

                    $("<div id='isindexed-div'><p>Envoyer un test d'indexation des 50 backlinks ci-dessous sur </p><p>isindexed.com en cliquant sur le plugin chrome isindexed. </p></div>").insertBefore("#js-main-table");
                    $("<div id='isindexed-div'><p>Envoyer un test d'indexation des 50 backlinks ci-dessous sur </p><p>isindexed.com en cliquant sur le plugin chrome isindexed. </p></div>").insertBefore("#js-main-table");
                    $('div#isindexed-div').css({
                        'background-color': '#4f81bd'
                    });

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

    //fonction
    function supprimerElementsByClass(elementRecherche, classeasupprimer) {
        var col_wrapper = elementRecherche.getElementsByClassName(classeasupprimer);
        var len = col_wrapper.length;
        for (var i = 0; i < len; i++) {
            col_wrapper[i].remove();
        }
    }

})