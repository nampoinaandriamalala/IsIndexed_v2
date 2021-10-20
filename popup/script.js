$(function () {

  $('#chargement').show();
  var abc = [];

  $(document).on("click", "#enregistrer", function () {
    var value = $('#isindexed_token').val();
    var key = "key";
    chrome.storage.sync.set({ key: value }, function () {
      console.log('Value is set to ' + value);
    });
    alert('Les modifications ont été apportées!');
    voirCredit();
  });
  $(document).on("click", "#voir", function () {
    chrome.storage.sync.get(['key'], function (result) {
      if (result.key != undefined) {
        console.log('Value currently is ' + result.key);
        $('#isindexed_token').val(result.key);
      } else {
        $('#chargement').hide();
      }
    });
  });

  function display_h1() {
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


  function display_h2(data) {
    //console.log(data);
    abc = data;
  }

  function recupererLien() {
    (async () => {
      chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];
        tab_title = tab.title;
        chrome.tabs.executeScript(tab.id, { code: '(' + display_h1 + ')();' }, display_h2);
      });
    })();
  }

  function ajouterIsIndexed() {
    $('#chargement').show();
    chrome.storage.sync.get(['key'], function (result) {
      console.log('Value currently is ' + result.key);
      recupererLien();
      // urls: [
      //   "www.jouve.com",
      //   "www.google.mg",
      // ]

      //Post
      if (abc.length > 0 && abc[0].length > 0) {
        var tab_urls = [];
        for (var index = 0; index < abc[0].length; index++) {
          tab_urls.push(abc[0][index]);
        }
        var dataSend = {
          project_name: datenow(),
          urls: tab_urls
        };
        var dataObj = {
          url: 'https://tool.isindexed.com/api/v1/project/add',
          authorization: result.key,
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
              $('#isindexed_ajouter').val(json.id);

              //Pour la partie voir à supprimer une fois terminer
              $('#isindexed_voir').val(json.id);
              //Actualiser l'affichage crédit              
              voirCredit();
            } catch (e) {
              // //Refaire après 5 seconds
              // setTimeout(function () {
              //   ajouterIsIndexed();
              // }, 5000);
              alert("Le serveur est saturé. Veuillez réessayer après 10s!");
              $('#chargement').hide();
            }

          },
          error: function () {
            //alert("Cannot get data");
          }
        });
      } else {
        //Si les urls ne sont pas encore récupérer. Alors, il faut refaire l'appel après 5 seconds.
        setTimeout(function () {
          ajouterIsIndexed();
        }, 5000);
      }
    });
  }
  $(document).on("click", "#ajouter", function () {
    ajouterIsIndexed();
  });

  function voirIsIndexed() {
    $('#chargement').show();
    chrome.storage.sync.get(['key'], function (result) {
      console.log('Value currently is ' + result.key);

      var projet_id = $('#isindexed_voir').val();
      //Post
      var dataSend = { "vide": "vide" };
      var dataObj = {
        url: 'https://tool.isindexed.com/api/v1/project/' + projet_id,
        authorization: result.key,
        data: JSON.stringify(dataSend)
      }
      $.ajax({
        url: "https://captureserp.com/isindexed/action.php",
        type: "POST",
        dataType: "json",
        data: $.param(dataObj),
        success: function (data) {
          //var json = $.parseJSON(data);
          console.log(data);
          try {
            var json = JSON.parse(data);
            console.log(json);
            $('#chargement').hide();

            //Injecter la réponse dans la page
            injecterLaReponseDom(result.key, json);
          } catch (e) {
            //Refaire après 5 seconds
            setTimeout(function () {
              voirIsIndexed();
            }, 5000);
          }

        },
        error: function () {
          //alert("Cannot get data");
        }
      });
    });
  }
  $(document).on("click", "#voir", function () {
    voirIsIndexed();
  });

  function injecterLaReponseDom(tokken, json) {
    (async () => {

      chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];

        var config = { tokken: tokken, datas: json };
        chrome.tabs.executeScript(tab.id, {
          code: 'var config = ' + JSON.stringify(config)
        }, function () {
          chrome.tabs.executeScript(tab.id, { file: 'jquery.min.js' });
          chrome.tabs.executeScript(tab.id, { file: "content.js" });    
        });
      });

    })();
  }

  function voirCredit() {
    $('#chargement').show();
    chrome.storage.sync.get(['key'], function (result) {
      //console.log('Value currently is ' + result.key);
      //Initialisaiton 
      //$('#isindexed_credit').text('0')
      if (result.key != "") {
        //Post
        var dataSend = { "vide": "vide" };
        var dataObj = {
          url: 'https://tool.isindexed.com/api/v1/user/credits',
          authorization: result.key,
          data: JSON.stringify(dataSend)
        }
        $.ajax({
          url: "https://captureserp.com/isindexed/action.php",
          type: "POST",
          dataType: "json",
          data: $.param(dataObj),
          success: function (data) {

            try {
              var json = JSON.parse(data);
              console.log(json);
              $('#isindexed_credit').text(json.credits);
              $('#chargement').hide();
            } catch (e) {
              //Refaire après 5 seconds
              setTimeout(function () {
                voirCredit();
              }, 15000);
            }

          },
          error: function () {
            //alert("Cannot get data");
            $('#chargement').hide();
          }
        });
      }

    });
  }

  //Charger au démarrage 
  chrome.storage.sync.get(['key'], function (result) {
    console.log('Value currently is ' + result.key);
    $('#isindexed_token').val(result.key);
    if (result.key == undefined) {
      $('#chargement').hide();
    }
  });

  function pad2(n) { return n < 10 ? '0' + n : n }

  function datenow() {
    var date = new Date();
    var sortie = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
    return sortie;
  }


  voirCredit();


})