$(function () {

    //Ajout modal
    var modal = "" +
        " <!-- The Modal --> " +
        " <div id=\"myModal\" class=\"modal\"> " +
        "  " +
        "   <!-- Modal content --> " +
        "   <div class=\"modal-content\"> " +
        "     <span class=\"close\">&times;</span> " +
        "     <div id=\"ajout_image_si_besoin\">Some text in the Modal..</div> " +
        "   </div> " +
        "  " +
        " </div> ";
    var body = document.getElementsByTagName('body')[0];
    body.innerHTML += modal;



    //var tab = $('div.g');
    //console.log(tab);
    var tab_odd = document.getElementsByClassName('odd')
    for (let index = 0; index < tab_odd.length; index++) {
        var lien = tab_odd[index].getElementsByClassName('sourceURL ')[0];
        //console.log(lien.getElementsByTagName('a'));
        //var lien = tab[index].getElementsByTagName('a')[0].getAttribute('href');

        // $.ajax({
        //     method: "POST",
        //     url: "https://captureserp.com/ajax/envoyer.php",
        //     data: { lien: lien }
        // })
        //     .done(function (datas) {
        //         //console.log(datas);
        //         if (datas.erreur == 0) {

        //             // if(datas.datas.length > 0)
        //             // {
        //             //     if (has(datas.datas[0]),'miniature')
        //             //     {
        //             var div = document.createElement('div');
        //             var le_lien = datas.datas[0].lien;
        //             div.setAttribute('class', "div-image-danger")
        //             div.innerHTML = '<img class="img-image-danger" src="' + datas.datas[0].miniature + '" alt="' + le_lien + '" width="150">';
        //             div.style.cssText = " width: 100px; height: 100px; float: left; display: inline-table; position: absolute; margin-left: -160px; cursor:pointer;";

        //             tab[index].appendChild(div);
        //             tab[index].style.cssText = "display: inline-flex; padding-left: 160px; padding-bottom: 25px; /*border: 1px solid red; */";
        //             //     }

        //             // }

        //         }

        //     });

    }

    // // Get the modal
    // var modal_template = document.getElementById("myModal");
    // var span = document.getElementsByClassName("close")[0];

    // $(document).on("click", ".img-image-danger", function () {
    //     console.log($(this));
    //     var lien_url = $(this).eq(0).attr('src').replace('/miniature/', '/reel/');
    //     //alert(lien_url);

    //     //Ajout modal action

    //     modal_template.style.display = "block";
    //     var lien_recherche = $(this).eq(0).attr('alt');
    //     $('#ajout_image_si_besoin').empty();
    //     $('#ajout_image_si_besoin').append('<div class="contenu-et-image"><div class="image_url"><img src="' + lien_url + '" alt="Girl in a jacket" width="100%"></div><div class="pour-btn"><button class="btn btn-default btn-recharger float-left" id="recharger_image">Recharger</button><a id="lien_image" class="btn btn-default btn-ouvrir float-right" href="' + lien_recherche + '">Ouvrir</a></div></div>');

    // });

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function () {
    //     modal_template.style.display = "none";
    // }

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //     if (event.target == modal_template) {
    //         modal_template.style.display = "none";
    //     }
    // }
    // //Fin modal action


    // //Modal

    // //fonction
    // function has(object, key) {
    //     return object ? hasOwnProperty.call(object, key) : false;
    // }

    // //Ajout fonction de recharge
    // $(document).on("click", "#recharger_image", function () {
    //     var lien = document.getElementById(lien_image).href;
    //     console.log(lien);

    //     $.ajax({
    //         method: "POST",
    //         url: "https://captureserp.com/ajax/recharger.php",
    //         data: { lien: lien }
    //     })
    //         .done(function (datas) {
    //             console.log(datas);
    //             if (datas.erreur == 0) {
    //                 alert("La page a été ajouter dans liste des images à recharger!");

    //             }

    //         });
    // });

})