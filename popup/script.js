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
    chrome.storage.sync.get(['key'], function (result) {

      AjouterInjecterLaReponseDom(result.key)
    });
  }

  function ajouterIsIndexedBabbar() {
    chrome.storage.sync.get(['key'], function (result) {

      AjouterInjecterLaReponseDomBabbar(result.key)
    });
  }

  $(document).on("click", "#ajouter", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      var url = new URL(tab.url)
      var domain = url.hostname;
      // `domain` now has a value like 'example.com'

      var tab_url_accepte = ["majestic.com", "ahrefs.com", "babbar.tech"];
      var test_url = false;
      var index_tab_url = 0;
      for (var index = 0; index < tab_url_accepte.length; index++) {
        if (domain.includes(tab_url_accepte[index])) {
          test_url = true;
          index_tab_url = index;
        }
      }
      if (test_url == true) {
        //faire
        switch (tab_url_accepte[index_tab_url]) {
          case "majestic.com":
            ajouterIsIndexed();
            break;
          case "ahrefs.com":
            alert("c'est pas encore fini");
            break;
          case "babbar.tech":
            //alert("c'est pas encore fini");
            ajouterIsIndexedBabbar();
            break;
        }

      } else {
        alert("Vous devez vous rendre sur la page qui liste les backlinks de majesticseo.com, ahrefs.com ou babbar.tech.");
      }

      console.log(domain);
    })


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
  function AjouterInjecterLaReponseDom(tokken) {
    (async () => {

      chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];

        var config = { tokken: tokken };
        chrome.tabs.executeScript(tab.id, {
          code: 'var config = ' + JSON.stringify(config)
        }, function () {
          chrome.tabs.executeScript(tab.id, { file: 'jquery.min.js' });
          chrome.tabs.executeScript(tab.id, { file: "js.cookie.js" });
          chrome.tabs.executeScript(tab.id, { file: "ajouter.js" });

          //chrome.tabs.executeScript(tab.id, { file: "coockies.js" }); //Pour test coockies
        });
      });

    })();
  }

  function AjouterInjecterLaReponseDomBabbar(tokken) {
    (async () => {

      chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];

        var config = { tokken: tokken };
        chrome.tabs.executeScript(tab.id, {
          code: 'var config = ' + JSON.stringify(config)
        }, function () {
          chrome.tabs.executeScript(tab.id, { file: 'jquery.min.js' });
          chrome.tabs.executeScript(tab.id, { file: "js.cookie.js" });
          chrome.tabs.executeScript(tab.id, { file: "ajouterbabbar.js" });

          //chrome.tabs.executeScript(tab.id, { file: "coockies.js" }); //Pour test coockies
        });
      });

    })();
  }

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
              if(json.status == 'KO')
              {
                $('#isindexed_credit').text('0');
                $('#chargement').hide();
              } else {
                $('#isindexed_credit').text(numStr(json.credits+""));
                $('#chargement').hide();
              }

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
      } else {
        $('#chargement').hide();
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

  function numStr(a, b) {
    if (isNaN(a)) {
      return '0';
    } else {
      a = '' + a;
      b = b || ' ';
      var c = '',
        d = 0;
      while (a.match(/^0[0-9]/)) {
        a = a.substr(1);
      }
      for (var i = a.length - 1; i >= 0; i--) {
        c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
        d++;
      }
      return c;
    }


  }


  voirCredit();


})